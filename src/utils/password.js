export function checkNumber(pass) {
  return typeof pass === 'string' && /\d/.test(pass);
}

export function checkSymbol(pass) {
  return typeof pass === 'string' && /[!@#$%^&*(),.?":{}|<>_]/.test(pass);
}

export function checkPass(pass) {
  return checkNumber(pass) && checkSymbol(pass);
}
