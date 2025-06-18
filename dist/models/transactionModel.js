import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["Income", "Expenses", "Shopping", "Transportation", "Entertainment", "Bills", "Income", "Other", "Foods & drinks"],
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
export const Transaction = mongoose.model("Transaction", transactionSchema);
