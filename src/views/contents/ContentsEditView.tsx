import { Box, Button, Card } from "@mui/material";
import { getAccount, getContents, getImageDownloadUrl } from "api/api";
import { Account, Contents } from "interface/interface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountState } from "state/stateAction";
import ReactPlayer from "react-player";
import Loading from "views/components/Loading";
import { isMobile } from "react-device-detect";
import bgContents from "images/pc/background_contents.png";
import airplane from "images/pc/airplane.png";
import mobileBgContents from "images/mobile/background_contents.png";
import mobileAirplane from "images/mobile/airplane.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MSG } from "common/resources";
import { styled } from "@mui/system";

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const ContentsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const TitleWrapper = styled(Card)({
  backgroundColor: "#8ecfaf",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  height: 10,
});

const ContentsEditView = () => {
  // const isSafari = browserName.includes("Safari");
  const width = isMobile ? window.innerWidth : 1920;
  const height = isMobile ? window.innerHeight - window.innerHeight * 0.01 : "98vh";
  const accountState = useSelector((state: AccountState) => state);
  const id = accountState && accountState.account ? accountState.account.key : "";
  const [accountData, setAccountData] = useState<Account>();
  const [contentsData, setContentsData] = useState<Contents>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [videoWidth, setVideoWidth] = useState<number>(0);
  const [videoHeight, setVideoHeight] = useState<number>(0);
  const [originVideoWidth, setOriginVideoWidth] = useState<number>(0);
  const [originVideoHeight, setOriginVideoHeight] = useState<number>(0);
  const backgroundImage = isMobile ? mobileBgContents : bgContents;
  const airplaneIcon = isMobile ? mobileAirplane : airplane;
  const airplaneWidth = isMobile ? 50 : 70;
  const airplaneHeight = isMobile ? 50 : 70;
  const titleHeight = isMobile ? 5 : 10;

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
            // get video file size
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
  }, [originVideoWidth, originVideoHeight]);

  const onDownloadClick = () => {
    /*
    if (isSafari) {
      alert(MSG.DOWNLOAD_ERR);
      return;
    }
    */
    if (contentsData && accountData) {
      const srcUrl = contentsData.url;
      toast(MSG.DOWNLOAD);
      fetch(srcUrl, { method: "GET" })
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
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

  return (
    <>
      <>
        <Wrapper>
          <ContentsWrapper
            sx={{
              background: `url(${backgroundImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: width,
              minWidth: width,
              height: height,
            }}
          >
            <Box sx={{ background: `url(${airplaneIcon})`, width: airplaneWidth, height: airplaneHeight, mt: 3, backgroundSize: "contain", backgroundRepeat: "no-repeat" }} />

            <TitleWrapper sx={{ p: 3,  height: titleHeight }} elevation={0}>
              <Button disabled={!isReady} sx={{ fontFamily: "medium", fontSize: 25 }} onClick={onDownloadClick}>
                {accountData.name} {accountData.number}
              </Button>
            </TitleWrapper>

            <Box border={1} borderColor="black" sx={{ width: videoWidth, height: videoHeight, backgroundColor: "white", mt: 2 }}>
              <ReactPlayer width={videoWidth} height={videoHeight} url={contentsData.url} controls onReady={() => setIsReady(true)} />
            </Box>
          </ContentsWrapper>
        </Wrapper>
      </>
      <ToastContainer hideProgressBar={false} autoClose={1000 * 60} />
    </>
  );
};

export default ContentsEditView;
