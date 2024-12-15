import { Box, Typography } from "@mui/material";
import { getAccount, getImageDownloadUrl } from "api/api";
import { Account } from "interface/interface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountState } from "state/stateAction";
import ReactPlayer from "react-player";
import Loading from "views/components/Loading";
import { LABEL } from "common/resources";
import { styled } from "@mui/system";
import bgContents from "images/pc/background_contents.png";
const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const ContentsWrapper = styled(Box)({
  marginTop: 10,
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

const ContentsView = () => {
  const width = 1920;
  const height = "98vh";
  const accountState = useSelector((state: AccountState) => state);
  const id = accountState && accountState.account ? accountState.account.key : "";
  const [accountData, setAccountData] = useState<Account>();
  const [videoWidth, setVideoWidth] = useState<number>(0);
  const [videoHeight, setVideoHeight] = useState<number>(0);
  const [originVideoWidth, setOriginVideoWidth] = useState<number>(0);
  const [originVideoHeight, setOriginVideoHeight] = useState<number>(0);
  const [url, setUrl] = useState<string>()


  useEffect(() => {
    const initData = async () => {
      if (id !== null) {
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
    setVideoWidth(originVideoWidth / 2);
    setVideoHeight(originVideoHeight / 2);
  }, [originVideoWidth, originVideoHeight]);

  if (!accountData) {
    return <Loading />;
  }

  return (
    <>
      <Wrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: `url(${bgContents})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: width,
            minWidth: width,
            height: height,
          }}
        >
          <Title>{LABEL.INTRO_TITLE}</Title>
          <ContentsWrapper width={videoWidth} height={videoHeight}>
            <ReactPlayer width={videoWidth} height={videoHeight} url={url} controls />
          </ContentsWrapper>
        </Box>
      </Wrapper>
    </>
  );
};

export default ContentsView;
