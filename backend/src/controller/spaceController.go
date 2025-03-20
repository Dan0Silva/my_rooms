package controller

import (
	"encoding/json"
	"io"
	"net/http"
	"regexp"
	"strings"

	"github.com/Dan0Silva/my_rooms/src/database"
	"github.com/Dan0Silva/my_rooms/src/models"
	"github.com/Dan0Silva/my_rooms/src/repository"
	"github.com/Dan0Silva/my_rooms/src/response"
	"github.com/gorilla/mux"
)

func CreateSpace(w http.ResponseWriter, r *http.Request) {
	var newSpace models.Space

	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		response.Error(w, "error to read the request body", http.StatusBadRequest, err.Error())
		return
	}

	if err = json.Unmarshal(reqBody, &newSpace); err != nil {
		response.Error(w, "error converting request body to JSON", http.StatusBadRequest, err.Error())
		return
	}

	db, err := database.Connect()
	if err != nil {
		response.Error(w, "error trying to connect to the database", http.StatusInternalServerError, err.Error())
		return
	}
	defer db.Close()

	spaceRepository := repository.NewSpacesRepository(db)

	err = spaceRepository.Create(newSpace)
	if err != nil {
		response.Error(w, "error to creating a new space", http.StatusInternalServerError, err.Error())
		return
	}

	response.Success(w, http.StatusCreated, nil)
}

func ListSpaces(w http.ResponseWriter, r *http.Request) {
	db, err := database.Connect()
	if err != nil {
		response.Error(w, "error trying to connect to the database", http.StatusInternalServerError, err.Error())
		return
	}
	defer db.Close()

	spaceRepository := repository.NewSpacesRepository(db)

	spaces, err := spaceRepository.ListAll()
	if err != nil {
		response.Error(w, "error trying get spaces", http.StatusInternalServerError, err.Error())
		return
	}

	response.Success(w, http.StatusOK, spaces)
}

func ViewSpace(w http.ResponseWriter, r *http.Request) {
	spaceId := mux.Vars(r)["id"]

	if strings.Trim(spaceId, " ") == "" {
		response.Error(w, "search field id empty", http.StatusNoContent, nil)
		return
	}

	db, err := database.Connect()
	if err != nil {
		response.Error(w, "error trying to connect to the database", http.StatusInternalServerError, err.Error())
		return
	}
	defer db.Close()

	spaceRepository := repository.NewSpacesRepository(db)

	result, err := spaceRepository.GetByID(spaceId)
	if err != nil {
		response.Error(w, "error to trying get space by id", http.StatusInternalServerError, err.Error())
		return
	}

	response.Success(w, http.StatusOK, result)
}

func EditSpace(w http.ResponseWriter, r *http.Request) {
	spaceId := mux.Vars(r)["id"]
	var space models.Space
	
	if spaceId == "" {
		response.Error(w, "space ID is required", http.StatusBadRequest, nil)
		return
	}

	uuidPattern := `^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`

	if match, _ := regexp.MatchString(uuidPattern, spaceId); !match {
		response.Error(w, "invalid space ID format", http.StatusBadRequest, nil)
		return
	}

	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		response.Error(w, "error to read the request body", http.StatusBadRequest, err.Error())
		return
	}

	if err = json.Unmarshal(reqBody, &space); err != nil {
		response.Error(w, "error converting request body to JSON", http.StatusBadRequest, err.Error())
		return
	}

	db, err := database.Connect()
	if err != nil {
		response.Error(w, "error trying to connect to the database", http.StatusInternalServerError, err.Error())
		return
	}
	defer db.Close()

	spaceRepository := repository.NewSpacesRepository(db)
	
	if err = spaceRepository.Edit(spaceId, space); err != nil {
		response.Error(w, "error trying update space", http.StatusInternalServerError, err.Error())
		return
	}

	response.Success(w, http.StatusOK, nil)
}

func UpdateSpaceStatus(w http.ResponseWriter, r *http.Request) {
	spaceId := mux.Vars(r)["id"]
	var request struct {
		IsAvailable *bool `json:"is_available"`
	}

	if spaceId == "" {
		response.Error(w, "space ID is required", http.StatusBadRequest, nil)
		return
	}
	
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil{
		response.Error(w, "error to read the request body", http.StatusBadRequest, err.Error())
		return
	}

	if request.IsAvailable == nil {
		response.Error(w, "field 'is_available' is required and must be a boolean", http.StatusBadRequest, nil)
		return
	}

	db, err := database.Connect()
	if err != nil {
		response.Error(w, "error trying to connect to the database", http.StatusInternalServerError, err.Error())
		return
	}
	defer db.Close()

	spaceRepository := repository.NewSpacesRepository(db)

	if err = spaceRepository.UpdateSpaceStatus(spaceId, *request.IsAvailable); err != nil {
		response.Error(w, "error trying update space", http.StatusInternalServerError, err.Error())
		return
	}

	response.Success(w, http.StatusOK, nil)
} 

func DeleteSpace(w http.ResponseWriter, r *http.Request) {
	spaceId := mux.Vars(r)["id"]

	db, err := database.Connect()
	if err != nil {
		response.Error(w, "error trying to connect to the database", http.StatusInternalServerError, err.Error())
		return
	}
	defer db.Close()

	spaceRepository := repository.NewSpacesRepository(db)

	if err = spaceRepository.Delete(spaceId); err != nil {
		if strings.Contains(err.Error(), "no space found") {
			response.Error(w, "space not found", http.StatusNotFound, err.Error())
		} else {
			response.Error(w, "error trying to delete space", http.StatusInternalServerError, err.Error())
		}
		return
	}

	response.Success(w, http.StatusOK, nil)
}
