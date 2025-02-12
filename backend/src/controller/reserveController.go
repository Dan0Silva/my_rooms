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

func CreateReserve(w http.ResponseWriter, r *http.Request) {
	reqBody, err := io.ReadAll(r.Body)
	var newReserve models.Reserve

	if err != nil {
		response.Error(w, "error to read the request body", http.StatusBadRequest, err.Error())
		return
	}

	if err = json.Unmarshal(reqBody, &newReserve); err != nil {
		response.Error(w, "error converting request body to JSON", http.StatusBadRequest, err.Error())
		return
	}

	db, err := database.Connect()
	if err != nil {
		response.Error(w, "error trying to connect to the database", http.StatusInternalServerError, err.Error())
		return
	}
	defer db.Close()

	reserveRepository := repository.NewReservesRepository(db)

	if err := reserveRepository.Create(newReserve); err != nil {
		response.Error(w, "error trying to create a new reserve", http.StatusInternalServerError, err.Error())
		return
	}

	response.Success(w, http.StatusNoContent, nil)
}

func ListReserves(w http.ResponseWriter, r *http.Request) {
	
}

func DeleteReserve(w http.ResponseWriter, r *http.Request) {
	
}