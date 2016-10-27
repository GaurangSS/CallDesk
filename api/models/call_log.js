/**
 * Call log.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName: 'Call_log',

	attributes: {

		call_id_pk: {
			type: 'integer',
			primaryKey: true,
			unique: true,
			autoIncrement: true
		},
		from_call: {
			type: 'string',
		},
		to_call: {
			type: 'string',
		},
		from_time: {
			type: 'string',
		},
		to_time: {
			type: 'string',
		},
		call_type: {
			type: 'string',
		},
		ApplicationSid: {
			type: 'string',
		},
		ApiVersion: {
			type: 'string',
		},
		called: {
			type: 'string',
		},
		caller: {
			type: 'string',
		},
		record: {
			type: 'string',
		},
		CallStatus: {
			type: 'string',
		},
		from: {
			type: 'string',
		},
		CallSid: {
			type: 'string',
		},
		To: {
			type: 'string',
		},
		Direction: {
			type: 'string',
		},
		AccountSid: {
			type: 'string',
		},
		get_log :{
			collection:'Call_callback',
			via:'call_log_id',
		}
		
		
  	}
};