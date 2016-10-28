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
		from: {
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
		called: {
			type: 'string',
		},
		ToState: {
			type: 'string',
		},
		CallerCountry: {
			type: 'string',
		},
		Direction: {
			type: 'string',
		},
		CallerState: {
			type: 'string',
		},
		ToZip: {
			type: 'string',
		},
		CallerZip: {
			type: 'string',
		},
		ToCountry: {
			type: 'string',
		},
		ApiVersion: {
			type: 'string',
		},
		CalledZip: {
			type: 'string',
		},
		CalledCity: {
			type: 'string',
		},
		CallStatus: {
			type: 'string',
		},
		From: {
			type: 'string',
		},
		AccountSid: {
			type: 'string',
		},
		CalledCountry: {
			type: 'string',
		},
		CallerCity: {
			type: 'string',
		},
		Caller: {
			type: 'string',
		},
  	}
};