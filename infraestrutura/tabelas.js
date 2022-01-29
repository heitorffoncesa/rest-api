class Tabelas {
    init(conn) {
        this.conn = conn

        this.criarAtendimentos()
    }

    criarAtendimentos() {
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos (
            id INT NOT NULL AUTO_INCREMENT, 
            cliente VARCHAR(50) NOT NULL,
            PET VARCHAR(20),
            servico VARCHAR(20) NOT NULL,
            data DATETIME NOT NULL,
            dataCriacao DATETIME NOT NULL,
            status VARCHAR(20) NOT NULL,
            observacoes TEXT, PRIMARY KEY(id)
        )`


        this.conn.query(sql, err => {
            if (err)
                console.error(err)
        })
    }
}

module.exports = new Tabelas