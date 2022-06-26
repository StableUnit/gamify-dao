import { Document } from "mongoose"

export interface IJob extends Document {
  task_id: string,
  user_id: string,
  proof: string,  
  status: string, 
}
