
const connection = require('../app/database');
class UserService {
  async create(user){
    //将user存到数据库
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUE (?, ?)`;
    const result = await connection.execute(statement, [name, password]);
    return result;
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return  result[0];
  }
}

module.exports = new UserService();
