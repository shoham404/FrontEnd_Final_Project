import React from "react"; // Importing React
import { CssBaseline, Grid, Box } from "@mui/material"; // Importing MUI components
import Header from "./components/Header.jsx"; // Importing the Header component
import CostForm from "./components/CostForm.jsx"; // Importing the CostForm component
import ReportViewer from "./components/ReportViewer.jsx"; // Importing the ReportViewer component
import ChartViewer from "./components/ChartViewer.jsx"; // Importing the ChartViewer component

// App Component - The main application layout
export default function App() {
    return (
        <>
            {/* CssBaseline ensures a consistent baseline for styling across different browsers */}
            <CssBaseline />

            {/* Header component - Displays the app's navigation bar */}
            <Header />

            {/* Main content container - Provides padding and a background color */}
            <Box sx={{ p: 4, backgroundColor: "#e3f2fd", minHeight: "100vh" }}>

                {/* Grid container to structure the layout of the components */}
                <Grid container spacing={4} justifyContent="center">

                    {/* First grid item - The CostForm component for adding new expenses */}
                    <Grid item xs={12} md={6} lg={4}>
                        <CostForm />
                    </Grid>

                    {/* Second grid item - The ReportViewer component for viewing expense reports */}
                    <Grid item xs={12} md={6} lg={4}>
                        <ReportViewer />
                    </Grid>

                    {/* Third grid item - The ChartViewer component for displaying expense distribution in a pie chart */}
                    <Grid item xs={12} md={6} lg={4}>
                        <ChartViewer />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

