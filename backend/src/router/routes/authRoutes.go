package routes

import (
	"net/http"

	authenticationController "github.com/Dan0Silva/my_rooms/src/controller"
)

var AuthRoutes = []Routes{
	{
		Uri:         "/check-auth",
		Method:      http.MethodGet,
		Function:    authenticationController.CheckAuth,
		RequireAuth: false,
	},
	{
		Uri:         "/logout",
		Method:      http.MethodPost,
		Function:    authenticationController.Logout,
		RequireAuth: false,
	},
}
