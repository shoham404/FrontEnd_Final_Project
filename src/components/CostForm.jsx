import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography, Paper } from "@mui/material";
import { addCostToDB } from "../idb";

export default function CostForm() {
    const [formData, setFormData] = useState({
        sum: "",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (isNaN(formData.sum) || Number(formData.sum) <= 0) {
            alert("❌ Error: Sum must be a positive number.");
            return;
        }

        try {
            await addCostToDB(formData);
            setFormData({
                sum: "",
                category: "",
                description: "",
                date: new Date().toISOString().split("T")[0],
            });
            alert("✅ Cost added successfully!");
        } catch (error) {
            alert(`❌ Error adding cost: ${error.message}`);
            console.error("Failed to add cost:", error);
        }
    };



    return (
        <Paper elevation={6} sx={{ p: 4, borderRadius: "15px", backgroundColor: "#ffffff" }}>
            <Typography variant="h5" gutterBottom color="primary">
                Add a New Cost
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Sum" name="sum" value={formData.sum} onChange={handleChange} fullWidth />
                <TextField
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    fullWidth
                    select
                >
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Transport">Transport</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                </TextField>
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Purchase Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                    Add Cost
                </Button>
            </Box>
        </Paper>
    );
}


