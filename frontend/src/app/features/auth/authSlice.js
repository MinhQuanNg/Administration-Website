import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser } from './authActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

// initialize userInfo from local storage
const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


const initialState = {
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers(builder) {
    builder
    // login user
    .addCase(loginUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true
      state.userInfo = payload
      state.userToken = payload.userToken
    })
    .addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
    // register user
    .addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true
      state.userInfo = payload
    })
    .addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
  },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer