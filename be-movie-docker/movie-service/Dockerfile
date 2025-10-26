FROM golang:1.24.4-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY movie-service/ ./movie-service/
WORKDIR /app/movie-service

RUN go build -o movie-service main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/movie-service/movie-service .
EXPOSE 8002
CMD ["./movie-service"]