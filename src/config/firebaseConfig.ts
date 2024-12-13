import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Auth } from "firebase-admin/lib/auth/auth";
import { Storage, IdempotencyStrategy } from "@google-cloud/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeTUJj0spa3mnNcNTqEs_vVh1KH-Bc7HE",
  authDomain: "mydiary-dev-5daf0.firebaseapp.com",
  projectId: "mydiary-dev-5daf0",
  storageBucket: "mydiary-dev-5daf0.appspot.com",
  messagingSenderId: "342289437608",
  appId: "1:342289437608:web:eb23663112049e67acc39d",
  measurementId: "G-N1ZSHWQYYH",
};
const app = initializeApp(firebaseConfig);
export const admin = require("firebase-admin");
const serviceAccount = require("../../mydiary-dev-adminsdk.json");
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const db = getFirestore(app);
export const auth: Auth = admin.auth();
export const bucketName = "mydiary-dev-5daf0.appspot.com";
export const storage = new Storage({
  projectId: "mydiary-dev-5daf0",
  keyFilename: `./mydiary-dev-adminsdk.json`,
  retryOptions: {
    autoRetry: true,
    retryDelayMultiplier: 3,
    totalTimeout: 500,
    maxRetryDelay: 60,
    maxRetries: 5,
    idempotencyStrategy: IdempotencyStrategy.RetryAlways,
  },
});

export const bucketUrl = `gs://${bucketName}`;

const firebaseConfiKia = {
  apiKey: "AIzaSyBsUSFPyCnfszSiPNjtGhRRJ1M4morPxLY",
  authDomain: "thankstape-3c117.firebaseapp.com",
  projectId: "thankstape-3c117",
  storageBucket: "thankstape-3c117.firebasestorage.app",
  messagingSenderId: "703633262883",
  appId: "1:703633262883:web:7eb4ed9bdf18de4c10a496",
  measurementId: "G-3DN387BC0F",
};
export const adminKia = require("firebase-admin");
const appKia = initializeApp(firebaseConfiKia, "kia");
const serviceAccountKia = require("../../thankstape-adminsdk.json");
const adminAppKia = adminKia.initializeApp(
  {
    credential: adminKia.credential.cert(serviceAccountKia),
  },
  "kia",
);
export const dbKia = getFirestore(appKia);
export const authKia: Auth = adminKia.auth();
export const bucketNameKia = "thankstape-3c117.firebasestorage.app";
export const storageKia = new Storage({
  projectId: "thankstape-3c117",
  keyFilename: `./thankstape-adminsdk.json`,
  retryOptions: {
    autoRetry: true,
    retryDelayMultiplier: 3,
    totalTimeout: 500,
    maxRetryDelay: 60,
    maxRetries: 5,
    idempotencyStrategy: IdempotencyStrategy.RetryAlways,
  },
});

export const bucketUrlKia = `gs://${bucketNameKia}`;
