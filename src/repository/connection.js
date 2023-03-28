import mysql from 'mysql2/promise'

async function connect() {
  const connection = await mysql.createConnection({
    host: 'bexnqaxu9hxqnn1pynsw-mysql.services.clever-cloud.com',
    user: 'uho9bg78dgr9bpzz',
    password: 'MAqhfWoXHV46ehIRbuXz',
    database: 'bexnqaxu9hxqnn1pynsw'
  });

  return connection;
}

export default { connect };
