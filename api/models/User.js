/**
 * UserInfo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'Users',

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

  	email: {
  	  type: 'email',
      index: true
  	},

    password: {
      type: 'string',
      password:true
    },

    user_type_id: {
      type: 'integer',
      index: true,
      defaultsTo: 2
    },

    parent_id: {
      type: 'integer',
      index: true
    },

    delete_status: {
      type: 'integer'
    },

    active: {
      type:'boolean',
      default: 'true'
    },

  	created_at: {
  	  type: 'datetime',
  	  columnName: 'createdAt'
  	},

  	updated_at: {
  	  type: 'datetime',
  	  columnName: 'updatedAt'
  	},
  },
  types:{
    password: function(value) {
  // password must be of minimum six letters
  return _.isString(value) && value.length >= 6 ;
    }
  }
};