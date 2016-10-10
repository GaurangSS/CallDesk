 module.exports = {
  tableName: 'numberInfo',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    sid: {
      type: 'varchar',
    },
    account_sid: {
      type: 'varchar',
    },
    friendly_name: {
      type: 'varchar',
    },
    phone_number: {
      type: 'varchar',
    },
    voice_url: {
      type: 'varchar',
    },
    voice_method: {
      type: 'varchar',
    },
    voice_fallback_url: {
      type: 'varchar',
    },
    voice_fallback_method: {
      type: 'varchar',
    },
    voice_caller_id_lookup: {
      type: 'varchar',
    },
    sms_url: {
      type: 'varchar',
    },
    sms_method: {
      type: 'varchar',
    },
    sms_fallback_url: {
      type: 'varchar',
    },
    sms_fallback_method: {
      type: 'varchar',
    },
    address_requirements: {
      type: 'varchar',
    },
    beta: {
      type: 'varchar',
    },
    capabilities: {
      type: 'json',
    },
    status_callback: {
      type: 'varchar',
    },
    status_callback_method: {
      type: 'varchar',
    },
    api_version: {
      type: 'varchar',
    },
    voice_application_sid: {
      type: 'varchar',
    },
    sms_application_sid: {
      type: 'varchar',
    },
    trunk_sid: {
      type: 'varchar',
    },
    emergency_status: {
      type: 'varchar',
    },
    emergency_address_sid: {
      type: 'varchar',
    },
    uri: {
      type: 'varchar',
    },
    accountSid: {
      type: 'varchar',
    },
    friendlyName: {
      type: 'varchar',
    },
    phoneNumber: {
      type: 'varchar',
    },
    voiceUrl: {
      type: 'varchar',
    },
    voiceMethod: {
      type: 'varchar',
    },
    voiceFallbackUrl: {
      type: 'varchar',
    },
    voiceFallbackMethod: {
      type: 'varchar',
    },
    voiceCallerIdLookup: {
      type: 'varchar',
    },
    dateCreated: {
      type: 'varchar',
    },
    dateUpdated: {
      type: 'varchar',
    },
    smsUrl: {
      type: 'varchar',
    },
    smsMethod: {
      type: 'varchar',
    },
    smsFallbackUrl: {
      type: 'varchar',
    },
    smsFallbackMethod: {
      type: 'varchar',
    },
    addressRequirements: {
      type: 'varchar',
    },
    statusCallback: {
      type: 'varchar',
    },
    statusCallbackMethod: {
      type: 'varchar',
    },
    apiVersion: {
      type: 'varchar',
    },
    voiceApplicationSid: {
      type: 'varchar',
    },
    smsApplicationSid:{
      type: 'varchar',
    },
    trunkSid: {
      type: 'varchar',
    },
    emergencyStatus: {
      type: 'varchar',
    },
    emergencyAddressSid: {
      type: 'varchar',
    },
  },
}
