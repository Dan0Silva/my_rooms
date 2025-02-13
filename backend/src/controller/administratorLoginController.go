package controller

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/Dan0Silva/my_rooms/src/models"
	"github.com/Dan0Silva/my_rooms/src/response"
)

func Login (w http.ResponseWriter, r *http.Request) {
	reqBody, err := io.ReadAll(r.Body)
	var adminUser models.Admin
	
	if err != nil {
		response.Error(w, "error to read the request body", http.StatusBadRequest, err.Error())
		return
	}

	if err := json.Unmarshal(reqBody, &adminUser); err != nil {
		response.Error(w, "error converting request body to JSON", http.StatusBadRequest, err.Error())
		return
	}
}