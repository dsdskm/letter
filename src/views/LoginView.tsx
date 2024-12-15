import { Box, Button, TextField, Typography } from "@mui/material";
import { NUMBER_ID, ROUTE_CONTENTS } from "common/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccount } from "state/states";
import Loading from "./components/Loading";
import { LABEL, MSG, STYLE } from "common/resources";
import { getAccount } from "api/api";
import bgLogin from "images/pc/background_login.png";
import label_thanks_tape from "images/pc/label_thanks_tape.png";
import icon_tape from "images/pc/icon_tape.png";
import button_play from "images/pc/button_play.png";
import { styled } from "@mui/system";

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Title = styled(Typography)({
  fontFamily: "medium",
  fontSize: 30,
  marginTop: 50,
  color: "#eec07b"
});

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

const LoginView = () => {
  const width = 1920;
  const height = "98vh";
  const fieldWidth = STYLE.LOGIN_FIELD_WIDTH;
  const fieldHeight = STYLE.LOGIN_FIELD_HEIGHT;
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [number, setNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const onLoginClick = async () => {
    if (number) {
      setLoading(true);
      const data = await getAccount(number);
      if (data) {
        setLoading(false);
        dispatch(setAccount(data.id));
        navigate(ROUTE_CONTENTS);
        return;
      }
    }
    alert(MSG.LOGIN_ERR);
    setLoading(false);
  };
  if (loading) {
    return <Loading />;
  }

  const getFieldView = (id: string, value: string, setter: any, hint: string) => {
    return (
      <NameField id={id} value={value} onChange={(e) => setter(e.target.value)} sx={{ width: fieldWidth, height: fieldHeight, mb: 2 }} InputProps={InputPropsStyle} placeholder={hint} />
    );
  };
  return (
    <>
      <Wrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: `url(${bgLogin})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: width,
            minWidth: width,
            height: height,
          }}
        >
          <Title>{LABEL.INTRO_TITLE}</Title>
          <Box sx={{
            mt: 1,
            background: `url(${label_thanks_tape})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: 492,
            height: 76
          }} />

          <Box sx={{
            mt: 2,
            background: `url(${icon_tape})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: 582,
            height: 328
          }} />
          {getFieldView(NUMBER_ID, number, setNumber, MSG.HINT_NUMBER)}
          <Button sx={{
            background: `url(${button_play})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: 90,
            height: 90
          }} onClick={onLoginClick} />

        </Box>
      </Wrapper>
    </>
  );
};

export default LoginView;
