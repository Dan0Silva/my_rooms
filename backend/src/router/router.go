package router

import (
	"fmt"

	"github.com/Dan0Silva/my_rooms/src/router/routes"
	"github.com/gorilla/mux"
)

func Generate() *mux.Router {
	r := mux.NewRouter()
	routes.GenerateRoutes(r)

	fmt.Printf("> Generating router successfuly\n")
	return r
}