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

  	username: {
  	  type: 'email',
      index: true
  	},

    password: {
      type: 'string',
      psssword:true
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