
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
  	  type: 'integer',
  	},

    numberId: {
      type: 'integer',
    },

    allocatedDate: {
      type: 'datetime',
    },

    removeAllocatedDate: {
      type: 'datetime',
    },

    allocationStatus: {
      type: 'boolean'
    }  	
  }
};