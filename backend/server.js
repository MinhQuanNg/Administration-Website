import express from 'express'
import { Server } from 'socket.io'
import helmet from 'helmet'
import cors from 'cors'
import authRouter from './routes/authRouter.js'
import inspectionRouter from './routes/inspectionRouter.js'
import settingsRouter from './routes/settingsRouter.js'
import http from 'http';
import dotenv from 'dotenv';
import { startStatusCheckScheduler } from './utils/checkStatus.js';

dotenv.config();

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: "true",
    }
})

app.use(helmet())
app.use(
    cors({
        origin: "http://localhost:3000",
        // methods: ['GET', 'POST', 'OPTIONS'], // Explicitly allow these methods
        // allowedHeaders: ['Content-Type'], // Explicitly allow these headers
        credentials: true,
    })
)

app.use(express.json())

app.use("/api/user", authRouter)
app.use("/api", inspectionRouter)
app.use("/api", settingsRouter)

io.on("connection", (socket) => {})

const PORT = process.env.BACKEND_PORT || 5000
app.listen(
    PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`);

    // Start the status check scheduler
    startStatusCheckScheduler();
});
