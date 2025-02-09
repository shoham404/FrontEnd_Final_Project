import React, { useState, useEffect } from "react";
import { Paper, Typography, TextField, MenuItem, Box, Button } from "@mui/material";
import { getCostsByMonth } from "../idb";
import ReceiptDialog from "./ReceiptDialog.jsx";

export default function ReportViewer() {
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());
    const [costs, setCosts] = useState([]);
    const [openReceipt, setOpenReceipt] = useState(false);

    useEffect(() => {
        const fetchCosts = async () => {
            const data = await getCostsByMonth(month, year);
            setCosts(data);
        };
        fetchCosts();
    }, [month, year]);

    return (
        <Paper elevation={6} sx={{ p: 4, borderRadius: "15px", backgroundColor: "#ffffff" }}>
            <Typography variant="h5" gutterBottom color="primary">
                Monthly Report
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    select
                    label="Month"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    fullWidth
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <MenuItem key={i} value={i + 1}>
                            {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Year"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    fullWidth
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setOpenReceipt(true)}
                sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    transition: "0.3s",
                    "&:hover": {
                        transform: "scale(1.05)", // אפקט התקרבות לכפתור בלחיצה
                    }
                }}
            >
                View Receipt
            </Button>

            <ReceiptDialog open={openReceipt} onClose={() => setOpenReceipt(false)} costs={costs} month={month} year={year} />
        </Paper>
    );
}


