import { createSlice } from '@reduxjs/toolkit'

export type AuthState = {
  user: string | null
  accessToken: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState = { status: 'idle', user: null, accessToken: null, error: null } satisfies AuthState as AuthState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.status = 'loading'
            state.error = null
        },
        loginSuccess(state, action) {
            state.status = 'succeeded'
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
        },
        loginFailure(state, action) {
            state.status = 'failed'
            state.error = action.payload
        },
        logout(state) {
            state.status = 'idle'
            state.user = null
            state.accessToken = null
            state.error = null
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer