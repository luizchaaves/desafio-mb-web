const express = require("express")
const path = require("path")
const fs = require("fs")
const { exec } = require("child_process")
const cors = require("cors")

const registrationValidation = require("./middleware/registration-middleware")
const registrationController = require("./controller/registration-controller")

const app = express()
const port = 3000

const frontendDir = path.join(__dirname, "../frontend")
const distDir = path.join(frontendDir, "dist")

const buildFrontend = async () => {
  const distDirExist = fs.existsSync(distDir)

  if (!distDirExist) {
    console.log("Iniciando o build do frontend...")

    try {
      await new Promise((resolve, reject) => {
        exec("npm run build", { cwd: frontendDir }, (error, stdout, stderr) => {
          if (error) {
            reject(
              `Falha ao rodar o build do frontend: ${stderr || error.message}`
            )
          } else {
            console.log(stdout)
            resolve("Build do frontend concluído")
          }
        })
      })
    } catch (err) {
      console.log(err)
      throw new Error("Falha ao rodar o build do frontend")
    }
  }
}

buildFrontend()
  .then(() => {
    app.use(cors())
    app.use(express.json())
    app.use(express.static(distDir))

    app.get("/registration", (req, res) => {
      res.sendFile(path.join(distDir, "index.html"))
    })

    app.post("/registration", registrationValidation, registrationController)

    app.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}`)
    })
  })
  .catch((err) => {
    console.log(`Erro crítico ${err}`)
  })
