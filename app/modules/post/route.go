package post

import (
	"pocket-fleet/app/container"
	"pocket-fleet/app/modules/post/controller"

	"github.com/pocketbase/pocketbase/core"
)

func RegisterRoutes(
	c *container.Container,
	se *core.ServeEvent,
) {
	ctrl := controller.NewPostController(c.PostService)

	se.Router.GET("/api/posts", ctrl.List)
	se.Router.GET("/api/posts/{id}", ctrl.Get)
	se.Router.POST("/api/posts", ctrl.Create)
	se.Router.PUT("/api/posts/{id}", ctrl.Update)
	se.Router.DELETE("/api/posts/{id}", ctrl.Delete)
}
