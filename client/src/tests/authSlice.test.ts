import { describe, it, expect } from 'vitest'
import authReducer, { loginStart, logout, loginSuccess, loginFailure, type AuthState } from '../store/authSlice'

const initialState = { status: 'idle', user: null, accessToken: null, error: null } satisfies AuthState as AuthState

describe('authReducer', () => {
  it('loginStart sets status to loading and clears error', () => {
    const newState = authReducer(initialState, loginStart())
    expect(newState.status).toBe('loading')
    expect(newState.error).toBe(null)
  })

  it('loginSuccess stores user and token, sets status to succeeded', () => {
    const newState = authReducer(initialState, loginSuccess({ accessToken: 'some-token', user: 'John Doe' }))
    expect(newState.status).toBe('succeeded')
    expect(newState.accessToken).toBe('some-token')
    expect(newState.user).toBe('John Doe')
  })

  it('loginFailure stores error message and sets status to failed', () => {
    const newState = authReducer(initialState, loginFailure('Invalid credentials'))
    expect(newState.status).toBe('failed')
    expect(newState.error).toBe('Invalid credentials')
  })

  it('logout resets state to initial values', () => {
    const statefulState = { status: 'succeeded' as const, user: 'Jane', accessToken: 'token123', error: null }
    const newState = authReducer(statefulState, logout())
    expect(newState.status).toBe('idle')
    expect(newState.user).toBe(null)
    expect(newState.accessToken).toBe(null)
    expect(newState.error).toBe(null)
  })
})
