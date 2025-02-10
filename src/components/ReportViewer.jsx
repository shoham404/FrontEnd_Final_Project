import React, { useState, useEffect } from "react"; // Importing React and Hooks
import { Paper, Typography, TextField, MenuItem, Box, Button } from "@mui/material"; // Importing MUI components
import { getCostsByMonth } from "../idb"; // Importing function to fetch costs from IndexedDB
import ReceiptDialog from "./ReceiptDialog.jsx"; // Importing the ReceiptDialog component

// ReportViewer Component - Displays the monthly expense report selection
export default function ReportViewer() {

    // State variables for managing selected month, year, cost data, and dialog visibility
    const [month, setMonth] = useState(0); // Stores the selected month
    const [year, setYear] = useState(new Date().getFullYear()); // Stores the selected year
    const [costs, setCosts] = useState([]); // Stores the retrieved cost data
    const [openReceipt, setOpenReceipt] = useState(false); // Manages the state of the receipt dialog

    // Function to fetch costs from the database based on selected month and year
    const fetchCosts = async () => {
        const data = await getCostsByMonth(month, year); // Fetch data from IndexedDB
        setCosts(data); // Update state with retrieved costs
    };

    // useEffect hook to fetch data whenever the month or year changes
    useEffect(() => {
        fetchCosts(); // Loads initial data when month/year changes
    }, [month, year]);

    return (
        // Paper component to provide clean background for the report
        <Paper elevation={6} sx={{ p: 4, borderRadius: "15px", backgroundColor: "#ffffff" }}>
            {/* Title for the report section */}
            <Typography variant="h5" gutterBottom color="primary">
                Monthly Report
            </Typography>

            {/* Box for month and year selection fields */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                {/* Dropdown for selecting a month */}
                <TextField select label="Month" value={month} onChange={(e) => setMonth(Number(e.target.value))} fullWidth>
                    {/* Generating month options dynamically */}
                    {Array.from({ length: 12 }, (_, i) => (
                        <MenuItem key={i} value={i + 1}>
                            {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Input field for selecting the year */}
                <TextField label="Year" type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} fullWidth/>
            </Box>

            {/* Button to view the report, fetches the latest data before opening the dialog */}
            <Button variant="contained" color="primary" fullWidth onClick={async () => {
                    await fetchCosts();  // Ensure latest data is fetched before opening
                    setOpenReceipt(true); // Open the receipt dialog
                }}
                sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    transition: "0.3s",
                    "&:hover": {
                        transform: "scale(1.05)", // Slight hover effect
                    }
                }}>
                View Report
            </Button>

            {/* ReceiptDialog Component - Displays the expense report in a structured format */}
            <ReceiptDialog open={openReceipt} onClose={() => setOpenReceipt(false)} costs={costs} month={month} year={year} />
        </Paper>
    );
}


