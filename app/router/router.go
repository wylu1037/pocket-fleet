package router

import (
	"pocket-fleet/app/modules/config"
	"pocket-fleet/app/modules/post"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func RegisterRoutes(app *pocketbase.PocketBase, se *core.ServeEvent) {
	config.RegisterRoutes(app, se)
	post.RegisterRoutes(app, se)
}
