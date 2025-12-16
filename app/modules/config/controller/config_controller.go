package controller

import (
	"pocket-fleet/app/modules/config/service"
	"pocket-fleet/internal/common"

	"github.com/pocketbase/pocketbase/core"
)

func NewConfigController(
	svc service.ConfigService,
) ConfigController {
	return &configController{
		svc: svc,
	}
}

type ConfigController interface {
	List(e *core.RequestEvent) error
	Get(e *core.RequestEvent) error
	Set(e *core.RequestEvent) error
	Delete(e *core.RequestEvent) error
}

type configController struct {
	svc service.ConfigService
}

func (ctrl *configController) List(e *core.RequestEvent) error {
	configs, err := ctrl.svc.ListConfigs()
	if err != nil {
		return common.InternalError(e, "Failed to fetch configs")
	}
	return common.OK(e, configs)
}

func (ctrl *configController) Get(e *core.RequestEvent) error {
	key := e.Request.PathValue("key")
	if key == "" {
		return common.BadRequest(e, "Config key is required")
	}

	config, err := ctrl.svc.GetConfig(key)
	if err != nil {
		return common.NotFound(e, "Config not found")
	}
	return common.OK(e, config)
}

func (ctrl *configController) Set(e *core.RequestEvent) error {
	key := e.Request.PathValue("key")
	if key == "" {
		return common.BadRequest(e, "Config key is required")
	}

	var req struct {
		Value  any    `json:"value"`
		Remark string `json:"remark"`
	}

	if err := e.BindBody(&req); err != nil {
		return common.BadRequest(e, "Invalid request body")
	}

	if req.Value == nil {
		return common.ValidationError(e, "Value is required")
	}

	config, err := ctrl.svc.SetConfig(key, req.Value, req.Remark)
	if err != nil {
		return common.InternalError(e, "Failed to set config")
	}
	return common.OK(e, config)
}

func (ctrl *configController) Delete(e *core.RequestEvent) error {
	key := e.Request.PathValue("key")
	if key == "" {
		return common.BadRequest(e, "Config key is required")
	}

	if err := ctrl.svc.DeleteConfig(key); err != nil {
		return common.NotFound(e, "Config not found")
	}
	return common.NoContent(e)
}
