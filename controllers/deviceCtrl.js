const model = require('../models');
const deviceService = require('../services/device.service');

/*
 Route: get /devices/welock/purchased
 Récupérer les devices welock achetés
*/
exports.wl_getPurchasedDevices = async (req, res) => {
 deviceService.getAllPurchasedDevices()
  .then((response) => {
   res.status(200).json(response.data);
  })
  .catch((error) => {
   console.log(error);
   res.json(error);
  });
}

/*
 Route: get /devices/welock/activate
 Récupérer les devices welock activés 
*/
exports.wl_getActivatedDevices = async (req, res) => {
 deviceService.getActivatedDevices()
  .then((response) => {
   res.status(200).json(response.data);
  })
  .catch((error) => {
   console.log(error);
   res.json(error);
  });
}

/*
 Route : get /devices/welock/activate/:deviceId
 Activer un device welock
*/
exports.wl_activateDevice = async (req, res) => {
 deviceService.activateDevice(req.params.deviceId)
  .then((response) => {
   res.status(200).json(response.data);
  })
  .catch((error) => {
   console.log(error);
   res.json(error);
  });
}

/*
 Route : post /devices/welock/generateCode
 Générer un code d'accès pour une serrure welock
*/
exports.wl_generateAccessCode = async (req, res) => {
 const { deviceNumber, startTime, endTime, type } = req.body;
 deviceService.generateAccessCodeToDeviceId(deviceNumber, startTime, endTime, 0)
  .then((response) => {
   res.status(200).json(response.data);
  })
  .catch((error) => {
   console.log(error);
   res.json(error);
  });

}




