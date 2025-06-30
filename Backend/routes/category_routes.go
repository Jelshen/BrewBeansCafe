// routes/menu_routes.go
package routes

import (
    "database/sql"
    "github.com/gofiber/fiber/v2"
    "github.com/Jelshen/BrewBeanCafe/handlers"
    "github.com/Jelshen/BrewBeanCafe/middleware"
)

func SetupCategoryRoutes(app *fiber.App, db *sql.DB) {
    categoryGroup := app.Group("/api/category")

    categoryGroup.Get("/", handlers.GetCategories(db))
	categoryGroup.Post("/", middleware.Authenticate(), handlers.AddCategory(db))
	categoryGroup.Delete("/:id", middleware.Authenticate(), handlers.DeleteCategory(db))
}
