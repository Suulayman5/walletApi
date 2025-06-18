import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,

    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["Income", "Expenses"],
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
})
export const Transaction = mongoose.model("Transaction", transactionSchema);