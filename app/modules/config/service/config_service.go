package service

import (
	"pocket-fleet/app/modules/config/repository"

	"github.com/pocketbase/pocketbase/core"
)

func NewConfigService(
	repo repository.ConfigRepository,
) ConfigService {
	return &configService{
		repo: repo,
	}
}

type ConfigService interface {
	ListConfigs() ([]*core.Record, error)
	GetConfig(key string) (*core.Record, error)
	GetConfigValue(key string) (any, error)
	SetConfig(key string, value any, remark string) (*core.Record, error)
	DeleteConfig(key string) error
}

type configService struct {
	repo repository.ConfigRepository
}

func (s *configService) ListConfigs() ([]*core.Record, error) {
	return s.repo.FindAll()
}

func (s *configService) GetConfig(key string) (*core.Record, error) {
	return s.repo.FindByKey(key)
}

func (s *configService) GetConfigValue(key string) (any, error) {
	record, err := s.repo.FindByKey(key)
	if err != nil {
		return nil, err
	}
	return record.Get("value"), nil
}

func (s *configService) SetConfig(key string, value any, remark string) (*core.Record, error) {
	// Try to update first, if not found then create
	record, err := s.repo.FindByKey(key)
	if err != nil {
		// Record not found, create new one
		return s.repo.Create(key, value, remark)
	}

	// Update existing record
	record.Set("value", value)
	if remark != "" {
		record.Set("remark", remark)
	}

	return s.repo.Update(key, value, remark)
}

func (s *configService) DeleteConfig(key string) error {
	return s.repo.Delete(key)
}
