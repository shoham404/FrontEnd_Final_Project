import React, { useState, useEffect } from "react"; // Importing React and Hooks
import { Paper, Typography, TextField, MenuItem, Box } from "@mui/material"; // Importing MUI components
import { Chart } from "react-google-charts"; // Importing Google Charts component
import { getCostsByMonth } from "../idb";  // Importing function to fetch cost data from IndexedDB

// ChartViewer Component - pie chart for visualizing costs per category
export default function ChartViewer() {

    // State variables for month, year, and chart data
    const [month, setMonth] = useState(0); // Default: current month
    const [year, setYear] = useState(new Date().getFullYear()); // Default: current year
    const [chartData, setChartData] = useState([["Category", "Amount"]]); // Default chart structure

    // Fetch and update chart data when month or year changes
    useEffect(() => {
        const fetchChartData = async () => { // Fetch costs from IndexedDB
            const data = await getCostsByMonth(month, year);
            const aggregated = data.reduce((acc, cost) => {
                acc[cost.category] = (acc[cost.category] || 0) + Number(cost.sum); // Summing up costs per category
                return acc;
            }, {});
            setChartData([["Category", "Amount"], ...Object.entries(aggregated)]); // Update chart data
        };
        fetchChartData(); // Call function to fetch data
    }, [month, year]); // Re-run when month or year changes

    // Chart styling options
    const options = {
        is3D: true, // Enable 3D effect
        pieHole: 0.4, // Convert pie chart to donut chart
        slices: {
            0: { color: "#1E88E5" }, // Blue
            1: { color: "#D32F2F" }, // Red
            2: { color: "#FFC107" }, // Yellow
            3: { color: "#43A047" }, // Green
        },
        legend: { position: "bottom", alignment: "center", textStyle: { fontSize: 14 } }, // Adjust legend styling
        pieSliceText: "percentage", // Display percentages on slices
        chartArea: { width: "90%", height: "80%" }, // Adjust chart size
        animation: { startup: true, duration: 1000, easing: "out" }, // Enable animation on load
    };

    return (
        // Paper component provides a clean background for the chart
        <Paper elevation={6} sx={{ p: 4, borderRadius: "15px", backgroundColor: "#ffffff" }}>
            {/* Title of the Pie Chart section */}
            <Typography variant="h5" gutterBottom color="primary">
                Costs Pie Chart
            </Typography>
            {/* Container for the month and year selectors */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                {/* Dropdown for selecting month */}
                {/* Update state when a new month is selected*/}
                <TextField select label="Month" value={month} onChange={(e) => setMonth(Number(e.target.value))} fullWidth>
                    {/* Generating month options dynamically */}
                    {Array.from({ length: 12 }, (_, i) => (
                        <MenuItem key={i} value={i + 1}>
                            {new Date(0, i).toLocaleString("en-US", { month: "long" })} {/* Convert numeric month to name */}
                        </MenuItem>
                    ))}
                </TextField>
                {/* Input field for selecting year */}
                {/* Update state when a new year is selected*/}
                <TextField label="Year" type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} fullWidth/>
            </Box>
            {/* Google Pie Chart component */}
            <Chart chartType="PieChart" data={chartData} options={options} width="100%" height="400px"/>
        </Paper>
    );
}

