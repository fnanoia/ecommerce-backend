import config from "config";
import firebase from "firebase-admin";


//get protected firebase config params
const firebaseConfig = {
  type: config.get<string>("type"),
  projectId: config.get<string>("projectId"),
  privateKeyId: config.get<string>("privateKeyId"),
  privateKey: config.get<string>("privateKey"),
  clientEmail: config.get<string>("clientEmail"),
  clientId: config.get<string>("clientId"),
  authUri: config.get<string>("authUri"),
  tokenUri: config.get<string>("tokenUri"),
  authProviderX509CertUrl: config.get<string>("authProviderX509CertUrl"),
  clientC509CertUrl: config.get<string>("clientC509CertUrl"),
};

//set firebase connection
async function firebaseDB(config: any) {
  firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: "https://ecommerce-backend-43abf.firebaseio.com/",
  });
}

//export and init firebase
export const firebaseConnection = firebaseDB(firebaseConfig);

//create instance of db
export const dbFirebase = firebase.firestore();

//define and export collections
export const cartCollection = dbFirebase.collection("cart");
export const productsCollection = dbFirebase.collection("products");
