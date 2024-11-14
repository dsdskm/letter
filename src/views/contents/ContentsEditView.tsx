import { Box, Button, Card, useTheme } from "@mui/material";
import { getAccount, getContents, getImageDownloadUrl, getVideoSize } from "api/api";
import { Account, Contents } from "interface/interface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountState } from "state/stateAction";
import ReactPlayer from "react-player";
import Loading from "views/components/Loading";
import { isMobile, browserName } from "react-device-detect";
import bgContents from "images/pc/background_contents.png";
import airplane from "images/pc/airplane.png";
import mobileBgContents from "images/mobile/background_contents.png";
import mobileAirplane from "images/mobile/airplane.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ContentsEditView = () => {
  console.log(`browserName=${browserName}`);
  const isSafari = browserName.includes("Safari");
  const width = window.innerWidth;
  const height = window.innerHeight - window.innerHeight * 0.01;
  const accountState = useSelector((state: AccountState) => state);
  const id = accountState && accountState.account ? accountState.account.key : "";
  const [accountData, setAccountData] = useState<Account>();
  const [contentsData, setContentsData] = useState<Contents>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [videoWidth, setVideoWidth] = useState<number>(0);
  const [videoHeight, setVideoHeight] = useState<number>(0);
  const [originVideoWidth, setOriginVideoWidth] = useState<number>(0);
  const [originVideoHeight, setOriginVideoHeight] = useState<number>(0);

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
            const d = await getVideoSize(_contentsData.url);
            const v = document.createElement("video");
            v.src = _contentsData.url;
            v.addEventListener(
              "loadedmetadata",
              function (e) {
                setOriginVideoWidth(this.videoWidth);
                setOriginVideoHeight(this.videoHeight);
              },
              false,
            );
          }
        }
      }
    };
    initData();
  }, [id]);

  useEffect(() => {
    let w = 0;
    let h = 0;
    if (isMobile) {
      w = originVideoWidth / 4;
      h = originVideoHeight / 4;
      if (w > h) {
        w = originVideoWidth / 6;
        h = originVideoHeight / 6;
      }
    } else {
      w = originVideoWidth / 3;
      h = originVideoHeight / 3;
    }
    setVideoWidth(w);
    setVideoHeight(h);
  }, [isMobile, originVideoWidth, originVideoHeight]);

  const onDownloadClick = () => {
    if (isSafari) {
      alert("Chrome 브라우져를 통해 다운로드 가능합니다.");
      return;
    }
    if (contentsData && accountData) {
      const srcUrl = contentsData.url;
      toast("잠시 후 다운로드가 시작됩니다.");
      fetch(srcUrl, { method: "GET" })
        .then((res) => res.blob())
        .then((blob) => {
          console.log(`blob type ${blob.type}`);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          console.log(`url ${url}`);
          a.download = `${contentsData.number}_${accountData.name}`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        })
        .catch((err) => {
          console.error("err", err);
        })
        .finally(() => {
          toast.dismiss();
        });
    }
  };

  if (!accountData || !contentsData) {
    return <Loading />;
  }

  console.log(`videoWidth=${videoWidth}, videoHeight=${videoHeight}`);

  return (
    <>
      {isMobile ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box
              sx={{
                background: `url(${mobileBgContents})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: width,
                minWidth: width,
                height: height,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ background: `url(${mobileAirplane})`, width: 50, height: 47, mt: 3, backgroundSize: "contain", backgroundRepeat: "no-repeat" }} />

              <Card sx={{ backgroundColor: "#8ecfaf", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3, borderRadius: 10, height: 5 }} elevation={0}>
                <Button disabled={!isReady} sx={{ fontFamily: "medium", fontSize: 25 }} onClick={onDownloadClick}>
                  {accountData.name} {accountData.number}
                </Button>
              </Card>

              <Box border={1} borderColor="black" sx={{ width: videoWidth, height: videoHeight, backgroundColor: "white", mt: 2 }}>
                <ReactPlayer width={videoWidth} height={videoHeight} url={contentsData.url} controls onReady={() => setIsReady(true)} />
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box
              sx={{
                background: `url(${bgContents})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: 1920,
                minWidth: 1920,
                height: "98vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ background: `url(${airplane})`, width: 73, height: 47, backgroundSize: "contain", backgroundRepeat: "no-repeat", mt: 7 }} />
              <Card
                sx={{ backgroundColor: "#8ecfaf", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3, mt: 1, borderRadius: 10, height: 10 }}
                elevation={0}
              >
                <Button disabled={!isReady} sx={{ fontFamily: "medium", fontSize: 25 }} onClick={onDownloadClick}>
                  {accountData.name} {accountData.number}
                </Button>
              </Card>

              <Box border={1} borderColor="black" sx={{ width: videoWidth, height: videoHeight, backgroundColor: "white", mt: 2 }}>
                <ReactPlayer width={videoWidth} height={videoHeight} url={contentsData.url} controls />
              </Box>
            </Box>
          </Box>
        </>
      )}
      <ToastContainer hideProgressBar={false} autoClose={1000 * 60} />
    </>
  );
};

export default ContentsEditView;
