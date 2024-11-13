import { CircularProgress } from "@mui/material";
import bgBtn from "images//bg.png"
const Loading = () => {
    return (
        <div style={{ justifyContent: "center", display: "flex", alignItems: "center", width: "100%", height: "100vh", backgroundImage: bgBtn }}>
            <CircularProgress size="10rem" sx={{ color: "#8ecfaf" }} />
        </div>
    );
};

export default Loading;
