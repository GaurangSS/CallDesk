
module.exports = {

  tableName: 'allocateNumber',

  attributes: {

  	id: {
  	  type: 'integer',
  	  primaryKey: true,
  	  unique: true,
  	  autoIncrement: true
  	},

  	userId: {
  	  collection: 'User',
      via: 'id'
  	},

    numberId: {
      collection: 'numberInfo',
      via: 'id'
    },

    // allocatedDate: {
    //   type: 'datetime',
    // },

    removeAllocatedDate: {
      type: 'datetime',
    },

    allocationStatus: {
      type: 'boolean'
    }  	
  }
};