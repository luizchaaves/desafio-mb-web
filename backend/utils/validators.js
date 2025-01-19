const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

const validatePhone = (phone) => {
  const phonePattern = /^(?:\(\d{2}\)\s?(?:9\d{4}-\d{4}|\d{4}-\d{4}))$/
  return phonePattern.test(phone)
}

const validateDate = (date) => {
  const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

  if (!datePattern.test(date)) return false

  const [day, month, year] = date.split("/").map(Number)
  const dateObj = new Date(year, month - 1, day)
  return (
    dateObj.getDate() === day &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getFullYear() === year
  )
}

const validateCpf = (cpf) => {
  cpf = cpf.replace(/\D/g, "")
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false
  }
  let sum = 0
  let remainder
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i)
  }
  remainder = sum % 11
  let firstVerifier = remainder < 2 ? 0 : 11 - remainder
  if (parseInt(cpf[9]) !== firstVerifier) {
    return false
  }
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i)
  }
  remainder = sum % 11
  let secondVerifier = remainder < 2 ? 0 : 11 - remainder
  return parseInt(cpf[10]) === secondVerifier
}

const validateCnpj = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, "")
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    return false
  }
  let sum = 0
  let remainder
  let firstVerifier = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj[i]) * firstVerifier[i]
  }
  remainder = sum % 11
  let firstDigit = remainder < 2 ? 0 : 11 - remainder
  if (parseInt(cnpj[12]) !== firstDigit) {
    return false
  }
  sum = 0
  let secondVerifier = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj[i]) * secondVerifier[i]
  }
  remainder = sum % 11
  let secondDigit = remainder < 2 ? 0 : 11 - remainder
  return parseInt(cnpj[13]) === secondDigit
}

module.exports = {
  validateEmail,
  validatePhone,
  validateCnpj,
  validateDate,
  validateCpf,
}
