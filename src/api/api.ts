import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Account, Contents } from "interface/interface";

const API_URL_LOCAL = "http://localhost:5001";
const API_URL_QA = API_URL_LOCAL;

export const getAccount = async (id: string) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const url = `${API_URL_QA}/account?id=${id}`
    console.log(`url ${url}`)
    const response = await fetch(url, requestOptions);
    const json = await response.json()
    return json as Account

  } catch (err) {
    console.log(err);
    return null
  }
};

export const getContents = async (id: string) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const url = `${API_URL_QA}/contents?id=${id}`
    console.log(`url ${url}`)
    const response = await fetch(url, requestOptions);
    const json = await response.json()
    return json as Contents

  } catch (err) {
    console.log(err);
    return null
  }
};
