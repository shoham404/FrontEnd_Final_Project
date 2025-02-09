import React, { useState, useEffect } from "react";
import { Paper, Typography, TextField, MenuItem, Box } from "@mui/material";
import { Chart } from "react-google-charts";
import { getCostsByMonth } from "../idb";

export default function ChartViewer() {
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());
    const [chartData, setChartData] = useState([["Category", "Amount"]]);

    useEffect(() => {
        const fetchChartData = async () => {
            const data = await getCostsByMonth(month, year);
            const aggregated = data.reduce((acc, cost) => {
                acc[cost.category] = (acc[cost.category] || 0) + Number(cost.sum);
                return acc;
            }, {});
            setChartData([["Category", "Amount"], ...Object.entries(aggregated)]);
        };
        fetchChartData();
    }, [month, year]);

    // אפשרויות עיצוב
    const options = {
        title: "Cost Distribution",
        is3D: true, // הפעלת תלת-ממד
        pieHole: 0.4, // שינוי לצורת Doughnut (אם תרצי)
        slices: {
            0: { color: "#1E88E5" }, // כחול
            1: { color: "#D32F2F" }, // אדום
            2: { color: "#FFC107" }, // צהוב
            3: { color: "#43A047" }, // ירוק
        },
        legend: { position: "bottom", alignment: "center", textStyle: { fontSize: 14 } },
        pieSliceText: "percentage", // הצגת אחוזים על כל פרוסה
        chartArea: { width: "90%", height: "80%" }, // התאמת שטח הגרף
        animation: { startup: true, duration: 1000, easing: "out" }, // אנימציה בטעינה
    };

    return (
        <Paper elevation={6} sx={{ p: 4, borderRadius: "15px", backgroundColor: "#ffffff" }}>
            <Typography variant="h5" gutterBottom color="primary">
                Costs Pie Chart
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
            <Chart
                chartType="PieChart"
                data={chartData}
                options={options}
                width="100%"
                height="400px"
            />
        </Paper>
    );
}

