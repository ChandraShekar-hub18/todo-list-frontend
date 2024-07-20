// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { getAllTodo, deleteById } from "../../services/dataApi";
// import { RootState } from "../../store/store";
// import _ from "lodash";

// export interface Todo {
//   _id: string;
//   title: string;
//   completed: boolean;
// }

// interface TodoState {
//   todos: [] | Todo[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TodoState = {
//   todos: [],
//   loading: false,
//   error: null,
// };

// // Thunk for fetching todos
// export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
//   const response = await getAllTodo();
//   return response;
// });

// // Thunk for deleting a todo
// export const deleteTodo = createAsyncThunk(
//   "todos/deleteTodo",
//   async (id: string) => {
//     await deleteById(id);
//     return id;
//   }
// );

// const todoSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTodos.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
//         state.todos = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchTodos.rejected, (state, action) => {
//         state.error = action.error.message || "An unknown error occurred";
//         state.loading = false;
//       })
//       .addCase(deleteTodo.fulfilled, (state, action) => {
//         // console.log(convertProxyObjectToPojo(state), action);
//         // state = convertProxyObjectToPojo(state);
//         // state.todos = state.todos.todos.filter((todo: Todo) => {
//         //   console.log(todo);
//         //   return todo._id != action.payload;
//         // });
//         state.todos = state.todos.filter((todo) => todo._id !== action.payload);
//       })
//       .addCase(deleteTodo.rejected, (state, action) => {
//         state.error = action.error.message || "An unknown error occurred";
//       });
//   },
// });

// //eslint-disable-next-line
// function convertProxyObjectToPojo(proxyObj: object) {
//   return _.cloneDeep(proxyObj);
// }

// export default todoSlice.reducer;

// export const selectTodos = (state: RootState) => state.todos.todos;
// export const selectLoading = (state: RootState) => state.todos.loading;
// export const selectError = (state: RootState) => state.todos.error;

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTodo, deleteById, createTodo } from "../../services/dataApi";
import { RootState } from "../../store/store";

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  addTodo: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  addTodo: false,
  error: null,
};

// Thunk for fetching todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await getAllTodo();
  console.log(response);
  return response;
});

// Thunk for deleting a todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    console.log(id);
    const response = await deleteById(id);
    console.log(response);

    return id;
  }
);

// Thunk for adding a Todo
export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await createTodo(todo);
  console.log(response);
  if (response.status === 201) {
    return todo;
  } else return response;
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
        console.log(state, action);
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message || "An unknown error occurred";
        state.loading = false;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos.todos = state.todos?.todos.filter(
          (todo) => todo._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message || "An unknown error occurred";
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.todos.todos = [...state.todos.todos, action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export default todoSlice.reducer;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;
