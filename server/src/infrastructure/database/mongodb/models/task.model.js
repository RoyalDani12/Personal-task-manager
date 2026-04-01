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
    difficultyLevel: { 
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    required_time: {
      type: Number, // total required time in minutes
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // who created the task
      required: true,
    },
    startedDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    sessions: [
      {
        startTime: Date,
        endTime: Date,
      },
    ],
    totalWorkedTime: {
      type: Number, // milliseconds
      default: 0,
    },
    isRunning: {
      type: Boolean,
      default: false,
    }, //   add when it should be  started
    //  how can identify the system  the user is active of not
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  },
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
