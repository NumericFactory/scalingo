// Download the helper library from https://www.twilio.com/docs/node/install
const accountSid = process.env.twilio_accountSid;
const authToken = process.env.twilio_authToken;
const client = require('twilio')(accountSid, authToken);

/**
 * ENVOIE UN SMS
 * @param String message - exemple: 'hello you'
 * @param String to -  exemple: '+33688372787'
 * @returns Promise<string> from Twilio : 'SM91bf97f9ec7c4b48b0c2c146bd9eeaf9'
 */
exports.sendSms = async (message, to) => {
 return client.messages
  .create({
   body: message,
   from: '+14155690124',
   to: to
  });
}


/**
 * ENVOIE UN APPEL VOCAL
 * @param String message - exemple: 'hello you'
 * @param String to -  exemple: '+33688372787'
 * @returns Promise<string> from Twilio : 'SM91bf97f9ec7c4b48b0c2c146bd9eeaf9'
 */
// exports.call() = async (req, res) => {
//   client.calls
//     .create({
//       url: 'http://demo.twilio.com/docs/voice.xml',
//       to: '+33688362255',
//       from: '+14155690124',
//     })
//  
// });
