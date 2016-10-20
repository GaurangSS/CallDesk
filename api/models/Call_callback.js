/**
 * User_status_info.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName: 'Call_callback',

	attributes: {

		callback_id_pk: {
			type: 'integer',
			primaryKey: true,
			unique: true,
			autoIncrement: true
		},
		ApiVersion: {
			type: 'string',
		},
		Called: {
			type: 'string',
		},
		CallStatus: {
			type: 'string',
		},
		RecordingSid: {
			type: 'string',
		},
		RecordingUrl: {
			type: 'string',
		},
		From: {
			type: 'string',
		},
		DialCallStatus: {
			type: 'string',
		},
		Direction: {
			type: 'string',
		},
		AccountSid: {
			type: 'string',
		},
		DialCallDuration: {
			type: 'string',
		},
		ApplicationSid: {
			type: 'string',
		},
		Caller: {
			type: 'string',
		},
		DialCallSid: {
			type: 'string',
		},
		CallSid: {
			type: 'string',
		},
		To: {
			type: 'string',
		},
		RecordingDuration: {
			type: 'string',
		},

  	}
};