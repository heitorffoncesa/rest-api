const moment = require('moment')

const conn = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:SS')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 4

        const validacoe = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoe.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros){
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = `INSERT INTO atendimentos SET ?`

            conn.query(sql, atendimentoDatado, (err, data) => {
                if (err)
                    res.status(400).json(err)
                else
                    res.status(201).json(data)
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos'

        conn.query(sql, (err, data) => {
            if (err)
                res.status(400).json(err)
            else
                res.status(200).json(data)
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`

        conn.query(sql, (err, data) => {
            if (err)
                res.status(400).json(err)
            else
                res.status(200).json(data[0])
        })
    }

    altera(id, valores, res) {
        if (valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:SS')
        }
        const sql = `UPDATE atendimentos SET ? WHERE id = ?`

        conn.query(sql, [valores, id], (err, data) => {
            if (err)
                res.status(400).json(err)
            else
                res.status(200).json(data)
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?'

        conn.query(sql, id, (err, data) => {
            if (err)
                res.status(400).json(err)
            else
                res.status(200).json(data)
        })
    }
}

module.exports = new Atendimento