module.exports = {
  tableName: 'tokens',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    userId: {
      type: 'integer',
      required: true,
      unique: true,
    },
    type: { 
    	type: 'string',
    	enum: ['activate', 'reserpassword'],
    },
    hash: {
    	type: 'string',
    	required: true
    },
    expires: {
    	type: 'date'
    }
  }
}
