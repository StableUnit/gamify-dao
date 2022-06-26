import { IJob } from "../job"
import { model, Schema } from "mongoose"

const jobSchema: Schema = new Schema(
  {
    task_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    proof: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default model<IJob>("job", jobSchema)