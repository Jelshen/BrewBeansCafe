package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"log"
	"os"

	"github.com/Jelshen/BrewBeanCafe/config"
	"github.com/Jelshen/BrewBeanCafe/routes"
)

func main() {
	// Load environment variables
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New()

	// Or extend your config for customization
	app.Use(cors.New(cors.Config{
		// Allow specified origins on .env
		AllowOrigins: os.Getenv("ALLOWED_ORIGINS"),
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	db := config.InitDB()
	defer db.Close()

	routes.SetupMenuRoutes(app, db)
	routes.SetupCategoryRoutes(app, db)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Fatal(app.Listen(os.Getenv("HOST") + ":" + port))
}
