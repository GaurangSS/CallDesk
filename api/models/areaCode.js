module.exports = {
  tableName: 'areaCode',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    areaCode: {
      type: 'number'
    },
    areaName: {
      type: 'varchar',
    },
    counName: {
      type: 'varchar',
    },
  }
}