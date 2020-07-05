const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('../coworkers-cc0e8-firebase-adminsdk-i16n6-ce7881ca56.json');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coworkers-cc0e8.firebaseio.com"
});

// http://localhost:5001/coworkers-cc0e8/us-central1/exportSkills?skills=true&positions=true
exports.exportSkills = functions.https.onRequest(async (req, res) => {
  const collectionsList = Object.keys(req.query);
  const exportedData = {};
  const promises = collectionsList.map(collection => {
    return admin.firestore().collection(collection).get().then(querySnapshot => {
      exportedData[collection] = querySnapshot.docs.map((doc) => doc.data());
    });
  });
  await Promise.all(promises);
  res.json(exportedData);
});
