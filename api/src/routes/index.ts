import { Router } from "express"
import { createTask, getTaskToVerificate, confirmTask, getTasks, 
    takeTask, getUserTasks, сompleteTask } from "../controllers/tasks"

const router: Router = Router()

router.get("/createTask", createTask)

router.get("/getTaskToVerificate", getTaskToVerificate)

router.get("/confirmTask", confirmTask)

router.get("/getTasks", getTasks)

router.get("/takeTask", takeTask)

router.get("/getUserTasks", getUserTasks)

router.get("/сompleteTask", сompleteTask)

export default router;
