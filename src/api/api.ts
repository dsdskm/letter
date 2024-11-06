import { COLLECTION_ACCOUNT, COLLECTION_CONTENTS } from "common/constants";
import { db, storage } from "common/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Account, Contents } from "interface/interface";

const API_URL_LOCAL = "http://localhost:5001";
const API_URL_QA = API_URL_LOCAL;

export const getAccount = async (id: string) => {
  try {
    const ref = doc(db, COLLECTION_ACCOUNT, id);
    const snap = await getDoc(ref);
    const data = snap.data();
    return data as Account;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const _getAccount = async (id: string) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const url = `${API_URL_QA}/account?id=${id}`;
    console.log(`url ${url}`);
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json as Account;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getContents = async (id: string) => {
  try {
    console.log(`getContents id=${id}`);
    const ref = doc(db, COLLECTION_CONTENTS, id);
    const snap = await getDoc(ref);
    const data = snap.data();
    return data as Contents;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const _getContents = async (id: string) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const url = `${API_URL_QA}/contents?id=${id}`;
    console.log(`url ${url}`);
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json as Contents;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getImageDownloadUrl = async (path: string) => {
  const fileRef = ref(storage, path);
  const url = await getDownloadURL(fileRef);
  return url;
};
