import React, { useState } from "react"; // Importing React and the useState hook for state management
import { TextField, Button, MenuItem, Box, Typography, Paper } from "@mui/material"; // Importing MUI components
import { addCostToDB } from "../idb"; // Importing the function to add cost to IndexedDB

// CostForm Component - A form for adding a new cost entry
export default function CostForm() {
    // State for handling form inputs
    const [formData, setFormData] = useState({
        sum: "", // The cost amount (must be a positive number)
        category: "", // The category of the expense (Food, Transport, Entertainment)
        description: "", // A short description of the expense
        date: new Date().toISOString().split("T")[0], // Default date to today (YYYY-MM-DD)
    });

    // Function to handle changes in input fields and update state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission and add cost to IndexedDB
    const handleSubmit = async () => {

        // Validate that the sum is a positive number
        if (isNaN(formData.sum) || Number(formData.sum) <= 0) {
            alert("❌ Error: Sum must be a positive number.");
            return;
        }

        try {
            // Add the new cost entry to IndexedDB
            await addCostToDB(formData);

            // Reset form fields after successful submission
            setFormData({
                sum: "",
                category: "",
                description: "",
                date: new Date().toISOString().split("T")[0], // Reset date to today
            });
            alert("✅ Cost added successfully!"); // Show success message
        } catch (error) {
            // Handle any error that occurs while adding to IndexedDB
            alert(`❌ Error adding cost: ${error.message}`);
            console.error("Failed to add cost:", error);
        }
    };



    return (
        // Paper component provides a clean background for the form
        <Paper elevation={6} sx={{ p: 4, borderRadius: "15px", backgroundColor: "#ffffff" }}>
            {/* Title for the form */}
            <Typography variant="h5" gutterBottom color="primary">
                Add a New Cost
            </Typography>

            {/* Box for form inputs with spacing and layout styling */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                {/* Input for entering the sum of the expense */}
                <TextField label="Sum" name="sum" value={formData.sum} onChange={handleChange} fullWidth />

                {/* Dropdown for selecting an expense category */}
                <TextField label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth select>
                    {/* Options for categories */}
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Transport">Transport</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                </TextField>

                {/* Input for entering a description of the expense */}
                <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth/>

                {/* Date picker input for selecting the purchase date */}
                <TextField label="Purchase Date" name="date" type="date" value={formData.date} onChange={handleChange} fullWidth/>

                {/* Button to submit the form and add the expense */}
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
                    Add Cost
                </Button>
            </Box>
        </Paper>
    );
}


