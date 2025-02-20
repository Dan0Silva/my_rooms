package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Dan0Silva/my_rooms/src/config"
	"github.com/Dan0Silva/my_rooms/src/router"
)


func main() {
	config.LoadEnvironment()

	port := config.Port
	router := router.Generate()

	fmt.Println("> Running on port ", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), router))
}