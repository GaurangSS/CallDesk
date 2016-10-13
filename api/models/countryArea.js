module.exports = {
  tableName: 'countryArea',
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
    areaCode: {
      type: 'varchar',
      required: true
    },
  }
}