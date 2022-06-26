import { Router } from "express";
import {
    createTask,
    getTaskToVerificate,
    confirmTask,
    getTasks,
    takeTask,
    getUserTasks,
    сompleteTask,
} from "../controllers/tasks";

const router: Router = Router();

router.post("/createTask", createTask);

router.get("/getTaskToVerificate", getTaskToVerificate);

router.post("/confirmTask", confirmTask);

router.get("/getTasks", getTasks);

router.post("/takeTask", takeTask);

router.get("/getUserTasks", getUserTasks);

router.post("/сompleteTask", сompleteTask);

export default router;
