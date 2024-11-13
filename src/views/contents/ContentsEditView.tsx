import { Box, Button, Card, CardMedia, Divider, Typography, useTheme } from "@mui/material";
import { getAccount, getContents, getImageDownloadUrl } from "api/api";
import { Account, Contents } from "interface/interface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountState } from "state/stateAction";
import ReactPlayer from "react-player";
import NotFoundView from "views/NotFoundView";
import Loading from "views/components/Loading";
import { isMobile } from "react-device-detect";
import bgContents from "images/pc/background_contents.png"
import airplane from "images/pc/airplane.png"
import mobileBgContents from "images/mobile/background_contents.png"
import mobileAirplane from "images/mobile/airplane.png"

const ContentsEditView = () => {
  const width = window.innerWidth
  const height = window.innerHeight - window.innerHeight * 0.01
  const theme = useTheme();
  const accountState = useSelector((state: AccountState) => state);
  console.log(`accountState ${JSON.stringify(accountState)}`);
  const id = accountState && accountState.account ? accountState.account.key : "";
  const [accountData, setAccountData] = useState<Account>();
  const [contentsData, setContentsData] = useState<Contents>();
  useEffect(() => {
    const initData = async () => {
      console.log(`initData id ${id}`);
      if (id !== null) {
        console.log(`initData`);
        const _accountData = await getAccount(id);
        if (_accountData) {
          setAccountData(_accountData);
          const _contentsData = await getContents(id);
          if (_contentsData) {
            _contentsData.url = await getImageDownloadUrl(_contentsData.path);
            setContentsData(_contentsData);
          }
        }
      }
    };
    initData();
  }, [id]);
  if (!accountData || !contentsData) {
    return <Loading />;
  }
  console.log(`url ${contentsData.url}`);

  const videoWidth = isMobile?(1080 / 4):1080/3
  const videoHeight = isMobile?(1920 / 4):1920/3
  return (
    <>
      {isMobile ? <>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
          <Box
            sx={{ background: `url(${mobileBgContents})`, backgroundPosition: "center", backgroundSize: "cover", width: width, minWidth: width, height: height, display: "flex", flexDirection: "column", alignItems: "center", }}>
            <Box
              sx={{ background: `url(${mobileAirplane})`, width: 50, height: 47, backgroundSize: "contain", backgroundRepeat: "no-repeat", mt: 3 }} />
            <Card sx={{ backgroundColor: "#8ecfaf", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3, borderRadius: 10, height: 5 }} elevation={0}>
              <Typography sx={{ fontFamily: "medium", fontSize: 25, }}>{accountData.name} {accountData.number}</Typography>
            </Card>

            <Box border={1} borderColor="black" sx={{ width: videoWidth, height: videoHeight, backgroundColor: "white", mt: 2 }}>
              <ReactPlayer width={videoWidth} height={videoHeight} url={contentsData.url} controls />

            </Box>


          </Box>
        </Box>
      </> : <>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
          <Box
            sx={{ background: `url(${bgContents})`, backgroundPosition: "center", backgroundSize: "cover", width: 1920, minWidth: 1920, height: "98vh", display: "flex", flexDirection: "column", alignItems: "center", }}>
            <Box
              sx={{ background: `url(${airplane})`, width: 73, height: 47, backgroundSize: "contain", backgroundRepeat: "no-repeat", mt: 7 }} />
            <Card sx={{ backgroundColor: "#8ecfaf", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3, mt: 1, borderRadius: 10, height: 10 }} elevation={0}>
              <Typography sx={{ fontFamily: "medium", fontSize: 25, }}>{accountData.name} {accountData.number}</Typography>
            </Card>

            <Box border={1} borderColor="black" sx={{ width: videoWidth, height: videoHeight, backgroundColor: "white", mt: 2 }}>
              <ReactPlayer width={videoWidth} height={videoHeight} url={contentsData.url} controls />

            </Box>


          </Box>
        </Box></>}

    </>
  );
};

export default ContentsEditView;
