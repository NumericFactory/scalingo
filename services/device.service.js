const axios = require('axios');

/**
 * API WELOCK  /API/Auth/Token
 * ASK A VALID TOKEN TO WELOCK
 * @param String {the appID of the account welock} accountAppId 
 * @param String {the secret of the account welock} accountSecret
 * @returns Promise<request>  
 */
getValidTokenFromWelockApi = async (accountAppId, accountSecret) => {
 return axios({
  method: 'post',
  url: 'https://api.we-lock.com/API/Auth/Token',
  data: {
   appID: accountAppId,
   secret: accountSecret
  }
 }).then(response => response.data.data)
}


/**
 * API WELOCK /API/Device/DeviceLibrary
 * GET ALL PURCHASED DEVICES FROM WELOCK ACCOUNT 
 * (les devices que j'ai acheté)
 */
exports.getAllPurchasedDevices = async () => {
 // getToken From Api WeLock
 let responseToken = await getValidTokenFromWelockApi(process.env.welock_appID, process.env.welock_secret);
 welock_token = responseToken.accessToken;
 welock_refreshToken = responseToken.refreshToken;
 // request to weLock to get AllDevices From Account
 return axios({
  method: 'post',
  url: 'https://api.we-lock.com/API/Device/DeviceLibrary',
  data: {
   appID: process.env.welock_appID
  },
  headers: {
   'Authorization': 'Bearer ' + welock_token,
   'Content-Type': 'application/json'
  }
 });
}


/**
 * API WELOCK /API/Device/DeviceList
 * GET ALL DEVICES FROM WELOCK DEVELOPPER ACCOUNT 
 * (la liste des devices activés pour être utilisé avec l'API) 
 */
exports.getActivatedDevices = async () => {
 // getToken From Api WeLock
 let responseToken = await getValidTokenFromWelockApi(process.env.welock_appID, process.env.welock_secret);
 welock_token = responseToken.accessToken;
 welock_refreshToken = responseToken.refreshToken;
 // request to weLock to get AllDevices From Account
 return axios({
  method: 'post',
  url: 'https://api.we-lock.com/API/Device/DeviceList',
  data: {
   appID: process.env.welock_appID
  },
  headers: {
   'Authorization': 'Bearer ' + welock_token,
   'Content-Type': 'application/json'
  }
 });
}


/**
 * API WELOCK /API/Device/DeviceCreate
 * ACTIVATE DEVICE IN WELOCK ACCOUNT
 * DEVICE WILL BE READY FOR USE WITH API
 * @param String {*} deviceNumber 
 */
exports.activateDevice = async (deviceNumber) => {
 // getToken From Api WeLock
 let responseToken = await getValidTokenFromWelockApi(process.env.welock_appID, process.env.welock_secret);
 welock_token = responseToken.accessToken;
 welock_refreshToken = responseToken.refreshToken;
 // Create a device on welock developper Account
 return axios({
  method: 'post',
  url: 'https://api.we-lock.com/API/Device/DeviceCreate',
  data: {
   appID: process.env.welock_appID,
   deviceNumber: deviceNumber
  },
  headers: {
   'Authorization': 'Bearer ' + welock_token,
   'Content-Type': 'application/json'
  }
 });
}


/**
 * API WELOCK /API/Device/DeviceTempPassword
 * @param String {*} deviceId     exemple : "19045789"
 * @param DateTime {*} startTime  exemple : "2020-03-05 12:15"
 * @param DateTime {*} endTime    exemple : "2020-03-05 12:30"
 * @param int {*} type            exemple : 1 (ou 0)
 * 
 * le type 0 génère un code qui ouvre la serrure en continue
 * le type 1 génère un code qui ouvre la serrure en périodique horaire chaquejour
 */
exports.generateAccessCodeToDeviceId = async (deviceId, startTime, endTime, type) => {
 // getToken From Api WeLock
 let responseToken = await getValidTokenFromWelockApi(process.env.welock_appID, process.env.welock_secret);
 welock_token = responseToken.accessToken;
 welock_refreshToken = responseToken.refreshToken;
 // Create a device on welock developper Account
 return axios({
  method: 'post',
  url: 'https://api.we-lock.com/API/Device/DeviceTempPassword',
  data: {
   appID: process.env.welock_appID,
   deviceNumber: deviceId,
   //deviceBleName: 'WeLock5FN2G',
   deviceBleName: 'WeLockHUU5C',
   startingTime: startTime,
   endTime: endTime,
   tempType: type
  },
  headers: {
   'Authorization': 'Bearer ' + welock_token,
   'Content-Type': 'application/json'
  }
 });
}