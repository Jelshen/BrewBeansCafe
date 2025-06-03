// routes/menu_routes.go
package routes

import (
    "database/sql"
    "github.com/gofiber/fiber/v2"
    "github.com/Jelshen/BrewBeanCafe/handlers"
)

func SetupMenuRoutes(app *fiber.App, db *sql.DB) {
    menuGroup := app.Group("/api/menu")

    menuGroup.Get("/", handlers.GetMenus(db))
	menuGroup.Post("/", handlers.UpsertMenu(db))
	menuGroup.Delete("/:id", handlers.DeleteMenu(db))
}
