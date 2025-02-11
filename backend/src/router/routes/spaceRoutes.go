package routes

import (
	"net/http"

	spaceController "github.com/Dan0Silva/my_rooms/src/controller"
)

var SpaceRoutes = []Routes{
	{
		Uri: "/spaces",
		Method: http.MethodPost,
		Function: spaceController.CreateSpace,
		RequireAuth: false,
	},	
	{
		Uri: "/spaces",
		Method: http.MethodGet,
		Function: spaceController.ListSpaces,
		RequireAuth: false,
	},
	{
		Uri: "/spaces/{id}",
		Method: http.MethodGet,
		Function: spaceController.ViewSpace,
		RequireAuth: false,
	},
	{
		Uri: "/spaces",
		Method: http.MethodPatch,
		Function: spaceController.EditSpace,
		RequireAuth: false,
	},
	{
		Uri: "/spaces",
		Method: http.MethodDelete,
		Function: spaceController.DeleteSpace,
		RequireAuth: false,
	},
}