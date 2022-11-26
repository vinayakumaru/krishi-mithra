import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";

export default function PaymentSuccessDialog(props) {

    const [showButtons,setShowButtons] = React.useState(true);

    const handleClose = () => {
        props.setOpen(false);
    };

    const handlePrint = () => {
        setShowButtons(false);
        setTimeout(() => {
            window.print();
            setShowButtons(true);
        }, 1);
    };
    return (
        <div>
            <Dialog
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Paper
                    elevation={6}
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        width: 400,
                        height: 500,
                        padding: "20px",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            textAlign: "center",
                            color: "#4ec487",
                            fontSize: "25px",
                        }}
                    >
                        Payment Successfull!
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                        }}
                    >
                        <CheckCircleOutlineIcon
                            sx={{
                                color: "#4ec487",
                                fontSize: "90px",
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            marginTop: "20px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                fontSize: "15px",
                                justifyContent: "space-between",
                                paddingInline: "20px",
                            }}
                        >
                            <p style={{ fontWeight: "bold" }}>
                                Transaction ID:
                            </p>
                            <p>{props.transactionId}</p>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                fontSize: "15px",
                                justifyContent: "space-between",
                                paddingInline: "20px",
                            }}
                        >
                            <p style={{ fontWeight: "bold" }}>Payment Type:</p>
                            <p>UPI</p>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                fontSize: "15px",
                                justifyContent: "space-between",
                                paddingInline: "20px",
                            }}
                        >
                            <p style={{ fontWeight: "bold" }}>UPI Id:</p>
                            <p>{props.UpiID}</p>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                fontSize: "15px",
                                justifyContent: "space-between",
                                paddingInline: "20px",
                            }}
                        >
                            <p style={{ fontWeight: "bold" }}>Mobile:</p>
                            <p>{props.phoneNumber}</p>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                fontSize: "20px",
                                justifyContent: "space-between",
                                marginTop: "20px",
                                paddingInline: "20px",
                            }}
                        >
                            <p style={{ fontWeight: "bold" }}>Amount:</p>
                            <p>₹ {props.amount}</p>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            justifyContent: "right",
                            marginTop: "35px",
                            gap: "10px",
                            display: showButtons ? "flex" : "none",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="success"
                            sx={{
                                color: "white",
                                width: "100px",
                            }}
                            onClick={handlePrint}
                        >
                            Print
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{
                                color: "white",
                                width: "100px",
                            }}
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </Box>
                </Paper>
            </Dialog>
        </div>
    );
}
