FROM golang:1.24.4-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY subscription-service/ ./subscription-service/
WORKDIR /app/subscription-service

RUN go build -o subscription-service main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/subscription-service/subscription-service .
EXPOSE 8003
CMD ["./subscription-service"]
