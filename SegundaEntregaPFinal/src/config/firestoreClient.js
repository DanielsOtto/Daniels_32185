import admin from 'firebase-admin';
import { FIREBASE_CREDENTIALS } from './config.js';

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CREDENTIALS)
});

export const firestoreDatabase = admin.firestore(); // en db tenemos la base de datos

//Cliente reutilizable de firebase, pudiendo hacer consultas a distintas colecciones