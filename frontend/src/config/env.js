const developmentEnv = {
  registrationApiUrl: "http://localhost:3000",
}

const builtEnv = {
  registrationApiUrl: "http://localhost:3000",
}

export const env = import.meta.env.DEV ? developmentEnv : builtEnv
