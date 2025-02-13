package controller

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/Dan0Silva/my_rooms/src/authentication"
	"github.com/Dan0Silva/my_rooms/src/config"
	"github.com/Dan0Silva/my_rooms/src/models"
	"github.com/Dan0Silva/my_rooms/src/response"
)

func Login (w http.ResponseWriter, r *http.Request) {
	reqBody, err := io.ReadAll(r.Body)
	var admin models.Admin
	
	if err != nil {
		response.Error(w, "error to read the request body", http.StatusBadRequest, err.Error())
		return
	}

	if err := json.Unmarshal(reqBody, &admin); err != nil {
		response.Error(w, "error converting request body to JSON", http.StatusBadRequest, err.Error())
		return
	}

	if admin.Nick == "" && admin.Password == "" {
		response.Error(w, "blank request body", http.StatusBadRequest, nil)
		return
	}

	if admin.Nick != config.AdminNick {
		response.Error(w, "wrong nick", http.StatusUnauthorized, nil)
		return
	}
	
	if admin.Password != config.AdminPassword {
		response.Error(w, "wrong password", http.StatusUnauthorized, nil)
		return
	}

	userToken, err := authentication.CreateToken(admin.Nick)
	if err != nil {
		response.Error(w, "Error to create user token", http.StatusInternalServerError, err.Error())
		return
	}

	response.Success(w, http.StatusOK, userToken)
}