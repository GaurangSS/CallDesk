module.exports = {
  tableName: 'country',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    counName: {
      type: 'varchar',
      required: true
    },
  }
}