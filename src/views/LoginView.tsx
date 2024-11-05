import { Box, Button, TextField, Typography, useTheme } from "@mui/material"
import { ROUTE_CONTENTS_EDIT_VIEW, ROUTE_CONTENTS_LIST_VIEW } from "common/constants"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAccount } from "state/states"
import Loading from "./components/Loading"
import { LABEL, STYLE } from "common/resources"
import { getAccount } from "api/api"
import dotenv from "dotenv";

const LoginView = () => {
    console.log(`url ${process.env.SERVER_ADDRESS}`)

    const theme = useTheme();
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const [name, setName] = useState<string>()
    const [number, setNumber] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
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
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="90vh"
        >
            <Typography variant="h4" fontStyle="bold" color={theme.palette.primary.main} sx={{ mb: 5 }}>나에게 쓰는 편지</Typography>
            <TextField onChange={(e) => setName(e.target.value)} sx={{ width: STYLE.WIDTH, m: 1 }} label={LABEL.NAME} />
            <TextField onChange={(e) => setNumber(e.target.value)} sx={{ width: STYLE.WIDTH, m: 1 }} label={LABEL.NUMBER} />
            <Button variant="contained" sx={{ width: STYLE.WIDTH, height: 70, m: 1 }} onClick={onLoginClick}>로그인</Button>
        </Box >

    </>
}

export default LoginView