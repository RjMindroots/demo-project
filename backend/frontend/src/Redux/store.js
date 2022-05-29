import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import userListReducer from './userListReducer'

export const store = configureStore({
  reducer: {
    authReducer,
    userListReducer
  },
})