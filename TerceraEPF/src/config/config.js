import dotenv from 'dotenv';
dotenv.config();


export const PORT = process.env.PORT;
export const MODO = process.env.MODO;
// MongoDB
export const CNX_STR = process.env.CNX_STR;
export const CNX_sessions = process.env.CNX_sessions;
export const DB_NAME = process.env.DB_NAME;

//HASH
export const SECRET = process.env.HASH_SECURITY + process.env.SALT_ROUNDS + process.env.LINE_SECRET;




//MongoDB
//const cnxStrLocal = 'mongodb://root:mongopassword@localhost:27017/coderhouse?authSource=admin'- o -'mongodb://localhost:27017/coderhouse?authSource=admin'
// export const CNX_STR = 'mongodb+srv://coderhouse:coderhouse@cluster0.qiy9g8n.mongodb.net/Coderhouse'; // conexion remota
// export const CNX_sessions = 'mongodb+srv://coderhouse:coderhouse@cluster0.qiy9g8n.mongodb.net/sessions'; // para las sessions
// export const CNX_STR = 'mongodb://localhost:27017/coderhouse' // local
// export const DB_NAME = 'coderhouse';
// FILES
export const RUTA = './data/products.txt';
export const CART_ROUT = './data/cart.txt';











// export const PERSISTENCIA = 'firestore';
// export const PERSISTENCIA = 'fs';
// // FireStore
// export const FIREBASE_CREDENTIALS = {
//     type: "service_account",
//     project_id: "coderh32185",
//     private_key_id: "bc9aeed7ed353f74701e154ea3ed2da3d45b171b",
//     private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDE3UUrBaemoJWW\nYh8m4Y66sc3A3Ic9RKpBwxnkD4HAWifYM7Fqi/XTN81OrA2OfXdgkv1fNXhlNtZF\nf2HWAo4pou2gnLqSdektNkO3GrAmPIjXTfnHGSxdMtJzxCF5nBNPQG0AazfimV+e\ny+bQv76EE6LEuaZrt9bJtLA6rH440TQO5QMQLgcS/AzUyCXd1JVq2kNV/jsU/O+V\ndgbGw5bF0jSKS+yuNb988x+Us79FUjCZxj+lewICGjSEM9yen/HBMUAbmsKasDiT\nT/UbrX75Y0GAaz6qlGaN7JNPQT6LLBBWY4rq4OAiqy37EAKffSljblCfc0uaYubS\nDgY1eRudAgMBAAECggEAAIt+pVE9Sigubp2HUCU84hloSpaRrUK8y4FnV4rcPuF0\nM/rL2YUMdIqczKq/P6i4C6vJSPOUVlT7hnLrnQFuzhpMWOIPxiRoNWug1MEdjoC8\nyqCSbQTanmHSOudmrFGy3/vh3ifUN/iMTwIDeb2khyfcW60KRkjalSS+sO4Vso4o\ncEtrpZCpOe01OctPKxhhgMv471vpAYnDxlpIm88kEc/W2NRcGml4isV9zANcFqmj\nBVEAMX92coSgFffc1E5QCKVs/9IrDhdOeQ9wEt1sfeeo3JGn972w66Ja9kTph8OO\nXnWNoK4qIDBrRYGtJYEsxn7oFP2Ae3WafVBBTLJwwQKBgQDx40E9Av1bT2PAaIxn\nrISxTVcxjh1ORhh9wWq2HQUE+VUd2wIDI3nlR/k7qxui6iJvvlpg42qqEVWbWJuZ\nvIW32fzsV+qvyrckA1S3YsLD/7nxfgWUDevSp8TnNpycZAKGVZJYHnDFUWXxcyKU\ncOzuTe2tI7oha6RR4/Vdn4BO7QKBgQDQWZAZVdu55NohPFe9DqrHEz6URtO1a0y3\nqQ9SOcNBtOiK39N2bJHcr/1SaBpdznMX2xvWt0Jg/+gn/1q8AzUf/owK4M4quFF5\np4i9t+6+LjpvlLfj6aEnDmjgj12B3oCRCa0677rkaKJLB9wjaaoVujhqDNJ3Ak9y\nnOMDQWG5cQKBgQCYS7x0nKBGUGr+5xSX5fA57fcbNV5QPSQIcbItbYIOiqnDvXO7\n5CdIbBOJNQeWgJIkBxbCcA1lfLqIr7Zwilkq065CZGxYOGss2ogJWr5ER4ucd/st\nJ8K2BHmeFi1u7i0ExXX501ivc7ua1SINkjgrJpeh7p+vkSWJhdykENvpVQKBgHwT\n6mn8JLenH3RNkF7JvlCCGHGLYIcZGH4D01j/h1W5HAegVjmfXJpVwIHz90fIK+iY\nFxMe3gwQOryfKPTw4BFmsRXFXWI5lGPjrt51DFv8AdbzdTPorY0p2rFpD6HI1T4K\nyjxgCif+XDBcxO/d/GmmFfSqICi5moDCB7unk0AxAoGBAOoWZHzkL3ZD6inaNOQj\nawJFl7eP6sdBR927XT9M/BQbM+SxnhS+LMFkWdmW5r63kFdlIOCHtM1qWTfYQ+Km\nGwOrIMstC05N+T9MulHueSv5VeqhT+3ChnEzK17aTIKs9tRIQv0IKnU5uxkS1Ysx\noTaMp5ewwuwoFqNb2y7ejeo8\n-----END PRIVATE KEY-----\n",
//     client_email: "firebase-adminsdk-y9y0t@coderh32185.iam.gserviceaccount.com",
//     client_id: "108823845175207618279",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y9y0t%40coderh32185.iam.gserviceaccount.com"
// };//  SOLO MONGO