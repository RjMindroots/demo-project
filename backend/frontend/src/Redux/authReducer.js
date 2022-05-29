import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { postRequest } from 'commonapi'

const initialState = {
  isAuth: false,
  isAdmin: false,
  loading: false
}

export const getAuth = createAsyncThunk(
    'getAuthenticate',
    async (dataMain) => {
        let response = await postRequest({ sub_url: '/user', dataMain })
        return response
    }
)

export const authReducer = createSlice({
  name: 'Authntication',
  initialState,
  reducers: {
    setauth: (state, action) => {
      state.isAuth = action.payload.isAuth
      state.isAdmin = action.payload.isAdmin
    }
  },
  extraReducers:{
    [getAuth.pending]: (state, action) => {
        state.loading = true
    },
    [getAuth.rejected]: (state, action) => {
        state.loading = false
    },
    [getAuth.fulfilled]: (state, action) => {
        state.loading = false
        if(action.payload.status === true) {
            state.isAuth = true
          if(action.payload.data.role === "admin") {
            state.isAdmin = true
          } else {
            state.isAdmin = false
          }
        }

    }
  }
})

export const {setauth } = authReducer.actions
export default authReducer.reducer