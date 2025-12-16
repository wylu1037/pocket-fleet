package config

import (
	"pocket-fleet/app/container"
	"pocket-fleet/app/modules/config/controller"

	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func RegisterRoutes(
	c *container.Container,
	se *core.ServeEvent,
) {
	ctrl := controller.NewConfigController(c.ConfigService)

	se.Router.GET("/api/configs", ctrl.List).Bind(apis.RequireAuth())
	se.Router.GET("/api/configs/{key}", ctrl.Get).Bind(apis.RequireAuth())
	se.Router.PUT("/api/configs/{key}", ctrl.Set).Bind(apis.RequireSuperuserAuth())
	se.Router.DELETE("/api/configs/{key}", ctrl.Delete).Bind(apis.RequireSuperuserAuth())
}
