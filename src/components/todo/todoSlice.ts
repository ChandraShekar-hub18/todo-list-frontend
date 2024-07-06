// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getAllTodo } from "../../services/dataApi";
// import { AppThunk } from "../../store/store";

// export interface Todo {
//   _id: string;
//   title: string;
//   completed: boolean;
// }

// interface TodoState {
//   todos: Todo[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TodoState = {
//   todos: [],
//   loading: false,
//   error: null,
// };

// const todoSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
    
//     fetchTodosStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchTodosSuccess(state, action: PayloadAction<Todo[]>) {
//       state.todos = action.payload;
//       state.loading = false;
//     },
//     fetchTodosFailure(state, action: PayloadAction<string>) {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     deleteTodo(state, action:PayloadAction<string>){
//       state.loading = false;
//       state.todos = state.todos.filter(el => action.payload != el._id);
//     }
//   },
// });

// export const { fetchTodosStart, fetchTodosSuccess, fetchTodosFailure,deleteTodo } =
//   todoSlice.actions;

// export const fetchTodos = (): AppThunk => async (dispatch) => {
//   try {
//     dispatch(fetchTodosStart());
//     const todos = await getAllTodo();
//     dispatch(fetchTodosSuccess(todos));
//   } catch (error) {
//     if (error instanceof Error) {
//       dispatch(fetchTodosFailure(error.message));
//     } else {
//       dispatch(fetchTodosFailure("An unknown error occurred"));
//     }
//   }
// };

// export default todoSlice.reducer;


import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTodo, deleteById } from "../../services/dataApi";
import {  RootState } from "../../store/store";

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Thunk for fetching todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await getAllTodo();
  return response;
});

// Thunk for deleting a todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  await deleteById(id);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message || "An unknown error occurred";
        state.loading = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export default todoSlice.reducer;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;
