import React, { useEffect, useRef } from "react"; // Importing React and Hooks
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Slide, Fade } from "@mui/material"; // Importing MUI components
import { jsPDF } from "jspdf"; // Importing jsPDF for generating PDF reports

// Defining a transition effect for the dialog
const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

// ReceiptDialog Component - Displays a detailed expense report
export default function ReceiptDialog({ open, onClose, costs, month, year }) {
    const receiptRef = useRef(null); // Reference to the receipt container

    // Reset the scroll position when the dialog opens
    useEffect(() => {
        if (open && receiptRef.current) {
            receiptRef.current.scrollTop = 0;
        }
    }, [open]);

    // Define categories for expense grouping
    const categories = ["Food", "Transport", "Entertainment"];

    // Grouping expenses by category
    const groupedCosts = categories.reduce((acc, category) => {
        acc[category] = costs.filter(cost => cost.category === category);
        return acc;
    }, {});

    // Function to generate and download a PDF version of the report
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        const logo = "/fac.ico"; // Path to the logo
        doc.addImage(logo, "PNG", 20, 10, 30, 30); // Adding logo to the PDF

        doc.setFont("courier", "normal");
        doc.text(`Monthly Expense Report`, 20, 50);
        doc.text(`${new Date(0, month - 1).toLocaleString("en-US", { month: "long" })} ${year}`, 20, 60);
        doc.line(20, 65, 190, 65); // Drawing a horizontal line

        let y = 75; // Starting Y position for listing items

        // Iterating over categories and adding expenses to the PDF
        categories.forEach(category => {
            doc.setFont("courier", "bold");
            doc.text(`Category: ${category}`, 20, y);
            y += 10;

            if (groupedCosts[category].length > 0) {
                groupedCosts[category].forEach(cost => {
                    doc.setFont("courier", "normal");
                    doc.text(`Description: ${cost.description}`, 20, y);
                    doc.text(`Amount: $${cost.sum}`, 20, y + 10);
                    doc.text(`Date: ${new Date(cost.date).toLocaleDateString()}`, 20, y + 20);
                    doc.line(20, y + 25, 190, y + 25); // Drawing a separator line
                    y += 35;
                });
            } else {
                doc.text("No expenses", 20, y);
                y += 15;
            }
        });

        // Displaying the total amount at the bottom of the PDF
        doc.setFont("courier", "bold");
        doc.text(`Total: $${costs.reduce((sum, cost) => sum + Number(cost.sum), 0).toFixed(2)}`, 20, y + 10);

        // Saving the generated PDF file
        doc.save(`Expense_Report_${month}_${year}.pdf`);
    };

    return (
        // Dialog component to display the receipt in a pop-up
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" TransitionComponent={Transition}>

            {/* Dialog title displaying the report's month and year */}
            <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
                Monthly Expense Report - {new Date(0, month - 1).toLocaleString("en-US", { month: "long" })} {year}
            </DialogTitle>

            {/* Dialog content containing the structured report */}
            <DialogContent>
                <Box ref={receiptRef} sx={{backgroundColor: "#fff", padding: "20px", borderRadius: "5px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", fontFamily: "'Courier New', Courier, monospace", textAlign: "center", maxHeight: "400px", overflowY: "auto",}}>
                    {/* Logo and title section */}
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <img src="/fac.ico" alt="Logo" style={{ width: "60px", height: "60px" }} />
                        <Typography variant="subtitle2" sx={{ fontStyle: "italic", color: "#888" }}>
                            My Expense Tracker
                        </Typography>
                    </Box>

                    {/* Section header */}
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                        Summary of Expenses
                    </Typography>

                    {/* Subtitle displaying the selected month and year */}
                    <Typography variant="subtitle2" sx={{ color: "gray", marginBottom: "20px", paddingBottom: "10px", borderBottom: "1px dashed #737373" }}>
                        Breakdown of expenses recorded for {new Date(0, month - 1).toLocaleString("en-US", { month: "long" })} {year}
                    </Typography>

                    {/* Iterating through categories and displaying expenses under each category */}
                    {categories.map(category => (
                        <Box key={category} sx={{ marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px dashed #737373", textAlign: "left" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Category: {category}</Typography>
                            {/* Checking if there are expenses in the category */}
                            {groupedCosts[category].length > 0 ? (groupedCosts[category].map((cost, index) => (
                                    <Fade in={true} timeout={300 + index * 150} key={index}>
                                        <Box sx={{ marginBottom: "10px" }}>
                                            <Typography sx={{ fontSize: "14px" }}>Description: {cost.description}</Typography>
                                            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Amount: ${cost.sum}</Typography>
                                            <Typography sx={{ fontSize: "12px", color: "gray" }}>Date: {new Date(cost.date).toLocaleDateString()}</Typography>
                                        </Box>
                                    </Fade>
                                ))
                            ) : (
                                <Typography sx={{ fontSize: "14px", color: "gray" }}>No expenses</Typography>
                            )}
                        </Box>
                    ))}

                    {/* Displaying the total expense amount */}
                    <Box sx={{ marginTop: "20px", textAlign: "left" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "bold", borderTop: "1px dashed #737373", marginTop: "10px", paddingTop: "5px" }}>
                            <Typography>Total</Typography>
                            <Typography>${costs.reduce((sum, cost) => sum + Number(cost.sum), 0).toFixed(2)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>

            {/* Dialog actions including a download button and a close button */}
            <DialogActions>
                <Button onClick={handleDownloadPDF} variant="contained" color="secondary" fullWidth>
                    Download Report
                </Button>
                <Button onClick={onClose} variant="contained" color="primary" fullWidth>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
