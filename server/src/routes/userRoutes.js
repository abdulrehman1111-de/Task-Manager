import { Router } from "express"
import { authenticateUser } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/authorizationMiddleware.js"
import { createUserController, deleteUserController, updateUserController, userController } from "../controllers/userController.js"

const userRouter = Router()
userRouter.get("/", authenticateUser, authorizeRoles(["Admin"]), userController)
userRouter.post("/", authenticateUser, authorizeRoles(["Admin"]), createUserController)
userRouter.patch("/:id", authenticateUser, authorizeRoles(["Admin"]), updateUserController)
userRouter.delete("/:id", authenticateUser, authorizeRoles(["Admin"]), deleteUserController)

export default userRouter

