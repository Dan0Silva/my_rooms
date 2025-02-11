package controller

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/Dan0Silva/my_rooms/src/database"
	"github.com/Dan0Silva/my_rooms/src/models"
	"github.com/Dan0Silva/my_rooms/src/repository"
	"github.com/Dan0Silva/my_rooms/src/response"
)

func CreateSpace(w http.ResponseWriter, r *http.Request) {
	var newSpace models.Space

	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		response.Error(w, "error to read the request body", http.StatusBadRequest, err.Error())
		return
	}

	if err = json.Unmarshal(reqBody, &newSpace); err != nil {
		response.Error(w, "rror converting request body to JSON", http.StatusBadRequest, err.Error())
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

}

func ViewSpace(w http.ResponseWriter, r *http.Request) {

}

func EditSpace(w http.ResponseWriter, r *http.Request) {

}

func DeleteSpace(w http.ResponseWriter, r *http.Request) {

}