package router

import (
	"pocket-fleet/app/container"
	"pocket-fleet/app/modules/config"
	"pocket-fleet/app/modules/post"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func RegisterRoutes(app *pocketbase.PocketBase, se *core.ServeEvent) {
	c := container.New(app)

	config.RegisterRoutes(c, se)
	post.RegisterRoutes(c, se)
}
