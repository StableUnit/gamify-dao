import { Document } from "mongoose"

export interface ITask extends Document {
  description: string, 
  proof_format: string, 
  reward: number, 
  repeats: number, 
  status: string, 
  onCompleteCall: string, 
  minLevel: number
}


