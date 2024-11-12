import { Box, Button, TextField, Typography, useTheme } from "@mui/material"
import { ROUTE_CONTENTS_EDIT_VIEW, ROUTE_CONTENTS_LIST_VIEW } from "common/constants"
import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAccount } from "state/states"
import Loading from "./components/Loading"
import { LABEL, STYLE } from "common/resources"
import { getAccount } from "api/api"
import bgLogin from "images/background_login.png"

const LoginView = () => {

    const theme = useTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const [name, setName] = useState<string>()
    const [number, setNumber] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [width, setWidth] = useState<number>()
    const [height, setHeight] = useState<number>()

    useEffect(() => {
        window.addEventListener('resize', () => {
            let viewportWidth = window.innerWidth;
            let viewportHeight = window.innerHeight;
            console.log(`viewportWidth ${viewportWidth} viewportHeight ${viewportHeight}`)
            setWidth(viewportWidth)
            setHeight(viewportHeight)
        })
    }, [])

    const onLoginClick = async () => {
        if (name && number) {
            setLoading(true)
            const data = await getAccount(number)
            if (data && data.name === name) {
                setLoading(false)
                dispatch(setAccount(data.id))
                navigate(ROUTE_CONTENTS_EDIT_VIEW)
                return
            }
        }
        alert("로그인 실패")
        setLoading(false)
    }
    if (loading) {
        return <Loading />
    }
    return <>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", m: 0, p: 0 }}>
            <Box
                sx={{ background: `url(${bgLogin})`, backgroundSize: "cover", width: 1920, minWidth: 1920, height: "98vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", m: 0, p: 0 }}

            >
                <TextField onChange={(e) => setName(e.target.value)} sx={{ width: STYLE.WIDTH, m: 1, fontFamily: "Bold" }} label={LABEL.NAME} />
                <TextField onChange={(e) => setNumber(e.target.value)} sx={{ width: STYLE.WIDTH, m: 1 }} label={LABEL.NUMBER} />
                <Button variant="contained" sx={{ width: STYLE.WIDTH, height: 70, m: 1 }} onClick={onLoginClick}>로그인</Button>
            </Box >
        </Box>
    </>
}

export default LoginView