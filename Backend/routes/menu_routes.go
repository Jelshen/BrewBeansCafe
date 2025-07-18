// routes/menu_routes.go
package routes

import (
    "database/sql"
    "github.com/gofiber/fiber/v2"
    "github.com/Jelshen/BrewBeanCafe/handlers"
    "github.com/Jelshen/BrewBeanCafe/middleware"
)

func SetupMenuRoutes(app *fiber.App, db *sql.DB) {
    menuGroup := app.Group("/api/menu")

    // Public
    menuGroup.Get("/", handlers.GetMenus(db))
    menuGroup.Get("/image/:id", handlers.GetMenuImage(db))
    
    // Protected
    menuGroup.Post("/", middleware.Authenticate(), handlers.UpsertMenu(db))
    menuGroup.Delete("/:id", middleware.Authenticate(), handlers.DeleteMenu(db))
}

