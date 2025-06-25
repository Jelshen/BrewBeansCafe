package main

import (
	"fmt"
	"log"
	"os"
	"strings"
	"github.com/joho/godotenv"

	"github.com/Jelshen/BrewBeanCafe/config" // Replace with your actual module name
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/term"
)

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize DB connection using your config package
	db := config.InitDB()
	defer db.Close()

	fmt.Print("Enter admin username: ")
	var username string
	fmt.Scanln(&username)
	username = strings.TrimSpace(username)

	var password string

	for {
		fmt.Print("Enter password: ")
		passwordBytes, err := term.ReadPassword(int(os.Stdin.Fd()))
		if err != nil {
			log.Printf("Failed to read password: %v", err)
			continue
		}
		password = strings.TrimSpace(string(passwordBytes))
		fmt.Println()

		fmt.Print("Confirm password: ")
		confirmBytes, err := term.ReadPassword(int(os.Stdin.Fd()))
		if err != nil {
			log.Printf("Failed to read confirmation: %v", err)
			continue
		}
		confirm := strings.TrimSpace(string(confirmBytes))
		fmt.Println()

		if password != confirm {
			fmt.Println("❌ Passwords do not match. Please try again.")
			continue
		}
		break
	}

	// Hash the password using bcrypt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Failed to hash password: %v", err)
	}

	// Insert into the admins table
	query := `INSERT INTO admins (username, password) VALUES ($1, $2)`
	_, err = db.Exec(query, username, string(hashedPassword))
	if err != nil {
		log.Fatalf("Failed to insert admin: %v", err)
	}

	fmt.Println("✅ Admin created successfully.")
}
