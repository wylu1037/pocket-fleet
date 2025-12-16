package controller

import (
	"pocket-fleet/app/modules/post/service"
	"pocket-fleet/internal/common"

	"github.com/pocketbase/pocketbase/core"
)

func NewPostController(
	svc service.PostService,
) PostController {
	return &postController{
		svc: svc,
	}
}

type PostController interface {
	List(e *core.RequestEvent) error
	Get(e *core.RequestEvent) error
	Create(e *core.RequestEvent) error
	Update(e *core.RequestEvent) error
	Delete(e *core.RequestEvent) error
}

type postController struct {
	svc service.PostService
}

func (ctrl *postController) List(e *core.RequestEvent) error {
	posts, err := ctrl.svc.ListPosts()
	if err != nil {
		return common.InternalError(e, "Failed to fetch posts")
	}
	return common.OK(e, posts)
}

func (ctrl *postController) Get(e *core.RequestEvent) error {
	id := e.Request.PathValue("id")
	if id == "" {
		return common.BadRequest(e, "Post ID is required")
	}

	post, err := ctrl.svc.GetPost(id)
	if err != nil {
		return common.NotFound(e, "Post not found")
	}
	return common.OK(e, post)
}

func (ctrl *postController) Create(e *core.RequestEvent) error {
	var req struct {
		Title   string `json:"title"`
		Content string `json:"content"`
	}

	if err := e.BindBody(&req); err != nil {
		return common.BadRequest(e, "Invalid request body")
	}

	if req.Title == "" {
		return common.ValidationError(e, "Title is required")
	}

	post, err := ctrl.svc.CreatePost(req.Title, req.Content)
	if err != nil {
		return common.InternalError(e, "Failed to create post")
	}
	return common.Created(e, post)
}

func (ctrl *postController) Update(e *core.RequestEvent) error {
	id := e.Request.PathValue("id")
	if id == "" {
		return common.BadRequest(e, "Post ID is required")
	}

	var req struct {
		Title   string `json:"title"`
		Content string `json:"content"`
	}

	if err := e.BindBody(&req); err != nil {
		return common.BadRequest(e, "Invalid request body")
	}

	post, err := ctrl.svc.UpdatePost(id, req.Title, req.Content)
	if err != nil {
		return common.NotFound(e, "Post not found")
	}
	return common.OK(e, post)
}

func (ctrl *postController) Delete(e *core.RequestEvent) error {
	id := e.Request.PathValue("id")
	if id == "" {
		return common.BadRequest(e, "Post ID is required")
	}

	if err := ctrl.svc.DeletePost(id); err != nil {
		return common.NotFound(e, "Post not found")
	}
	return common.NoContent(e)
}
