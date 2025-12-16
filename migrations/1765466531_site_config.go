package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(
		func(app core.App) error {
			collection := core.NewBaseCollection("site_config")

			// Add fields
			collection.Fields.Add(&core.TextField{Name: "key", Required: true})
			collection.Fields.Add(&core.JSONField{Name: "value", Required: true})
			collection.Fields.Add(&core.TextField{Name: "remark", Required: false})

			// Add unique index on key
			collection.Indexes = []string{
				"CREATE UNIQUE INDEX idx_site_config_key ON site_config (key)",
			}

			// Access rules:
			// - List/View: only authenticated users (@request.auth.id != "")
			// - Create/Update/Delete: only superusers (managed via API middleware)
			collection.ListRule = stringPtr("@request.auth.id != ''")
			collection.ViewRule = stringPtr("@request.auth.id != ''")
			collection.CreateRule = nil // nil means superuser only
			collection.UpdateRule = nil // nil means superuser only
			collection.DeleteRule = nil // nil means superuser only

			return app.Save(collection)
		},

		func(app core.App) error {
			collection, err := app.FindCollectionByNameOrId("site_config")
			if err != nil {
				return err
			}

			return app.Delete(collection)
		},
	)
}

func stringPtr(s string) *string {
	return &s
}
