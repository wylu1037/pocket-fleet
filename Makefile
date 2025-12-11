.PHONY: dev build run migrate

# Development mode with hot reload (requires air)
dev:
	go run . serve --http=0.0.0.0:8090

# Build the binary
build:
	go build -o pocket-fleet .

# Run the built binary
run:
	./pocket-fleet serve --http=0.0.0.0:8090

# Run migrations
migrate:
	go run . migrate up

# Download dependencies
deps:
	go mod download
	go mod tidy

# Clean build artifacts
clean:
	rm -f pocket-fleet
	rm -rf pb_data

# Frontend development
frontend-dev:
	cd frontend && npm run dev

# Frontend build
frontend-build:
	cd frontend && npm run build

# Install all dependencies
install:
	go mod tidy
	cd frontend && npm install

