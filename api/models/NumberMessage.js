/**
 * NumberMessage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'numberMessage',	
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			unique: true,
			autoIncrement: true
		},

		user_id: {
			type: 'integer',
		},

		number_id: {
			type: 'integer',
		},

		//1 - Welcome msg, 2 - Music on hold , 3 - Voicemail , 4 - Absence message
		msg_type: {
			type: 'integer',
		},

		//1 - text, 2 - audio
		music_type: {
			type: 'integer',
		},

		audio_text: {
			type: 'string',
		},

		audio_mp3: {
			type: 'text',
		},
	},
};

