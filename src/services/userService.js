import database from "../repository/connection.js";

// cria a função de inserção de usuários
async function insertUser(userName, linkedin, github) {
    // cria a conexão com o banco
    const conn = await database.connect();
    // define a query que deverá ser enviada ao banco de dados
    const sql = 'INSERT INTO user_tbl(user_name, linkedin, github) VALUES(?,?,?);';
    // recebe os dados do front-end como array
    const dataUser = [userName, linkedin, github];
    // envia para o banco a união da query e dos dados do front-end
    await conn.query(sql, dataUser);
    //encerra a conexão com banco
    conn.end();
}

async function findUser() {
    // cria a conexão com o banco
    const conn = await database.connect();
    // define a query que deverá ser enviada ao banco de dados
    const sql = 'SELECT * FROM user_tbl';
    // envia para o banco a query
    const [rows] = await conn.query(sql);
    //encerra a conexão com banco
    conn.end();
    // retorna os resultados
    return rows;
}

export default { insertUser, findUser };