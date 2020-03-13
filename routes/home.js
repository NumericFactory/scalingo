
const express = require('express');
const router = express.Router();


/*
 ROUTES PUBLIC
*/
router.get('/', function (req, res) {
 res.send(`
 <style>
 body {
   font-family:arial
 }
 .container {
   width:500px;
   margin:20px auto
 }
 h4, p {
   margin:0;
 }
 h4 {
   margin-top:21px;
   color: rgba(55,200,55);
   font-size:1.05em
 }
 h4 span {
   color: #ccc
 }
 p {
   margin-bottom:2px
 }
 pre {
  font-family: "Lucida Console", Monaco, monospace;
  background: #f0f8ff;
  color: #060606;
  border: 1px solid #c5e5ff;
  border-radius: 7px;
  margin: 0;
  font-size: .85em;
 }
 </style>

 <div class="container">
   <h1>hello API EasySmartLock</h1>
   <h4><span>[GET]</span> /devices/purchased</h4>
   <p>> liste de tous les devices achetés</p>
   <p>> reponse :
   <pre>
   <code>
   {
    data: [
     {
      deviceQr: "a20e9c54851a130791d2a8716f42f4bf",
      deviceNumber: "19020397",
      deviceModel: "L6PCB(FB)",
      bluetooth: [
       {
       deviceName: "WeLock747LF",
       deviceMAC: "CC860F9B7DBB"
       },
       {
       deviceName: "WeLockIOXN9",
       deviceMAC: "CA8E0806DCEA"
       }
      ],
     },

     // ... other devices

    ],
     code: 0
    }
   </code>
   </pre>

   </p>

   <h4><span>[GET]</span> /devices/activate</h4>
   <p>> liste de tous les devices activé pour fonctionner avec l'API welock</p>
   <p>> reponse : 
   <pre>
   <code>
   {
      data: [
       {
        deviceNumber: "19410591",
        deviceModel: "PCBZCEBL01",
        deviceName: "",
        userID: ""
       },
       // ... other devices
      ],

      code: 0
      }</code>
   </pre>
   </p>

   <h4><span>[GET]</span> /devices/activate/{deviceNumber}</h4>
   <p>> activer un device (pour utiliser l'API WeLock)</p>
   <p>> reponse : 
   <pre>
    <code>
    {code:0}
    // code:0 signifie que le device a été activé
    </code>
   </pre>
   </p>

   <h4><span>[GET]</span> /devices/:deviceId/:starttime/:endtime/:type/generatecode</h4>
    <p>Générer un code d'accès</p>

   <h4><span>[GET]</span> /sms</h4>
   <p>> envoyer un SMS</p>
   <p>> reponse : 
   <pre>
    <code>
    sid: 123456abcdef
    // l'identifiant du SMS envoyé (retrouvable via l'API Twilio)
    </code>
   </pre>
   </p>

    
 </div>

 `);
});

module.exports = router;