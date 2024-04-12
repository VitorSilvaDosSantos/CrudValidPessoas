const express = require('express')
const app = express()

// middlewares
app.use(express.json())

// rotas
const pessoas = require('./routes/ValidPessoas')
app.use(pessoas)


app.listen(3000, () => {
    console.log("Aplicação rodando em http://localhost:3000")
})