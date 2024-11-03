import { Box, Button, CardMedia, Typography, useTheme } from "@mui/material"
import { getAccount, getContents } from "api/api";
import { Account, Contents } from "interface/interface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountState } from "state/stateAction";
import ReactPlayer from 'react-player';
import NotFoundView from "views/NotFoundView";

const ContentsEditView = () => {
    const theme = useTheme();
    const accountState = useSelector((state: AccountState) => state);
    console.log(`accountState ${JSON.stringify(accountState)}`)
    const id = (accountState && accountState.account) ? accountState.account.key : ""
    const [accountData, setAccountData] = useState<Account>()
    const [contentsData, setContentsData] = useState<Contents>()
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    console.log(`width=${window.innerWidth} height=${window.innerHeight}`)
    useEffect(() => {
        if (window) {
            setWidth(window.innerWidth * 0.5)
            setHeight(window.innerHeight * 0.5)
        }

    }, [window])
    useEffect(() => {
        const initData = async () => {
            console.log(`initData id ${id}`)
            if (id !== null) {
                console.log(`initData`)
                const _accountData = await getAccount(id)
                if (_accountData) {
                    setAccountData(_accountData)
                    const _contentsData = await getContents(id)
                    if (_contentsData) {
                        setContentsData(_contentsData)
                    }

                }
            }
        }
        initData()
    }, [id])
    console.log(`id ${id}`)
    console.log(`accountData`, accountData)
    console.log(`contentsData`, contentsData)
    if (!accountData || !contentsData) {
        return <NotFoundView />
    }
    return <>
        <Box sx={{ m: 5, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <Box sx={{ m: 5, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: 700 }}>
                <Box >
                    <Typography variant="h4">나에게 쓰는 편지</Typography>
                </Box>
                <Box sx={{
                    width:"100%",
                    flex: 1, display: "flex",
                    justifyContent: 'space-between'
                }}>
                    <Typography variant="h5">{accountData.name}</Typography>
                    <Typography variant="h5">사번 {accountData.number}</Typography>
                </Box>

                <Box>
                    <ReactPlayer width={700} height={500} url={contentsData.url} controls />
                </Box>
            </Box>
        </Box>
    </>
}


export default ContentsEditView