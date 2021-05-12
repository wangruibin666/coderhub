const connection = require('../app/database');


class AuthService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    console.log(id, userId)
    const [result] = await connection.execute(statement, [id, userId]);
    console.log(result)

    return result.length ? true : false;
  }
}

module.exports = new AuthService();
