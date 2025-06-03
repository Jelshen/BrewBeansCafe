package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	
	_ "github.com/jackc/pgx/v5/stdlib"
)

var DB *sql.DB

func InitDB() *sql.DB {
	dbURL := os.Getenv("DATABASE_URL")

	// Return error if DATABASE_URL is not set
	if dbURL == "" {
		log.Fatal("DATABASE_URL is not set, please set it in your environment variables.")
	}

	// Open the database
	db, err := sql.Open("pgx", dbURL)
	if err != nil {
		// Error handling
		log.Fatalf("Failed to open database: %v", err)
	}

	// Optional: Ping the database to ensure the connection is alive
	if err = db.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}

	fmt.Println("Connected to PostgreSQL")
	DB = db
	return db
}
