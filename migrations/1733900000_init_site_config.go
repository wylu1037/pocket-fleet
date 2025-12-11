// migrations/1733900000_init_site_config.go
package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/types"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		// Create site_config collection for website configuration
		collection := core.NewBaseCollection("site_config")

		collection.ListRule = types.Pointer("")  // Public read
		collection.ViewRule = types.Pointer("")  // Public read
		collection.CreateRule = nil              // Admin only
		collection.UpdateRule = nil              // Admin only
		collection.DeleteRule = nil              // Admin only

		collection.Fields.Add(
			&core.TextField{
				Name:     "key",
				Required: true,
				Max:      100,
			},
			&core.TextField{
				Name:     "value",
				Required: false,
				Max:      5000,
			},
			&core.TextField{
				Name:     "type",
				Required: true,
				Max:      20,
			},
			&core.TextField{
				Name:     "description",
				Required: false,
				Max:      500,
			},
		)

		collection.AddIndex("idx_site_config_key", true, "key", "")

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("site_config")
		if err != nil {
			return err
		}
		return app.Delete(collection)
	})
}

