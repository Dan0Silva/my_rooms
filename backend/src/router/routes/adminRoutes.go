package routes

import (
	"net/http"

	administratorLoginController "github.com/Dan0Silva/my_rooms/src/controller"
)

var AdminRoutes = []Routes{
	{
		Uri: "/login",
		Method: http.MethodPost,
		Function: administratorLoginController.Login,
		RequireAuth: false,
	},
}