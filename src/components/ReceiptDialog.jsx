import React, { useEffect, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Slide, Fade } from "@mui/material";
import { jsPDF } from "jspdf";


const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

export default function ReceiptDialog({ open, onClose, costs, month, year }) {
    const receiptRef = useRef(null);

    useEffect(() => {
        if (open && receiptRef.current) {
            receiptRef.current.scrollTop = 0;
        }
    }, [open]);


    const handleDownloadPDF = () => {
        const doc = new jsPDF();


        const logo = "/fac.ico";
        doc.addImage(logo, "PNG", 20, 10, 30, 30);

        doc.setFont("courier", "normal");


        doc.text(`Monthly Expense Report`, 20, 50);
        doc.text(`${new Date(0, month - 1).toLocaleString("en-US", { month: "long" })} ${year}`, 20, 60);
        doc.line(20, 65, 190, 65); // קו הפרדה

        let y = 75;
        costs.forEach((cost, index) => {
            doc.text(`Category: ${cost.category}`, 20, y);
            doc.text(`Description: ${cost.description}`, 20, y + 10);
            doc.text(`Amount: $${cost.sum}`, 20, y + 20);
            doc.text(`Date: ${new Date(cost.date).toLocaleDateString()}`, 20, y + 30);
            doc.line(20, y + 35, 190, y + 35);
            y += 45;
        });


        doc.setFont("courier", "bold");
        doc.text(`Total: $${costs.reduce((sum, cost) => sum + Number(cost.sum), 0).toFixed(2)}`, 20, y + 10);


        doc.save(`Expense_Report_${month}_${year}.pdf`);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" TransitionComponent={Transition}>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
                Monthly Expense Report - {new Date(0, month - 1).toLocaleString("en-US", { month: "long" })} {year}
            </DialogTitle>
            <DialogContent>
                <Box
                    ref={receiptRef}
                    sx={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "5px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        fontFamily: "'Courier New', Courier, monospace",
                        textAlign: "center",
                        maxHeight: "400px",
                        overflowY: "auto",
                    }}
                >
                    {}
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <img src="/fac.ico" alt="Logo" style={{ width: "60px", height: "60px" }} />
                        <Typography variant="subtitle2" sx={{ fontStyle: "italic", color: "#888" }}>
                            My Expense Tracker
                        </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                        Summary of Expenses
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: "gray", marginBottom: "20px", paddingBottom: "10px", borderBottom: "1px dashed #737373" }}>
                        Breakdown of expenses recorded for {new Date(0, month - 1).toLocaleString("en-US", { month: "long" })} {year}
                    </Typography>

                    {costs.length > 0 ? (
                        costs.map((cost, index) => (
                            <Fade in={true} timeout={300 + index * 150} key={index}>
                                <Box sx={{ marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px dashed #737373", textAlign: "left" }}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Category: {cost.category}</Typography>
                                    <Typography sx={{ fontSize: "14px" }}>Description: {cost.description}</Typography>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>Amount: ${cost.sum}</Typography>
                                    <Typography sx={{ fontSize: "12px", color: "gray" }}>Date: {new Date(cost.date).toLocaleDateString()}</Typography>
                                </Box>
                            </Fade>
                        ))
                    ) : (
                        <Typography>No transactions found</Typography>
                    )}

                    <Box sx={{ marginTop: "20px", textAlign: "left" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "bold", borderTop: "1px dashed #737373", marginTop: "10px", paddingTop: "5px" }}>
                            <Typography>Total</Typography>
                            <Typography>${costs.reduce((sum, cost) => sum + Number(cost.sum), 0).toFixed(2)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
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


