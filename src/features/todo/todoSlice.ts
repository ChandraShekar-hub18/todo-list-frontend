import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTodo } from "../../services/dataApi";
import { AppThunk } from "../../store/store";

export interface Todo {
  id: number;
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

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchTodosStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
      state.loading = false;
    },
    fetchTodosFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchTodosStart, fetchTodosSuccess, fetchTodosFailure } =
  todoSlice.actions;

export const fetchTodos = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchTodosStart());
    const todos = await getAllTodo();
    dispatch(fetchTodosSuccess(todos));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchTodosFailure(error.message));
    } else {
      dispatch(fetchTodosFailure("An unknown error occurred"));
    }
  }
};

export default todoSlice.reducer;
