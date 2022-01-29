const Atendimento = require('../models/atendimento')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const { id } = req.params
        Atendimento.buscaPorId(parseInt(id), res)
    })

    app.post('/atendimentos', (req, res) => {
        Atendimento.adiciona(req.body, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const { id } = req.params
        Atendimento.altera(parseInt(id), req.body, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const { id } = req.params
        Atendimento.deleta(parseInt(id), res)
    })
}