import React from "react"; // Importing React
import { AppBar, Toolbar, Typography } from "@mui/material"; // Importing MUI components

// Header Component - Displays the application's title in the navigation bar
export default function Header() {
    return (
        // AppBar component creates a fixed navigation bar at the top
        <AppBar position="static" sx={{ bgcolor: "#0d47a1", padding: "10px" }}>
            {/* Toolbar is used to structure the content inside the AppBar */}
            <Toolbar>
                {/* Typography component displays the application title */}
                <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center", color: "#fff" }}>
                    Cost Manager Application
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

