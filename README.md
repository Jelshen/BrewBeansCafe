# BrewBeans Cafe

A full-stack web application for an imaginary coffee shop, built with React, Go, and PostgreSQL. The purpose of this is to solidify my understanding of the full web development process, while also learning more about UI/UX and responsive design. This project implements basic Go Fiber setup for a simple CRUD RESTful API to fetch, upload, update, and delete data.

## Prerequisites

- Node.js (v18 or higher)
- Go (v1.24.3)
- PostgreSQL (v15 or higher)
- pnpm (v8 or higher)
- Git

## Getting Started

### Postgre Database Setup

1. Install PostgreSQL and pgAdmin from official website, then create a new database with the name BrewBeanCafe. If you decide to change the name, refer to .env.example to also set the database name accordingly.

2. Run provided script to create tables and inject data into the tables

3. Insert credentials on the your own .env file, referring to .env.example file for database connection

4. Refer to db.go file to troubleshoot database connections

### Backend Setup

1. Navigate to the Backend directory:

```bash
cd Backend
```

2. Install Go dependencies:

```bash
go mod tidy
```

3. Create a .env file:

```env
DATABASE_URL=postgres://username:password@localhost:5432/BrewBeanCafe?sslmode=disable
ALLOWED_ORIGINS=http://localhost:5173
HOST=localhost
PORT=
```

4. Run the server:

```bash
go run main.go
```

The backend will start on http://localhost:3000, unless the port is specified otherwise

### Frontend Setup

1. Install Node.js

2. Install pnpm with this command on terminal

```powershell
npm install -g pnpm
```

3. Install dependencies

```powershell
pnpm install
```

4. Navigate to the Frontend directory:

```bash
cd Frontend
```

5. Install dependencies using pnpm:

```bash
pnpm install
```

6. Create a .env file:

```env
VITE_API_URL=http://localhost:3000 (replace the url with your hosting url)
VITE_MENU_IMAGE_URL=/src/assets/menu/webp/
VITE_GALLERY_IMAGE_URL=/src/assets/gallery/webp/
```

7. Start the development server:

```bash
pnpm dev
```

The frontend will start on http://localhost:5173, unless specified otherwise in vite.config.js

## Available Scripts

### Frontend

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

### Backend

```bash
go run main.go    # Start the server
go test ./...     # Run tests
go build          # Build executable
```

## Environment Variables

### Frontend (.env)

- `VITE_API_URL`: Backend API URL
- `VITE_MENU_IMAGE_URL`: Menu images path
- `VITE_GALLERY_IMAGE_URL`: Gallery images path

### Backend (.env)

- `DATABASE_URL`: PostgreSQL connection string
- `ALLOWED_ORIGINS`: CORS allowed origins

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
