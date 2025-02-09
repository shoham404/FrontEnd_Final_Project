import React from "react";
import { CssBaseline, Grid, Box } from "@mui/material";
import Header from "./components/Header.jsx";
import CostForm from "./components/CostForm.jsx";
import ReportViewer from "./components/ReportViewer.jsx";
import ChartViewer from "./components/ChartViewer.jsx";

export default function App() {
    return (
        <>
            <CssBaseline />
            <Header />
            <Box sx={{ p: 4, backgroundColor: "#e3f2fd", minHeight: "100vh" }}>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={6} lg={4}>
                        <CostForm />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <ReportViewer />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <ChartViewer />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

