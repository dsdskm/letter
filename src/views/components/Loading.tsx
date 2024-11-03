import { CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <div style={{ justifyContent: "center", display: "flex", alignItems: "center", width: "100%", height: "100vh" }}>
            <CircularProgress size="10rem" />
        </div>
    );
};

export default Loading;
