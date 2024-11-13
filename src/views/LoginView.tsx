import { Box, Button, Card, TextField, Typography, useTheme } from "@mui/material"
import { ROUTE_CONTENTS_EDIT_VIEW, ROUTE_CONTENTS_LIST_VIEW } from "common/constants"
import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAccount } from "state/states"
import Loading from "./components/Loading"
import { LABEL, STYLE } from "common/resources"
import { getAccount } from "api/api"
import bgLogin from "images/pc/background_login.png"
import bgBtn from "images/pc/background_button.png"
import mobileBgLogin from "images/mobile/background_login.png"
import mobileBgBtn from "images/mobile/background_button.png"
import { isMobile } from "react-device-detect";


const LoginView = () => {

    console.log(`isMobile=${isMobile}`)
    const width = window.innerWidth
    const height = window.innerHeight
    const theme = useTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const [name, setName] = useState<string>()
    const [number, setNumber] = useState<string>()
    const [birth, setBirth] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    const onLoginClick = async () => {
        if (name && number && birth) {
            setLoading(true)
            const data = await getAccount(number)
            if (data && data.name === name && data.birth === birth) {
                setLoading(false)
                dispatch(setAccount(data.id))
                navigate(ROUTE_CONTENTS_EDIT_VIEW)
                return
            }
        }
        alert(`이름,사번,생년월일을 확인해주세요.`)
        setLoading(false)
    }
    if (loading) {
        return <Loading />
    }

    console.log(`height=${height}`)
    return <>
        {
            isMobile ? <>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", m: 0, p: 0 }}>
                    <Box
                        sx={{ background: `url(${mobileBgLogin})`, backgroundSize: "cover", backgroundPosition: "center", width: width, minWidth: width, height: height, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}

                    >
                        <Card
                            sx={{ backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3, borderRadius: 5, background: "white", width: width * 0.7 }}>
                            <Box sx={{ mb: 2, width: "100%" }}>
                                <Typography sx={{ fontFamily: "bold", fontSize: 25 }}>로그인하세요</Typography>
                                <Typography sx={{ fontFamily: "medium", fontSize: 20 }}>1년 후 나에게 쓰는 편지</Typography>
                            </Box>
                            <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{ width: "100%", height: STYLE.LOGIN_FIELD_HEIGHT, fontFamily: "regular", mb: 2 }} label={LABEL.NAME} InputProps={{
                                style: {
                                    height: 50,
                                    borderRadius: 10,
                                }
                            }} placeholder="이름을 입력하세요." />

                            <TextField value={number} onChange={(e) => setNumber(e.target.value)} sx={{ width: "100%", height: STYLE.LOGIN_FIELD_HEIGHT, fontFamily: "regular", mb: 2 }} label={LABEL.NUMBER} InputProps={{
                                style: {
                                    height: 50,
                                    borderRadius: 10,
                                }
                            }} placeholder="사번을 입력하세요.(7자리)" />

                            <TextField value={birth} onChange={(e) => setBirth(e.target.value)} sx={{ width: "100%", height: STYLE.LOGIN_FIELD_HEIGHT, fontFamily: "regular", mb: 2 }} label={LABEL.BIRTH} InputProps={{
                                style: {
                                    height: 50,
                                    borderRadius: 10,
                                }
                            }} placeholder="생년월일 입력하세요.(6자리)" />
                            <Button variant="contained" sx={{ background: "white", width: "100%", height: 60, backgroundImage: `url(${bgBtn})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", fontFamily: "regular", fontSize: 20 }} disableElevation onClick={onLoginClick}>로그인</Button>
                        </Card>

                    </Box >
                </Box>
            </> : <>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", m: 0, p: 0 }}>
                    <Box
                        sx={{ background: `url(${bgLogin})`, backgroundSize: "cover", backgroundPosition: "center", width: 1920, minWidth: 1920, height: "98vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", m: 0, p: 0 }}

                    >
                        <Card
                            sx={{ backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3, borderRadius: 5, background: "white", width: 400 }}>
                            <Box sx={{ mb: 2, width: "100%" }}>
                                <Typography sx={{ fontFamily: "bold", fontSize: 25 }}>로그인하세요</Typography>
                                <Typography sx={{ fontFamily: "medium", fontSize: 20 }}>1년 후 나에게 쓰는 편지</Typography>
                            </Box>
                            <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{ width: STYLE.LOGIN_FIELD_WIDTH, height: STYLE.LOGIN_FIELD_HEIGHT, fontFamily: "regular", mb: 2 }} label={LABEL.NAME} InputProps={{
                                style: {
                                    height: 50,
                                    borderRadius: 10,
                                }
                            }} placeholder="이름을 입력하세요." />

                            <TextField value={number} onChange={(e) => setNumber(e.target.value)} sx={{ width: STYLE.LOGIN_FIELD_WIDTH, height: STYLE.LOGIN_FIELD_HEIGHT, fontFamily: "regular", mb: 2 }} label={LABEL.NUMBER} InputProps={{
                                style: {
                                    height: 50,
                                    borderRadius: 10,
                                }
                            }} placeholder="사번을 입력하세요.(7자리)" />

                            <TextField value={birth} onChange={(e) => setBirth(e.target.value)} sx={{ width: STYLE.LOGIN_FIELD_WIDTH, height: STYLE.LOGIN_FIELD_HEIGHT, fontFamily: "regular", mb: 2 }} label={LABEL.BIRTH} InputProps={{
                                style: {
                                    height: 50,
                                    borderRadius: 10,
                                }
                            }} placeholder="생년월일 입력하세요.(6자리)" />
                            <Button variant="contained" sx={{ background: "white", width: STYLE.LOGIN_FIELD_WIDTH, height: 60, backgroundImage: `url(${bgBtn})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", fontFamily: "regular", fontSize: 20 }} disableElevation onClick={onLoginClick}>로그인</Button>
                        </Card>

                    </Box >
                </Box></>
        }
    </>
}

export default LoginView