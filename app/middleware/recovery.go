package middleware

import (
	"fmt"
	"log/slog"
	"net/http"
	"pocket-fleet/internal/common"
	"runtime/debug"

	"github.com/pocketbase/pocketbase/core"
)

func Recovery(re *core.RequestEvent) error {
	defer func() {
		if r := recover(); r != nil {
			stack := debug.Stack()

			slog.Error("panic recovered",
				"method", re.Request.Method,
				"path", re.Request.URL.Path,
				"panic", fmt.Sprintf("%v", r),
				"stack", string(stack),
			)

			re.JSON(
				http.StatusInternalServerError,
				common.AppError{
					Code:    common.CodeInternal,
					Message: "Internal Server Error",
					Details: string(stack),
				},
			)
		}
	}()

	return re.Next()
}
