const registrationController = (req, res) => {
  try {
    res.status(200).json({ message: "Cadastro realizado com sucesso!" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Erro interno no servidor" })
  }
}

module.exports = registrationController
