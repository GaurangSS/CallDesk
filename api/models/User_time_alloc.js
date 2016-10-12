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

	  	day: {
	  		type: 'string'
	  	},

	  	from_time: {
	  		type: 'string'
	  	},

	  	to_time: {
	  		type: 'string'
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

