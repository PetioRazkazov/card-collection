import { expect, test } from 'vitest'
import { validateLogin } from '../validation.js'

test('validateLogin returns errors for invalid email and short password', () => {
  const email = 'invalid-email'
  const password = 'short'
  const errors = validateLogin(email, password)
  expect(errors.email).toBe('Please enter a valid email address.')
  expect(errors.password).toBe('Password must be at least 8 characters long.')
})

test('validateLogin returns no errors for valid email and password', () => {
  const email = 'test@gmail.com'
  const password = 'validpassword'
  const errors = validateLogin(email, password)
  expect(errors.email).toBe('')
  expect(errors.password).toBe('')
})

test('validateLogin returns error for valid email and short password', () => {
  const email = 'test@gmail.com'
  const password = 'short'
  const errors = validateLogin(email, password)
  expect(errors.email).toBe('')
  expect(errors.password).toBe('Password must be at least 8 characters long.')
})

test('validateLogin returns error for invalid email and valid password', () => {
  const email = 'invalid-email'
  const password = 'validpassword'
  const errors = validateLogin(email, password)
  expect(errors.email).toBe('Please enter a valid email address.')
  expect(errors.password).toBe('')
})

test('validateLogin returns errors for empty email and password', () => {
  const email = ''
  const password = ''
  const errors = validateLogin(email, password)
  expect(errors.email).toBe('Please enter a valid email address.')
  expect(errors.password).toBe('Password must be at least 8 characters long.')
})

test('validateLogin accepts a password with exactly 8 characters', () => {
  const errors = validateLogin('test@gmail.com', '12345678')
  expect(errors.password).toBe('')
})

test('validateLogin accepts uppercase email addresses', () => {
  const errors = validateLogin('TEST@GMAIL.COM', 'validpassword')
  expect(errors.email).toBe('')
})

test('validateLogin rejects an email without a domain extension', () => {
  const errors = validateLogin('test@gmail', 'validpassword')
  expect(errors.email).toBe('Please enter a valid email address.')
})

test('validateLogin rejects a password containing only spaces', () => {
  const errors = validateLogin('test@gmail.com', '        ')
  expect(errors.password).toBe('Password must be at least 8 characters long.')
})

test('validateLogin preserves meaningful leading and trailing password spaces', () => {
  const errors = validateLogin('test@gmail.com', ' password ')
  expect(errors.password).toBe('')
})