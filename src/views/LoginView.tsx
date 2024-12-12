import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { BIRTH_ID, LOGIN_ID, NAME_ID, NUMBER_ID, ROUTE_CONTENTS_EDIT_VIEW } from "common/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccount } from "state/states";
import Loading from "./components/Loading";
import { LABEL, MSG, STYLE } from "common/resources";
import { getAccount } from "api/api";
import bgLogin from "images/pc/background_login.png";
import thanksTape from "images/pc/thanksTape.png";
import VHS from "images/pc/VHS.png";
import playButton from "images/pc/playButton.png";
import Group1 from "images/pc/Group1.png";
import Group2 from "images/pc/Group2.png";
import mobileBgLogin from "images/mobile/background_login.png";
import { isMobile } from "react-device-detect";
import { styled } from "@mui/system";

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


const Title = styled(Typography)({
  fontFamily: "medium",
  fontSize: 30,
  marginTop: 50,
  color: "#eec07b"
});

const TanksTape = styled(Box)({
  marginTop: 10
})

const Vhs = styled(Box)({
  marginTop: 20
})

const PlayButton = styled(Button)({
  marginTop: 20
})


const NameField = styled(TextField)({
  fontFamily: "regular",
  background: "white",
  borderRadius: 50,
  marginTop: 20,
});

const InputPropsStyle = {
  style: {
    height: "100%",
    borderRadius: 50,
  },
};

const Left = styled(Box)({
  position: "absolute",
})
const Right = styled(Box)({
  position: "absolute",
})
const LoginView = () => {
  const width = isMobile ? window.innerWidth : 1920;
  const height = isMobile ? window.innerHeight : "98vh";
  const cardWidth = isMobile ? width * 0.7 : 400;
  const fieldWidth = isMobile ? "100%" : STYLE.LOGIN_FIELD_WIDTH;
  const fieldHeight = STYLE.LOGIN_FIELD_HEIGHT;
  const downloadTextFontSize = isMobile ? 12 : 14;
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const backgroundImage = isMobile ? mobileBgLogin : bgLogin;

  const onLoginClick = async () => {
    if (name && number && birth) {
      setLoading(true);
      const data = await getAccount(number);
      console.log(`data ${JSON.stringify(data)}`);
      if (data && data.name === name && data.birth === birth) {
        setLoading(false);
        dispatch(setAccount(data.id));
        navigate(ROUTE_CONTENTS_EDIT_VIEW);
        return;
      }
    }
    alert(MSG.LOGIN_ERR);
    setLoading(false);
  };
  if (loading) {
    return <Loading />;
  }

  const getFieldView = (id: string, value: string, setter: any, label: string, hint: string) => {
    return (
      <NameField id={id} value={value} onChange={(e) => setter(e.target.value)} sx={{ width: fieldWidth, height: fieldHeight, mb: 2 }} InputProps={InputPropsStyle} placeholder={hint} />
    );
  };
  return (
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
          <TanksTape sx={{
            background: `url(${thanksTape})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: 492,
            height: 76
          }} />

          <Vhs sx={{
            background: `url(${VHS})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: 582,
            height: 328
          }} />
          {getFieldView(NUMBER_ID, number, setNumber, LABEL.NUMBER, MSG.HINT_NUMBER)}
          <PlayButton sx={{
            background: `url(${playButton})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: 90,
            height: 90
          }} />

        </FieldWrapper>
      </Wrapper>
    </>
  );
};

export default LoginView;
