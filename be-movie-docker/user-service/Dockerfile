FROM golang:1.24.4-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY user-service/ ./user-service/
WORKDIR /app/user-service

RUN go build -o user-service main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/user-service/user-service .
EXPOSE 8001
CMD ["./user-service"]