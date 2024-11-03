import { Box, Button, TextField } from "@mui/material"
import { ROUTE_CONTENTS_EDIT_VIEW, ROUTE_CONTENTS_LIST_VIEW } from "common/constants"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAccount } from "state/states"
import Loading from "./components/Loading"
import { LABEL, STYLE } from "common/resources"
import { getAccount } from "api/api"

const LoginView = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const [name, setName] = useState<string>("김진용")
    const [number, setNumber] = useState<string>("0731664")
    const [loading, setLoading] = useState<boolean>(false)
    const onLoginClick = async () => {
        if (name && number) {
            setLoading(true)
            const data = await getAccount(number)
            if (data && data.name === name) {
                alert("로그인 성공")
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
            <TextField onChange={(e) => setName(e.target.value)} sx={{ width: STYLE.WIDTH }} label={LABEL.NAME} />
            <TextField onChange={(e) => setNumber(e.target.value)} sx={{ width: STYLE.WIDTH }} label={LABEL.NUMBER} />
            <Button variant="contained" sx={{ width: STYLE.WIDTH }} onClick={onLoginClick}>로그인</Button>
        </Box >

    </>
}

export default LoginView