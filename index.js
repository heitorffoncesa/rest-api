const customExpress = require('./config/customExpress')
const conn = require('./infraestrutura/conexao')

const Tabelas = require('./infraestrutura/tabelas')

conn.connect(err => {
    if (err)
        console.error(err)
    else {
        Tabelas.init(conn)

        customExpress()
            .listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
})

