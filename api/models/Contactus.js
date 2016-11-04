module.exports = {

  tableName: 'Contactus',

  attributes: {

  	id: {
  	  type: 'integer',
  	  primaryKey: true,
  	  unique: true,
  	  autoIncrement: true
  	},

  	firstname: {
      type: 'string',
      index: true,
      required: true
    },

    lastname: {
      type: 'string',
      index: true,
      required: true
    },

    company_name: {
      type: 'string',
      index: true,
    },

    mob_num: {
      type: 'string',
      index: true,
    },


  	email: {
  	  type: 'email',
      index: true
  	},
  }
};