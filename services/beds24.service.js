const axios = require('axios');

/**
 * API BEDS24  /api/json/getProperties
 * GET PROPERTIES FROM BEDS24 ACCOUNT
 * @param String {apiKey} (account beds24 api key)
 * @returns Promise<propertiesList>  
 */
exports.getProperties = async (apiKey) => {
 return axios({
  method: 'post',
  url: 'https://www.beds24.com/api/json/getProperties',
  data: {
   authentication: {
    apiKey: apiKey
   }
  }
 })
}