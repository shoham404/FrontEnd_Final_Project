import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="static" sx={{ bgcolor: "#0d47a1", padding: "10px" }}>
            <Toolbar>
                <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center", color: "#fff" }}>
                    Cost Manager Application
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

