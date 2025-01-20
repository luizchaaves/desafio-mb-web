import { env } from "../config/env"

const useRegistrationService = () => {
  const registrationBaseUrl = env.registrationApiUrl

  const createRegistration = async (formData) => {
    try {
      const response = await fetch(`${registrationBaseUrl}/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Falha ao tentar cadastrar")

      const data = await response.json()
      return data
    } catch (err) {
      console.log(err)
      throw new Error("Erro ao tentar acessar a api de cadastro")
    }
  }

  return {
    createRegistration,
  }
}

export default useRegistrationService
