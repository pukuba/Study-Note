const config = {
    DB_HOST: process.env.DB_HOST || "mongodb://localhost:27017/note"
}

const { PORT, BFF_PORT } = process.env
export const port = PORT || 50051
export const BFFPort = BFF_PORT || 9000

export const grpcClientOptions = {
    "grpc.lb_policy_name": "round_robin",
    "grpc.dns_min_time_between_resolutions_ms": 5000,
    "grpc.keepalive_timeout_ms": 1000,
}

export default config