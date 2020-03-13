const model = require('../models');
const smsService = require('../services/sms.service');

/*
 Route: /sms
 Envoyer un SMS
*/
exports.send = async (req, res) => {
 let message = req.body.message
 let to = req.body.to;
 try {
  let smsSended = await smsService.sendSms(message, to);

  if (!smsSended.sid) {
   return res.status(400).json({ message: 'SMS non envoyé', status: 400 });
  }
  if (smsSended.sid) {
   return res.status(200).json({
    sid: smsSended.sid,
    created_at: new Date(smsSended.dateCreated),
    message: 'SMS envoyé',
    smstext: message,
    status: 200
   });
  }
 }
 catch (e) {
  console.error(e);
  res.status(500).json({ message: 'SMS non envoyé', status: 500 });
 }
} // fin send()
