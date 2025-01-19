const express = require("express")
const path = require("path")
const fs = require("fs")
const { exec } = require("child_process")

const app = express()
const port = 3000

const frontendDir = path.join(__dirname, "../frontend")
const distDir = path.join(frontendDir, "dist")

const buildFrontend = async () => {
  const distDirExist = fs.existsSync(distDir)

  if (!distDirExist) {
    console.log("Iniciando o build do frontend...")

    try {
      await new Promise((resolve, reeject) => {
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
    app.use(express.static(distDir))

    app.get("/registration", (req, res) => {
      res.sendFile(path.join(distDir, "index.html"))
    })

    app.post("/registration", (req, res) => {
      return res.status(200).json({ message: "Cadastro realizado com sucesso" })
    })

    app.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}`)
    })
  })
  .catch((err) => {
    console.log(`Erro crítico ${err}`)
  })
