import { bucketName, db, dbKia, storage } from "@config/firebaseConfig";
import { COLLECTION_ACOUNT, COLLECTION_CONTENTS } from "common/constant";
import { Request, Response } from "express";
import { collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
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
    let dupCount = 0;
    const teamHash: any = {};
    for (const v of firstSheeJson) {
      // console.log(`v ${JSON.stringify(v)}`);
      const accountRef = doc(dbKia, COLLECTION_ACOUNT, v.number);
      if (v.number in teamHash) {
        console.log(`already added ${v.number} ${dupCount} old=${teamHash[v.number].team} new=${v.team}`);
        dupCount += 1;
      } else {
        teamHash[v.number] = v;
      }
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

export const checkTeamCount = async (req: Request, res: Response) => {
  try {
    const teamHash: any = {};
    let dbCount = 0;
    const querySnapshot = await getDocs(collection(dbKia, COLLECTION_ACOUNT));
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      const q = query(collection(db, "cities"), where("capital", "==", true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      dbCount += 1;
      if (!(data.team in teamHash)) {
        teamHash[data.team] = 0;
      }
      teamHash[data.team] += 1;
    });

    let count = 0;
    let totalCount = 0;
    Object.keys(teamHash).forEach((team) => {
      count += 1;
      console.log(`team=${team} count=${teamHash[team]}`);
      totalCount += teamHash[team];
    });
    console.log(`teamHash dbCount=${dbCount} count=${count} totalCount=${totalCount}`);
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
};

const update = async (p: string) => {
  let batch = writeBatch(dbKia);
  const team = p.split("_")[0];
  const path = `video/${p}`;
  
  const q1 = query(collection(dbKia, COLLECTION_ACOUNT), where("team", "==", team.trim()));
  const querySnapshot1 = await getDocs(q1);
  if (querySnapshot1.empty) {
    console.log(`team=${team} path=${path} is empty`);
  }
  querySnapshot1.forEach((d) => {
    
    const ref = doc(dbKia, COLLECTION_ACOUNT, d.id);
    batch.update(ref, {
      path: path,
    });
  });
  await batch.commit();
};

export const updateVideoPath = async (req: Request, res: Response) => {
  try {
    console.log(`update started`);
    let count = 0;
    fs.readdir("files/2k/", async (error: any, filelist: any) => {
      for (const file of filelist) {
        await update(file);
        count += 1;
      }
    });
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
};

export const checkDb = async (req: Request, res: Response) => {
  try {
    const q1 = query(collection(dbKia, COLLECTION_ACOUNT));
    const querySnapshot1 = await getDocs(q1);
    const hash: any = {}
    console.log(`querySnapshot1 ${querySnapshot1.size}`)
    querySnapshot1.forEach((d) => {
      const data = d.data()
      if (!(data.team in hash)) {
        hash[data.team] = d.id
      }
    });

    Object.keys(hash).forEach((t) => {
      console.log(hash[t])
    })
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
}
