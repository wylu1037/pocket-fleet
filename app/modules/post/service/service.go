package service

import (
	"pocket-fleet/app/modules/post/repository"

	"github.com/pocketbase/pocketbase/core"
)

func NewPostService(
	repo repository.PostRepository,
) PostService {
	return &postService{
		repo: repo,
	}
}

type PostService interface {
	ListPosts() ([]*core.Record, error)
	GetPost(id string) (*core.Record, error)
	CreatePost(title, content string) (*core.Record, error)
	UpdatePost(id, title, content string) (*core.Record, error)
	DeletePost(id string) error
}

type postService struct {
	repo repository.PostRepository
}

func (svc *postService) ListPosts() ([]*core.Record, error) {
	return svc.repo.FindAll()
}

func (svc *postService) GetPost(id string) (*core.Record, error) {
	return svc.repo.FindByID(id)
}

func (svc *postService) CreatePost(title, content string) (*core.Record, error) {
	data := map[string]any{
		"title":   title,
		"content": content,
	}
	return svc.repo.Create(data)
}

func (svc *postService) UpdatePost(id, title, content string) (*core.Record, error) {
	data := map[string]any{
		"title":   title,
		"content": content,
	}
	return svc.repo.Update(id, data)
}

func (svc *postService) DeletePost(id string) error {
	return svc.repo.Delete(id)
}
