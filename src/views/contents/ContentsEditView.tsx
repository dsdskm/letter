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

const ContentsEditView = () => {
  const theme = useTheme();
  const accountState = useSelector((state: AccountState) => state);
  console.log(`accountState ${JSON.stringify(accountState)}`);
  const id = accountState && accountState.account ? accountState.account.key : "";
  const [accountData, setAccountData] = useState<Account>();
  const [contentsData, setContentsData] = useState<Contents>();
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  console.log(`width=${window.innerWidth} height=${window.innerHeight} isMobile=${isMobile}`);
  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth * 0.5);
      setHeight(window.innerHeight * 0.5);
    }
  }, [window]);
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
  console.log(`id ${id}`);
  console.log(`accountData`, accountData);
  console.log(`contentsData`, contentsData);
  if (!accountData || !contentsData) {
    return <Loading />;
  }
  console.log(`url ${contentsData.url}`);
  const w = (1080 / 2) * 3;
  const h = (1920 / 2) * 3;
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", pt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: w}}>
          <Typography variant="h4" fontStyle="bold" color={"#002c5f"}>
            나에게 쓰는 편지
          </Typography>
          <Divider sx={{ backgroundColor: theme.palette.primary.main, height: 1, width: "100%", mt: isMobile ? 2 : 5, mb: isMobile ? 2 : 5 }} />
          <Box
            sx={{
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
              mb: 1,
            }}
          >
            <Card sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 5, p: 1 }}>
              <Typography variant="h5" color="white">
                {accountData.name}
              </Typography>
            </Card>
            <Typography variant="h5">{accountData.number}</Typography>
          </Box>
          <Box sx={{ display: "flex", width: (1080 / 2) * 3, height: (1920 / 2) * 3 }}>
            {/* <ReactPlayer width={isMobile ? window.innerWidth * 0.95 : 700} height={isMobile ? window.innerHeight * 0.7 : 500} url={contentsData.url} controls /> */}
            <ReactPlayer width={"30%"} height={"30%"} url={contentsData.url} controls />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContentsEditView;
