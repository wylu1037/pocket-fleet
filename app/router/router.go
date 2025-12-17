package router

import (
	"pocket-fleet/app/container"
	"pocket-fleet/app/middleware"
	"pocket-fleet/app/modules/config"
	"pocket-fleet/app/modules/post"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func RegisterRoutes(app *pocketbase.PocketBase, se *core.ServeEvent) {
	c := container.New(app)

	// Register global middlewares
	se.Router.BindFunc(middleware.Recovery)

	// Register module routes
	config.RegisterRoutes(c, se)
	post.RegisterRoutes(c, se)
}
