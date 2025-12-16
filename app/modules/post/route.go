package post

import (
	"pocket-fleet/app/modules/post/controller"
	"pocket-fleet/app/modules/post/repository"
	"pocket-fleet/app/modules/post/service"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func RegisterRoutes(app *pocketbase.PocketBase, se *core.ServeEvent) {
	repo := repository.NewPostRepository(app)
	svc := service.NewPostService(repo)
	ctrl := controller.NewPostController(svc)

	se.Router.GET("/api/posts", ctrl.List)
	se.Router.GET("/api/posts/{id}", ctrl.Get)
	se.Router.POST("/api/posts", ctrl.Create)
	se.Router.PUT("/api/posts/{id}", ctrl.Update)
	se.Router.DELETE("/api/posts/{id}", ctrl.Delete)
}
