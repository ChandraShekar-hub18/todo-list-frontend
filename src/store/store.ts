// import { Action, configureStore } from "@reduxjs/toolkit";
// import { ThunkAction } from "redux-thunk";
// import todoReducer from "./../components/todo/todoSlice";

// const store = configureStore({
//   reducer: {
//     todos: todoReducer,
//   },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         thunk: {extraArgument: {} },
//         serializableCheck: false,
//       }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
// export default store;

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoReducer from "../components/todo/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
