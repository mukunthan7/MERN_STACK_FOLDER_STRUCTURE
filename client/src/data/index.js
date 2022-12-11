import { configureStore } from "@reduxjs/toolkit";
import authReucer from "./auth";

export default configureStore({
  reducer: {
    auth: authReucer,
  },
});
