import express from "express"
import cors from "cors"
import helmet from "helmet"
import router from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"

export const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(helmet())
app.use("/api/auth", router)
app.use("/api/users", userRouter)