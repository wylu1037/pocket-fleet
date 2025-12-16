package repository

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func NewConfigRepository(app *pocketbase.PocketBase) ConfigRepository {
	return &configRepository{app: app}
}

type ConfigRepository interface {
	FindAll() ([]*core.Record, error)
	FindByKey(key string) (*core.Record, error)
	Create(key string, value any, remark string) (*core.Record, error)
	Update(key string, value any, remark string) (*core.Record, error)
	Delete(key string) error
}

type configRepository struct {
	app *pocketbase.PocketBase
}

func (r *configRepository) FindAll() ([]*core.Record, error) {
	return r.app.FindAllRecords("site_config")
}

func (r *configRepository) FindByKey(key string) (*core.Record, error) {
	return r.app.FindFirstRecordByFilter(
		"site_config",
		"key = {:key}",
		dbx.Params{"key": key},
	)
}

func (r *configRepository) Create(key string, value any, remark string) (*core.Record, error) {
	collection, err := r.app.FindCollectionByNameOrId("site_config")
	if err != nil {
		return nil, err
	}

	record := core.NewRecord(collection)
	record.Set("key", key)
	record.Set("value", value)
	record.Set("remark", remark)

	if err := r.app.Save(record); err != nil {
		return nil, err
	}

	return record, nil
}

func (r *configRepository) Update(key string, value any, remark string) (*core.Record, error) {
	record, err := r.FindByKey(key)
	if err != nil {
		return nil, err
	}

	record.Set("value", value)
	if remark != "" {
		record.Set("remark", remark)
	}

	if err := r.app.Save(record); err != nil {
		return nil, err
	}

	return record, nil
}

func (r *configRepository) Delete(key string) error {
	record, err := r.FindByKey(key)
	if err != nil {
		return err
	}

	return r.app.Delete(record)
}
