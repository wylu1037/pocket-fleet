// migrations/1733900001_init_blog_posts.go
package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/types"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		// Create blog_posts collection
		collection := core.NewBaseCollection("blog_posts")

		collection.ListRule = types.Pointer("published = true") // Public can only see published posts
		collection.ViewRule = types.Pointer("published = true") // Public can only see published posts
		collection.CreateRule = nil                              // Admin only
		collection.UpdateRule = nil                              // Admin only
		collection.DeleteRule = nil                              // Admin only

		collection.Fields.Add(
			&core.TextField{
				Name:        "title",
				Required:    true,
				Max:         200,
				Presentable: true,
			},
			&core.TextField{
				Name:     "slug",
				Required: true,
				Max:      200,
			},
			&core.TextField{
				Name:     "excerpt",
				Required: false,
				Max:      500,
			},
			&core.EditorField{
				Name:     "content",
				Required: true,
			},
			&core.FileField{
				Name:      "cover_image",
				MaxSelect: 1,
				MaxSize:   5 * 1024 * 1024, // 5MB
				MimeTypes: []string{
					"image/jpeg",
					"image/png",
					"image/webp",
					"image/gif",
				},
			},
			&core.BoolField{
				Name: "published",
			},
			&core.DateField{
				Name: "published_at",
			},
			&core.SelectField{
				Name:   "category",
				Values: []string{"tech", "design", "news", "tutorial", "other"},
			},
			&core.JSONField{
				Name:    "tags",
				MaxSize: 2000,
			},
			&core.NumberField{
				Name: "view_count",
			},
		)

		collection.AddIndex("idx_blog_posts_slug", true, "slug", "")
		collection.AddIndex("idx_blog_posts_published", false, "published, published_at DESC", "")

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("blog_posts")
		if err != nil {
			return err
		}
		return app.Delete(collection)
	})
}

