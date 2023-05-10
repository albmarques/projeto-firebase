const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./projeto-d29d3-firebase-adminsdk-583zz-e25bfcd12f.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const data ={
  name: 'Los Angeles',
  state: 'CA',
  country :'USA'
}

const res = db.collection("projetoweb-test").doc("LA").set(data)