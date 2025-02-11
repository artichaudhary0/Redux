import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../feature/counter/counterSlice";
import todosSlice from "../feature/counter/todos/todosSlice";
import authSlice from "../feature/Auth/authSlice"

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        todos: todosSlice,
        auth: authSlice,
    }
})