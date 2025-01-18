export const formatDate = (date) => {
  let dateFormated = date.replace(/\D/g, "")
  dateFormated = dateFormated.replace(/(\d{2})(\d)/, "$1/$2")
  dateFormated = dateFormated.replace(/(\d{2})(\d)/, "$1/$2")
  return dateFormated
}

export const formatCnpj = (cnpj) => {
  let cnpjFormated = cnpj.replace(/\D/g, "")
  cnpjFormated = cnpjFormated.replace(/^(\d{2})(\d)/, "$1.$2")
  cnpjFormated = cnpjFormated.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
  cnpjFormated = cnpjFormated.replace(/\.(\d{3})(\d)/, ".$1/$2")
  cnpjFormated = cnpjFormated.replace(/(\d{4})(\d)/, "$1-$2")
  return cnpjFormated
}

export const formatCpf = (cpf) => {
  let cpfFormated = cpf.replace(/\D/g, "")
  cpfFormated = cpfFormated.replace(/(\d{3})(\d)/, "$1.$2")
  cpfFormated = cpfFormated.replace(/(\d{3})(\d)/, "$1.$2")
  cpfFormated = cpfFormated.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  return cpfFormated
}

export const formatPhone = (phone) => {
  let phoneFormated = phone.replace(/\D/g, "")
  phoneFormated = phoneFormated.replace(/^(\d\d)(\d)/g, "($1) $2")
  phoneFormated = phoneFormated.replace(/(\d)(\d{4})$/, "$1-$2")
  return phoneFormated
}
