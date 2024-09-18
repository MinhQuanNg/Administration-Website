// authActions.js
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:5001'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/user/register`,
        credentials,
        config
      )

      return data
    } catch (error) {
      return rejectWithValue(error.response.data.error)
    }
  }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }

        const { data } = await axios.post(
          `${backendURL}/api/user/login`,
          credentials,
          config
        )

        // store user's token in local storage
        localStorage.setItem('userToken', data.userToken)
        localStorage.setItem('userInfo', JSON.stringify(data))

        return data
      } catch (error) {
        return rejectWithValue(error.response.data.error)
      }
    }
  )