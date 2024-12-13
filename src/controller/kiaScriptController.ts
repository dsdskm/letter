import { bucketName, db, dbKia, storage } from "@config/firebaseConfig";
import { COLLECTION_ACOUNT, COLLECTION_CONTENTS } from "common/constant";
import { Request, Response } from "express";
import { collection, doc, getDocs, query, writeBatch } from "firebase/firestore";
const fs = require("fs");
const path = "./files";
const xlsx = require("xlsx");

export const initAccount = async (req: Request, res: Response) => {
  try {
    // file read
    const workbook = xlsx.readFile("files/people_20241213_kia.xlsx");
    const workSheet = workbook.Sheets.list;
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const firstSheeJson = xlsx.utils.sheet_to_json(firstSheet); // 첫 번째 시트 내용을 json 데이터로 변환
    let batch = writeBatch(dbKia);
    let batchCount = 0;
    const time = new Date().getTime();
    let count = 0;
    for (const v of firstSheeJson) {
      console.log(`v ${JSON.stringify(v)}`);
      const accountRef = doc(dbKia, COLLECTION_ACOUNT, v.number);
      batch.set(accountRef, {
        id: v.number,
        team: v.team,
        path: `video/${v.team}.mp4`,
      });
      batchCount += 1;
      if (batchCount === 499) {
        batchCount = 0;
        await batch.commit();
        batch = writeBatch(dbKia);
      }
      count += 1;
    }
    await batch.commit();
    console.log(`count=${count}`);
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
};
