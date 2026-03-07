import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    difficulityLevel: {
      type:String,
      enum:['easy','meddium','hard'],
      default:'meddium'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the user collection
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // who created the task
      required: true,
    },
    startedDate: {
      type:Date
    },
    dueDate: {
      type: Date,
    },        //   add when it should be  started
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // optional, if you implement comments later
      },
    ],
      //  how can identify the system  the user is active of not active
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;