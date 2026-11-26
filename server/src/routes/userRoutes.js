import { Router } from "express"
import { authenticateUser } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/authorizationMiddleware.js"
import { userController } from "../controllers/userController.js"

const userRouter = Router()
userRouter.get("/", authenticateUser, authorizeRoles(["Admin"]), userController)

export default userRouter

