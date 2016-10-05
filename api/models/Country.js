module.exports = {
 tableName: 'country',
 attributes: {
   id: {
      type: 'number',
      primaryKey: true,
  	  unique: true,
  	  autoIncrement: true
   },

   // e.g., 3.26
   counName: {
      type: 'string',
      required: true
   },
 }
}