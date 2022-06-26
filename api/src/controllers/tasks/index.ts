import { Response, Request } from "express"
import { ITodo } from "../../types/todo"
import { ITask } from "../../types/task"
import { IJob } from "../../types/job"
import Todo from "../../types/models/todo"
import Task from "../../types/models/task"
import Job from "../../types/models/job"

/*

createTask(name, description, xp, deadlineMs)
Returns 200 or 503
getTaskToVerificate(userAddress)
Returns { taskId, name, description, xp, proofs: string[] }
confirmTask(taskId, inConfirmed)
Returns 200 or 503
getTasks()
Returns {id, name, description, xp, deadlineMs}[]
takeTask(userAddress, taskId)
Returns 200 or 503
getUserTasks(userAddress)
Returns { id, name, description, xp, deadlineMs, proofs: string[] }[]
сompleteTask(userAddress, taskId, proofs: Record<string, string>)

createTask, getTaskToVerificate, confirmTask, getTasks, takeTask, getUserTasks, сompleteTask
*/

const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITask, "description" | "proof_format" 
    | "reward" | "repeats" | "status" | "onCompleteCall" | "minLevel">

    const task: ITask = new Task({
      description: body.description,
      proof_format: body.proof_format,
      reward: body.reward,
      repeats: body.repeats,
      status: body.status,
      onCompleteCall: body.onCompleteCall,
      minLevel: body.minLevel,
    })

    // const task: ITask = new Task({
    //   description: "sdfsdc", 
    //   proof_format: "vcbcvb",
    //   reward:  3, 
    //   repeats:  5, 
    //   status:  "xcvxcv", 
    //   onCompleteCall:  "sldmcsdc", 
    //   minLevel:  7, 
    // })

    const newTask: ITask = await task.save()
    const allTasks: ITask[] = await Task.find()
      
    res
      .status(201)
      .json({ message: "Task added", task: newTask, tasks: allTasks })
  } catch (error) {
    res.status(503).send(error);
  }
}

const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.find()
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(503).send(error);
  }
}

const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  // try {
  //   const userTasks: IJob[] | null = await Job.find(
  //     { user_id :  req.params.userAddress }
  //   )
  //   const allTodos: ITodo[] = await Todo.find({
  //     { '_id': { $in: } }
  //   })
  //   res.status(200).json({
  //     message: "Todo deleted",
  //     todo: deletedTodo,
  //     todos: allTodos,
  //   })
  // } catch (error) {

  //   throw error
  // }
}

const getTaskToVerificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.find()
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(503).send(error);
  }
}

const confirmTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.find()
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(503).send(error);
  }
}

const takeTask = async (req: Request, res: Response): Promise<void> => {
  // try {
  //   const body = req.body as Pick<ITask, "description" | "proof_format" 
  //   | "reward" | "repeats" | "status" | "onCompleteCall" | "minLevel">

  //   req.params.id

  //   const task: ITask = new Task({
  //     description: body.description,
  //     proof_format: body.proof_format,
  //     reward: body.reward,
  //     repeats: body.repeats,
  //     status: body.status,
  //     onCompleteCall: body.onCompleteCall,
  //     minLevel: body.minLevel,
  //   })

  //   // const task: ITask = new Task({
  //   //   description: "sdfsdc", 
  //   //   proof_format: "vcbcvb",
  //   //   reward:  3, 
  //   //   repeats:  5, 
  //   //   status:  "xcvxcv", 
  //   //   onCompleteCall:  "sldmcsdc", 
  //   //   minLevel:  7, 
  //   // })

  //   const newTask: ITask = await task.save()
  //   const allTasks: ITask[] = await Task.find()
      
  //   res
  //     .status(201)
  //     .json({ message: "Task added", task: newTask, tasks: allTasks })
  // } catch (error) {
  //   res.status(503).send(error);
  // }
}

const сompleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.find()
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(503).send(error);
  }
}



const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<ITodo, "name" | "description" | "status">
  
      const todo: ITodo = new Todo({
        name: "test1",//body.name,
        description: "desct1",//body.description,
        status: 1//body.status,
      })
  
      const newTodo: ITodo = await todo.save()
      const allTodos: ITodo[] = await Todo.find()
  
      res
        .status(201)
        .json({ message: "Todo added", todo: newTodo, todos: allTodos })
    } catch (error) {
      throw error
    }
}

// const updateTodo = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const {
//         params: { id },
//         body,
//       } = req
//       const updateTodo: ITodo | null = await Todo.find(
//         { _id: id },
//         body
//       )
//       const allTodos: ITodo[] = await Todo.find()
//       res.status(200).json({
//         message: "Todo updated",
//         todo: updateTodo,
//         todos: allTodos,
//       })
//     } catch (error) {
//       throw error
//     }
// }

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
        req.params.id
      )
      const allTodos: ITodo[] = await Todo.find()
      res.status(200).json({
        message: "Todo deleted",
        todo: deletedTodo,
        todos: allTodos,
      })
    } catch (error) {

      throw error
    }
}
  
  export { createTask, getTaskToVerificate, confirmTask, getTasks, takeTask, getUserTasks, сompleteTask }
