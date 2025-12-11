// migrations/1733900002_init_media.go
package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/types"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		// Create media collection for storing images and assets
		collection := core.NewBaseCollection("media")

		collection.ListRule = types.Pointer("") // Public read
		collection.ViewRule = types.Pointer("") // Public read
		collection.CreateRule = nil             // Admin only
		collection.UpdateRule = nil             // Admin only
		collection.DeleteRule = nil             // Admin only

		collection.Fields.Add(
			&core.TextField{
				Name:        "name",
				Required:    true,
				Max:         200,
				Presentable: true,
			},
			&core.TextField{
				Name:     "alt",
				Required: false,
				Max:      300,
			},
			&core.FileField{
				Name:      "file",
				Required:  true,
				MaxSelect: 1,
				MaxSize:   10 * 1024 * 1024, // 10MB
				MimeTypes: []string{
					"image/jpeg",
					"image/png",
					"image/webp",
					"image/gif",
					"image/svg+xml",
				},
			},
			&core.SelectField{
				Name:   "category",
				Values: []string{"logo", "hero", "banner", "icon", "gallery", "other"},
			},
		)

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("media")
		if err != nil {
			return err
		}
		return app.Delete(collection)
	})
}

