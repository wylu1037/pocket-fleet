package config

import (
	"pocket-fleet/app/modules/config/controller"
	"pocket-fleet/app/modules/config/repository"
	"pocket-fleet/app/modules/config/service"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func RegisterRoutes(app *pocketbase.PocketBase, se *core.ServeEvent) {
	repo := repository.NewConfigRepository(app)
	svc := service.NewConfigService(repo)
	ctrl := controller.NewConfigController(svc)

	// Read operations - require authenticated user
	se.Router.GET("/api/configs", ctrl.List).Bind(apis.RequireAuth())
	se.Router.GET("/api/configs/{key}", ctrl.Get).Bind(apis.RequireAuth())

	// Write operations - require superuser
	se.Router.PUT("/api/configs/{key}", ctrl.Set).Bind(apis.RequireSuperuserAuth())
	se.Router.DELETE("/api/configs/{key}", ctrl.Delete).Bind(apis.RequireSuperuserAuth())
}
