import mongoose, { Mongoose } from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      // Tracking data
      // Passing other reference in sub_todo.models is passing
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // Array of sub todos
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTodo',
      },
    ],
  },
  { timestamps: true }
);

export const Todo = mongoose.model('Todo', todoSchema);
