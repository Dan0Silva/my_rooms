package controller

import (
	"net/http"
)

func CreateSpace(w http.ResponseWriter, r *http.Request) {
	// var newSpace models.Space

	// reqBody, err := io.ReadAll(r.Body)
	// if err != nil {
	// 	response.Error(w, "error to read the request body", http.StatusBadRequest, err.Error())
	// 	return
	// }

	// if err = json.Unmarshal(reqBody, &newSpace); err != nil {
	// 	response.Error(w, "Error converting request body to JSON", http.StatusBadRequest, err.Error())
	// 	return
	// }

	// db, err := database.Connect()
	// if err != nil {
	// 	response.Error(w, "Error trying to connect to the database", http.StatusInternalServerError, err.Error())
	// 	return
	// }
	// defer db.Close()

	// spaceRepository := //create repository
}

func ListSpaces(w http.ResponseWriter, r *http.Request) {

}

func ViewSpace(w http.ResponseWriter, r *http.Request) {

}

func EditSpace(w http.ResponseWriter, r *http.Request) {

}

func DeleteSpace(w http.ResponseWriter, r *http.Request) {

}