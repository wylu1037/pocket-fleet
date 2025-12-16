package repository

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func NewPostRepository(
	app *pocketbase.PocketBase,
) PostRepository {
	return &postRepository{app: app}
}

type PostRepository interface {
	FindAll() ([]*core.Record, error)
	FindByID(id string) (*core.Record, error)
	Create(data map[string]any) (*core.Record, error)
	Update(id string, data map[string]any) (*core.Record, error)
	Delete(id string) error
}

type postRepository struct {
	app *pocketbase.PocketBase
}

func (repo *postRepository) FindAll() ([]*core.Record, error) {
	return repo.app.FindAllRecords("posts")
}

func (repo *postRepository) FindByID(id string) (*core.Record, error) {
	return repo.app.FindRecordById("posts", id)
}

func (repo *postRepository) Create(data map[string]any) (*core.Record, error) {
	collection, err := repo.app.FindCollectionByNameOrId("posts")
	if err != nil {
		return nil, err
	}

	record := core.NewRecord(collection)
	for key, value := range data {
		record.Set(key, value)
	}

	if err := repo.app.Save(record); err != nil {
		return nil, err
	}

	return record, nil
}

func (repo *postRepository) Update(id string, data map[string]any) (*core.Record, error) {
	record, err := repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	for key, value := range data {
		record.Set(key, value)
	}

	if err := repo.app.Save(record); err != nil {
		return nil, err
	}

	return record, nil
}

func (repo *postRepository) Delete(id string) error {
	record, err := repo.FindByID(id)
	if err != nil {
		return err
	}

	return repo.app.Delete(record)
}
