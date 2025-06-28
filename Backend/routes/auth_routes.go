// routes/menu_routes.go
package routes

import (
    "database/sql"
    "github.com/gofiber/fiber/v2"
    "github.com/Jelshen/BrewBeanCafe/handlers"
)

func SetupAuthRoutes(app *fiber.App, db *sql.DB) {
    authGroup := app.Group("/api/auth")
    
    authGroup.Get("/check", handlers.CheckTokenValidity)

	authGroup.Post("/", handlers.ValidateCredentials(db))
    authGroup.Post("/logout", handlers.Logout)
}
