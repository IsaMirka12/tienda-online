const ExampleRepository = require('../../domain/repositories/ExampleRepository');
const pool = require('./MySQLConnection');
const queries = require('./queries/ExampleQueries');
const Example = require('../../domain/entities/Example');

class ExampleMySQLRepository extends ExampleRepository {
  async findById(id) {
    const [rows] = await pool.query(queries.FIND_BY_ID, [id]);
    if (rows.length === 0) return null;

    const { id: exampleId, name } = rows[0];
    return new Example(exampleId, name);
  }
}

module.exports = ExampleMySQLRepository;
