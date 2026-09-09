import { createSlice } from '@reduxjs/toolkit'

export type UserRegistered = {
  user: string | null
  password: string | null
  accessToken: string | null
  error: string | null
}

const initialState = { user: null, password: null, accessToken: null, error: null } satisfies UserRegistered as UserRegistered

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerSuccess(state, action) {
            state.user = action.payload.user
            state.password = action.payload.password
            state.accessToken = 'demo-token'
            state.error = null
        },
        registerFailure(state, action) {
            state.error = action.payload
        },
        clearError(state) {
            state.error = null
        },
    }
})

export const { clearError, registerSuccess, registerFailure } = userSlice.actions
export default userSlice.reducer