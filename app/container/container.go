package container

import (
	configRepo "pocket-fleet/app/modules/config/repository"
	configSvc "pocket-fleet/app/modules/config/service"
	postRepo "pocket-fleet/app/modules/post/repository"
	postSvc "pocket-fleet/app/modules/post/service"

	"github.com/pocketbase/pocketbase"
)

type Container struct {
	ConfigRepository configRepo.ConfigRepository
	PostRepository   postRepo.PostRepository
	ConfigService    configSvc.ConfigService
	PostService      postSvc.PostService
}

func New(
	app *pocketbase.PocketBase,
) *Container {
	configRepository := configRepo.NewConfigRepository(app)
	postRepository := postRepo.NewPostRepository(app)
	configService := configSvc.NewConfigService(configRepository)
	postService := postSvc.NewPostService(postRepository)

	return &Container{
		ConfigRepository: configRepository,
		PostRepository:   postRepository,
		ConfigService:    configService,
		PostService:      postService,
	}
}
