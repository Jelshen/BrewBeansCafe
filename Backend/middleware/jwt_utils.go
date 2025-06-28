// middleware/jwt_utils.go
package middleware

import (
	"os"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

func ParseAndValidateToken(tokenString string) (jwt.MapClaims, error) {
	// Load env once
	_ = godotenv.Load("../.env")
	secret := os.Getenv("JWT_SECRET_KEY")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(secret), nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, jwt.ErrInvalidKeyType
	}

	return claims, nil
}
