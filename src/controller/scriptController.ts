import { bucketName,  db,  storage } from "@config/firebaseConfig";
import { COLLECTION_ACOUNT, COLLECTION_CONTENTS } from "common/constant";
import { Request, Response } from "express";
import { collection,  doc, getDocs, query, writeBatch } from "firebase/firestore";
const fs = require("fs");
const path = "./files";
const xlsx = require("xlsx");

export const renameController = async (req: Request, res: Response) => {
  try {
    fs.readdir(path, (err: any, files: any) => {
      let index = 0;
      for (const file of files) {
        index += 1;
        console.log(`file ${file} index ${index}`);
        const arr = file.split("_");
        const rename = arr[2] + "_" + arr[3];
        console.log(rename);
        fs.rename("files/" + file, "output/" + rename, (err: any) => {
          console.log(err);
        });
      }
    });
    res.send(200);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};

export const checkDb = async (req: Request, res: Response) => {
  try {
    let result = "";
    // account

    const q = query(collection(db, COLLECTION_ACOUNT));
    const accountSnapshot = await getDocs(q);
    const accountCount = accountSnapshot.size;
    result += `account count : ${accountCount}\n`;

    // contents
    const q2 = query(collection(db, COLLECTION_CONTENTS));
    const contentsSnapshot = await getDocs(q2);
    const contentsCount = contentsSnapshot.size;
    result += `contents count : ${contentsCount}\n`;

    let count = 0;
    for (const content of contentsSnapshot.docs) {
      const data = content.data();
      const url = await storage.bucket(bucketName).file(data.path).getSignedUrl({ action: "read", expires: "12-31-9999" });
      
      if (url) {
        count += 1;
      } else {
        console.log(`url is empty =${data.id}`);
      }
      console.log(`url=${url.toString().length} id=${content.id} count=${count}`)
    }
    result += `url count : ${count}\n`;

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};

export const dbGenerator = async (req: Request, res: Response) => {
  try {
    const workbook = xlsx.readFile("files/people_20241114.xlsx");
    const workSheet = workbook.Sheets.list;
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const firstSheeJson = xlsx.utils.sheet_to_json(firstSheet); // 첫 번째 시트 내용을 json 데이터로 변환
    let batch = writeBatch(db);
    let batchCount = 0;
    const time = new Date().getTime();
    for (const v of firstSheeJson) {
      const accountRef = doc(db, COLLECTION_ACOUNT, v.number);
      batch.set(accountRef, {
        birth: v.birth,
        created: time,
        group: v.group,
        id: v.number,
        name: v.name,
        number: v.number,
        part: v.part,
        password: v.number,
      });
      batchCount += 1;

      const contentsRef = doc(db, COLLECTION_CONTENTS, v.number);
      batch.set(contentsRef, {
        created: time,
        id: v.number,
        number: v.number,
        path: `video/${v.number}_${v.name}.mp4`,
      });
      batchCount += 1;
      if (batchCount === 499) {
        batchCount = 0;
        await batch.commit();
        batch = writeBatch(db);
      }
    }
    await batch.commit();
    res.send(200);
  } catch (err) {
    console.log(err);
  }
};
