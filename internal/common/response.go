package common

import "github.com/pocketbase/pocketbase/core"

// AppSuccess successful response structure
type AppSuccess struct {
	Data       any         `json:"data"`
	Pagination *Pagination `json:"pagination,omitempty"`
}

// Pagination pagination information
type Pagination struct {
	Page       int   `json:"page" example:"1"`
	PageSize   int   `json:"pageSize" example:"10"`
	Total      int64 `json:"total" example:"100"`
	TotalPages int   `json:"totalPages" example:"10"`
}

// AppError error response structure
type AppError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Details any    `json:"details,omitempty"`
}

const (
	CodeBadRequest   = "BAD_REQUEST"
	CodeUnauthorized = "UNAUTHORIZED"
	CodeForbidden    = "FORBIDDEN"
	CodeNotFound     = "NOT_FOUND"
	CodeValidation   = "VALIDATION_ERROR"
	CodeConflict     = "CONFLICT"
	CodeInternal     = "INTERNAL_ERROR"
)

// OK returns successful response (200)
func OK(re *core.RequestEvent, data any) error {
	return re.JSON(
		200,
		AppSuccess{
			Data: data,
		},
	)
}

// Created returns created successful response (201)
func Created(re *core.RequestEvent, data any) error {
	return re.JSON(
		201,
		AppSuccess{
			Data: data,
		},
	)
}

// NoContent returns no content response (204)
func NoContent(re *core.RequestEvent) error {
	return re.NoContent(204)
}

// Paginated returns paginated successful response
func Paginated(re *core.RequestEvent, data any, pagination *Pagination) error {
	return re.JSON(
		200,
		AppSuccess{
			Data:       data,
			Pagination: pagination,
		},
	)
}

// BadRequest returns bad request error (400)
func BadRequest(re *core.RequestEvent, message string) error {
	return re.JSON(
		400,
		AppError{
			Code:    CodeBadRequest,
			Message: message,
		},
	)
}

// Unauthorized returns unauthorized error (401)
func Unauthorized(re *core.RequestEvent, message string) error {
	return re.JSON(
		401,
		AppError{
			Code:    CodeUnauthorized,
			Message: message,
		},
	)
}

// Forbidden returns forbidden error (403)
func Forbidden(re *core.RequestEvent, message string) error {
	return re.JSON(
		403,
		AppError{
			Code:    CodeForbidden,
			Message: message,
		},
	)
}

// NotFound returns not found error (404)
func NotFound(re *core.RequestEvent, message string) error {
	return re.JSON(
		404,
		AppError{
			Code:    CodeNotFound,
			Message: message,
		},
	)
}

// ValidationError returns validation error (422)
func ValidationError(re *core.RequestEvent, message string) error {
	return re.JSON(
		422,
		AppError{
			Code:    CodeValidation,
			Message: message,
		},
	)
}

// Conflict returns conflict error (409)
func Conflict(re *core.RequestEvent, message string) error {
	return re.JSON(
		409,
		AppError{
			Code:    CodeConflict,
			Message: message,
		},
	)
}

// InternalError returns internal error (500)
func InternalError(re *core.RequestEvent, message string) error {
	return re.JSON(
		500,
		AppError{
			Code:    CodeInternal,
			Message: message,
		},
	)
}

// Error returns custom error response
func Error(re *core.RequestEvent, status int, code string, message string, details any) error {
	return re.JSON(
		status,
		AppError{
			Code:    code,
			Message: message,
			Details: details,
		},
	)
}
