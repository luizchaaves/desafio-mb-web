const {
  validateCnpj,
  validateCpf,
  validateDate,
  validateEmail,
  validatePhone,
} = require("../utils/validators")

const validateField = (field) => {
  if (!field.value) {
    return field.requiredMessage
  }
  if (field.validateFn && typeof field.validateFn === "function") {
    return field.validateFn(field.value) ? null : field.errorMessage
  }
  return null
}

const validateRegistration = (data) => {
  const errors = []

  const commonFields = [
    {
      value: data.email,
      validateFn: validateEmail,
      errorMessage: "Email inválido",
      requiredMessage: "Email é obrigatório",
    },
    {
      value: data.personType,
      validateFn: null,
      errorMessage: "Tipo de pessoa inválido",
      requiredMessage: "Tipo de pessoa é obrigatório",
    },
    {
      value: data.phone,
      validateFn: validatePhone,
      errorMessage: "Telefone inválido",
      requiredMessage: "Telefone é obrigatório",
    },
    {
      value: data.password,
      validateFn: null,
      requiredMessage: "Senha é obrigatória",
    },
  ]

  commonFields.forEach((field) => {
    const error = validateField(field)
    if (error) errors.push(error)
  })

  if (data.personType === "pp") {
    const physicsPersonFields = [
      {
        value: data.name,
        validateFn: null,
        requiredMessage: "Nome é obrigatório",
      },
      {
        value: data.cpf,
        validateFn: validateCpf,
        errorMessage: "CPF inválido",
        requiredMessage: "CPF é obrigatório",
      },
      {
        value: data.birthdate,
        validateFn: validateDate,
        errorMessage: "Data de nascimento inválida",
        requiredMessage: "Data de nascimento é obrigatória",
      },
    ]

    physicsPersonFields.forEach((field) => {
      const error = validateField(field)
      if (error) errors.push(error)
    })
  } else if (data.personType === "jp") {
    const juridicPerson = [
      {
        value: data.company,
        requiredMessage: "Razão social é obrigatório",
      },
      {
        value: data.cnpj,
        validateFn: validateCnpj,
        errorMessage: "CNPJ inválido",
        requiredMessage: "CNPJ é obrigatório",
      },
      {
        value: data.openingDate,
        validateFn: validateDate,
        errorMessage: "Data de abertura inválida",
        requiredMessage: "Data de abertura é obrigatória",
      },
    ]

    juridicPerson.forEach((field) => {
      const error = validateField(field)
      if (error) errors.push(error)
    })
  }

  return errors
}

const registrationValidation = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ error: "Corpo da requisição vazio. Dados são obrigatórios" })
  }

  const validationErros = validateRegistration(req.body)

  if (validationErros.length) {
    return res.status(400).json({ erros: validationErros })
  }

  next()
}

module.exports = registrationValidation
