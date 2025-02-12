package response

import (
	"encoding/json"
	"net/http"

	"github.com/Dan0Silva/my_rooms/src/models"
)

func sendResponse(w http.ResponseWriter, message string, statusCode int, data interface{}) {
	response := models.Response{
		StatusCode: statusCode,
		Message: message,
		Data: data,
	}	

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Error encoding response: "+err.Error(), http.StatusInternalServerError)
	}
}

func Success(w http.ResponseWriter, statusCode int, data interface{}) {
	sendResponse(w, "Request was successful", statusCode, data)
}

func Error(w http.ResponseWriter, message string, statusCode int, data interface{}) {
	sendResponse(w, message, statusCode, data)
}