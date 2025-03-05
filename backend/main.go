package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Dan0Silva/my_rooms/src/config"
	"github.com/Dan0Silva/my_rooms/src/router"
	"github.com/gorilla/handlers"
)

func main() {
	config.LoadEnvironment()

	port := config.Port
	router := router.Generate()

	corsOptions := []handlers.CORSOption{
		handlers.AllowedOrigins([]string{"http://localhost:5173"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
		handlers.AllowCredentials(),
	}

	fmt.Println("> Running on port ", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), handlers.CORS(corsOptions...)(router)))
}
