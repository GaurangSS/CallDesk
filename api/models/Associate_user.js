/**
 * AssociateUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {

 	tableName: 'Associate_user',

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
 			index: true,
 			required: true
 		},

 		created_at: {
 			type: 'datetime',
 			columnName: 'createdAt'
 		},
 	}
 };