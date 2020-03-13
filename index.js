const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const homeRoute = require('./routes/home');
const userRoutes = require('./routes/user');
const smsRoutes = require('./routes/sms');
const deviceRoutes = require('./routes/device');

require('dotenv').config();
const port = process.env.PORT || 3000;

// Application
const app = express();

// Configuration
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**********************************
 * ROUTES
*********************************/
app.use('/', homeRoute);
app.use('/users', userRoutes);
app.use('/sms', smsRoutes);
app.use('/devices', deviceRoutes);

let welock_token;
let welock_refreshToken;



const fakeBookingNotify = [
  {
    bookId: "17031322",
    roomId: "208283",
    roomQty: "1",
    status: "2",
    firstNight: "2020-03-07",
    lastNight: "2020-03-11",
    numAdult: "2",
    numChild: "0",
    guestFirstName: "Noah",
    guestName: "Lossignol--Piet",
    guestEmail: "fyusta.369806@guest.booking.com",
    //guestPhone: "+33 669 37 08 45",
    guestPhone: "+33 688 36 22 55",
    guestMobile: "",
    lang: "es",
    price: "336.28",
    referer: "Booking.com",
    bookingTime: "2020-02-05 21:06:52",
    modified: "2020-02-05 21:06:52",
  }
];


/* 
  ROUTES API WELOCK
  GET /devices/:deviceid/:starttime/:endtime/:type
*/
app.post('/notifybooking', async (req, res) => {
  // 1 api recuépérer les data du booking (dont roomId)
  let response = fakeBookingNotify;
  console.log(req.params);
  console.log(req.body);
  // 2 récupérer le deviceNumber dans NOTRE database
  //let fakeDeviceNumber = '19410591';
  let fakeDeviceNumber = '19020363';
  let startTime = fakeBookingNotify[0].firstNight + ' 15:00';
  let endTime = fakeBookingNotify[0].lastNight + ' 11:00';

  // 3 génère un code d'ouverture
  let responseCode = await generateAccessCodeToDeviceId(fakeDeviceNumber, startTime, endTime, 0);

  // 4 envoyer le SMS
  let code = responseCode.data.data;
  let message =
    `Bonjour M/Mme ${fakeBookingNotify[0].guestName}.
Suite à votre réservation n° ${fakeBookingNotify[0].bookId},

Voici le code de la serrure connectée :
${code}

Il sera actif le jour de votre arrivée à partir de 15h00 jusqu'au jour de votre départ à 11h00.
(du ${fakeBookingNotify[0].firstNight} au ${fakeBookingNotify[0].lastNight}) 

Je vous rappelle la courte video explicative pour ouvrir la porte :
https://youtu.be/CzW8YDwlEwY

En vous souhaitant bonne réception
Cordialement
David et Melissa`;
  try {
    let sms = await sendSms(message, fakeBookingNotify[0].guestPhone);
    console.log(sms);
    if (sms.sid) {
      res.status(200).json({
        sid: sms.sid,
        created_at: new Date(sms.dateCreated),
        idLock: fakeDeviceNumber,
        code: code,
        message: 'SMS Envoyé: ' + message,
        status: 200
      });
    }
  }
  catch (e) {
    console.log(e)
  }
}) // fin route '/notifybooking




app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});