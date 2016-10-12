/**
 * User_status_info.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName: 'user_status_info',

	attributes: {

		usi_id: {
			type: 'integer',
			primaryKey: true,
			unique: true,
			autoIncrement: true
		},

		user_id: {
			type: 'integer',
			index: true
		},

		//1 - Available, 2 - Custom time, 3 - Not Available
		availibility_status: {
			type: 'integer',
		//	defaultsTo: 3
		},

		//0 - 
		assign_device_status: {
			type: 'integer',
		},

		assign_device_num: {
			type: 'string',
		},

  	}
};