import database from "../repository/connection.js";


async function findUser(userName) {
    // cria a conexão com o banco
    const conn = await database.connect();
    // define a query que deverá ser enviada ao banco de dados
    const sql = 'SELECT * FROM user_tbl WHERE user_name = ?';
    const dataFind = [userName]
    // envia para o banco a query
    const [rows] = await conn.query(sql, dataFind);
    //encerra a conexão com banco
    conn.end();
    // retorna os resultados
    return rows;
}

export default { findUser };