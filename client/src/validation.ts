type LoginErrors = {
  email: string
  password: string
}

export function validateLogin(email: string, password: string): LoginErrors {
  const emailRegex = new RegExp('\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b')
    const newErrors = {
      email: '',
      password: '',
    }

    if (!emailRegex.test(email.toUpperCase())) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (password.trim().length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.'
    }
    return { email: newErrors.email, password: newErrors.password }
}
