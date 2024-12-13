import { db } from "@config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
export const getServerAppVersion = async () => {
  console.log(`getServerAppVersion`);
  const docRef = doc(db, "version", "server_app");
  const docSnapshot = await getDoc(docRef);
  const data = docSnapshot.data();
  return data;
};
