 module.exports = {
  tableName: 'numberInfo',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    userId: {
      type: 'integer',
      index: true
    },
    sid: {
      type: 'String',
    },
    account_sid: {
      type: 'String',
    },
    friendly_name: {
      type: 'String',
    },
    phone_number: {
      type: 'String',
    },
    contact_name: {
      type: 'String'
    },
    recording_status: {
      type: 'integer',
      defaultsTo: 0
    },
    delete_status: {
      type: 'integer',
      defaultsTo: 0
    },
    date_created: {
      type: 'datetime',
    },
    date_updated: {
      type: 'datetime',
    },

  },
};
