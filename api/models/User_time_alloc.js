/**
 * UserTimeAlloc.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	tableName: 'user_time_alloc',

  	attributes: {
  		id: {
  			type: 'integer',
  			primaryKey: true,
	  	  	unique: true,
	  	  	autoIncrement: true
	  	},

	  	user_id: {
  			type: 'integer',
  			index: true
	  	},

	  	time_alloc: {
	  		type: 'integer'
	  	},

	  	from_time: {
	  		type: 'time'
	  	},

	  	to_time: {
	  		type: 'time'
	  	},

	  	allocation_status: {
	  		type: 'integer'
	  	},

	  	created_at: {
  	  		type: 'datetime',
	  	  	columnName: 'createdAt'
	  	},

  		updated_at: {
  	  		type: 'datetime',
  	  		columnName: 'updatedAt'
  		},
  	}
};

