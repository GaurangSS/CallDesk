/**
 * Voicemail_recording.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	voicemail_id: {
  	  type: 'integer',
  	  primaryKey: true,
  	  unique: true,
  	  autoIncrement: true
  	},
  	AccountSid: {
		type: 'string',
	},
	CallSid: {
		type: 'string',
	},
	RecordingSid: {
		type: 'string',
	},
	RecordingUrl: {
		type: 'string',
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
	From: {
		type: 'string',
	},
	To: {
		type: 'string',
	},
	Direction: {
		type: 'string',
	},
	RecordingDuration: {
		type: 'string',
	},

  }
};

