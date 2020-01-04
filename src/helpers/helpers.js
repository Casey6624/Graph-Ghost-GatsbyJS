export const validateEmail = input => {
  if (input.trim().includes('@') && input.trim().includes('.')) {
    return true
  } else {
    return false
  }
}

export const validateSpecialChar = input => {
  const conditions = [
    '!',
    '?',
    ' ',
    '*',
    '/',
    '\\',
    '`',
    '#',
    '~',
    '=',
    '+',
    '-',
  ]
  const testInput = conditions.some(cond => input.includes(cond))
  // if true then contains illegal characters
  return testInput
}
