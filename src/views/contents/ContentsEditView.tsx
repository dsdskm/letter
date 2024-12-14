import { Box, Button, Card, Typography } from "@mui/material";
import { getAccount, getImageDownloadUrl } from "api/api";
import { Account } from "interface/interface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountState } from "state/stateAction";
import ReactPlayer from "react-player";
import Loading from "views/components/Loading";
import { isMobile } from "react-device-detect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MSG } from "common/resources";
import { styled } from "@mui/system";
import mobileBgLogin from "images/mobile/background_login.png";
import bgContents from "images/pc/background_contents.png";
const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const FieldWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const ContentsWrapper = styled(Box)({
  background: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Title = styled(Typography)({
  fontFamily: "medium",
  fontSize: 30,
  marginTop: 50,
  color: "#eec07b"
});
const Text1 = styled(Typography)({
  fontFamily: "mediuam",
  fontSize: 30,
  marginTop: 50,
  color: "black"
});
const ContentsEditView = () => {
  // const isSafari = browserName.includes("Safari");
  const width = isMobile ? window.innerWidth : 1920;
  const height = isMobile ? window.innerHeight - window.innerHeight * 0.01 : "98vh";
  const accountState = useSelector((state: AccountState) => state);
  const id = accountState && accountState.account ? accountState.account.key : "";
  const [accountData, setAccountData] = useState<Account>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [videoWidth, setVideoWidth] = useState<number>(0);
  const [videoHeight, setVideoHeight] = useState<number>(0);
  const [originVideoWidth, setOriginVideoWidth] = useState<number>(0);
  const [originVideoHeight, setOriginVideoHeight] = useState<number>(0);
  const [url, setUrl] = useState<string>()
  const backgroundImage = isMobile ? mobileBgLogin : bgContents;

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
          const _url = await getImageDownloadUrl(_accountData.path);
          // get video file size
          const v = document.createElement("video");
          v.src = _url;
          v.addEventListener(
            "loadedmetadata",
            function (e) {
              setOriginVideoWidth(this.videoWidth);
              setOriginVideoHeight(this.videoHeight);
            },
            false,
          );
          setUrl(_url)
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
      w = originVideoWidth / 2;
      h = originVideoHeight / 2;
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
    if (accountData) {
      if (url) {
        toast(MSG.DOWNLOAD);
        fetch(url, { method: "GET" })
          .then((res) => res.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${accountData.team}`;
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
    }

  };

  console.log(`accountData ${JSON.stringify(accountData)}`)
  console.log(`url ${url}`)

  if (!accountData) {
    return <Loading />;
  }

  return (
    <>
      <>
        <Wrapper>
          <FieldWrapper
            sx={{
              background: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: width,
              minWidth: width,
              height: height,
            }}
          >
            <Title>팀원에게 전하는 따뜻한 영상 메시지</Title>
            <ContentsWrapper width={videoWidth} height={videoHeight}>
              <ReactPlayer width={videoWidth} height={videoHeight} url={url} controls />
            </ContentsWrapper>
          </FieldWrapper>
        </Wrapper>
      </>
      <ToastContainer hideProgressBar={false} autoClose={1000 * 60} />
    </>
  );
};

export default ContentsEditView;
