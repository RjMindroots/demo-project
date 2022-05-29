import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { postRequest } from 'commonapi'

const initialState = {
  userList: [],
  loading: false
}

export const getUser = createAsyncThunk(
    'getUserList',
    async () => {
        let response = await postRequest({ sub_url: '/allusers'})
        return response
    }
)

export const userListReducer = createSlice({
  name: 'Userslist',
  initialState,
  reducers: {
    resetUserlist: (state, action) => {
      state.userList =  []
    }
  },
  extraReducers:{
    [getUser.pending]: (state, action) => {
        state.loading = true
    },
    [getUser.rejected]: (state, action) => {
        state.loading = false
    },
    [getUser.fulfilled]: (state, action) => {
        state.loading = false
        if(action.payload.status === true) {
            state.userList = action.payload.data
        }

    }
  }
})

export const {resetUserlist } = userListReducer.actions
export default userListReducer.reducer