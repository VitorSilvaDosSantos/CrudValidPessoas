const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// Lista mockada de pessoas
let listaPessoas = [
    {
        id: 1,
        nome: "João",
        idade: 30,
        email: "joao@email.com",
        telefone: "61900010001"
    },
    {
        id: 2,
        nome: "Maria",
        idade: 25,
        email: "maria@email.com",
        telefone: "61900010002"
    },
    {
        id: 3,
        nome: "Pedro",
        idade: 40,
        email: "pedro@email.com",
        telefone: "61900010003"
    }
]

// READ -> Buscar todas as pessoas
app.get('/pessoas', (req, res) => {
    res.json(listaPessoas)
})

// READ -> Buscar a pessoa pelo ID
app.get('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pessoa = listaPessoas.find(pessoa => pessoa.id === id)
    if (!pessoa) {
        res.status(404).json({ mensagem: "Pessoa não encontrada" })
    } else {
        res.json(pessoa)
    }
})

// CREATE -> Criar uma nova pessoa
app.post('/pessoas', (req, res) => {
    const novaPessoa = req.body

    if (!novaPessoa.nome || !novaPessoa.idade || !novaPessoa.email || !novaPessoa.telefone) {
        res.status(400).json({ mensagem: "Todos os atributos devem ser preenchidos" })
    } else {
        const pessoa = {
            id: listaPessoas.length > 0 ? listaPessoas[listaPessoas.length - 1].id + 1 : 1,
            nome: novaPessoa.nome,
            idade: novaPessoa.idade,
            email: novaPessoa.email,
            telefone: novaPessoa.telefone
        }

        listaPessoas.push(pessoa)

        res.status(201).json({ mensagem: "Pessoa cadastrada com sucesso!" })
    }
})

// DELETE -> Deletar uma pessoa
app.delete('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = listaPessoas.findIndex(pessoa => pessoa.id === id)
    if (index === -1) {
        res.status(404).json({ mensagem: "Pessoa não encontrada" })
    } else {
        listaPessoas.splice(index, 1)
        res.json({ mensagem: "Pessoa excluída com sucesso" })
    }
})

// UPDATE -> Atualizar uma pessoa
app.put('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const novosDados = req.body

    const index = listaPessoas.findIndex(pessoa => pessoa.id === id)

    if (index === -1) {
        res.status(404).json({ mensagem: "Pessoa não encontrada" })
    } else if (!novosDados.nome || !novosDados.idade || !novosDados.email || !novosDados.telefone) {
        res.status(400).json({ mensagem: "Todos os atributos devem ser preenchidos" })
    } else {
        listaPessoas[index] = {
            id: id,
            nome: novosDados.nome,
            idade: novosDados.idade,
            email: novosDados.email,
            telefone: novosDados.telefone
        }
        res.json({ mensagem: "Pessoa atualizada com sucesso!" })
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
