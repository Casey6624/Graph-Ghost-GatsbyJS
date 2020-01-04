export const validateEmail = input => {
  if (input.trim().includes('@') && input.trim().includes('.')) {
    return true
  } else {
    return false
  }
}
