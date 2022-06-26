import { ITask } from "../task"
import { model, Schema } from "mongoose"

const taskSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    proof_format: {
      type: String,
      required: true,
    },
    reward: {
      type: Number,
      required: true,
    },
    repeats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    onCompleteCall: {
      type: String,
      required: true,
    },
    minLevel: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

export default model<ITask>("task", taskSchema)