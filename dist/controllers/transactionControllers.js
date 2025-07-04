import { Transaction } from "../models/transactionModel.js";
export const createTransactions = async (req, res) => {
    try {
        const { userId, amount, category, description } = req.body;
        if (!userId || amount === undefined || !category) {
            res.status(400).json({ message: "All fields are required." });
            return;
        }
        const newTransaction = new Transaction({
            userId,
            amount,
            category,
            description,
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json({
            success: true,
            message: "Transaction created ",
            item: savedTransaction,
        });
        console.log("Transaction created successfully====>>>>>>", savedTransaction);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating transaction",
            item: null,
        });
        console.log("Error creating transaction====>>>>>>>>>>", error);
    }
};
export const getTransactionByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ message: "User ID is required." });
            return;
        }
        const transactions = await Transaction.find({ userId });
        if (transactions.length === 0) {
            res.status(404).json({
                message: "Transaction not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Transactions retrieved successfully",
            items: transactions,
        });
        console.log("Transactions retrieved successfully====>>>>>>", transactions);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving transactions",
            items: null,
        });
        console.log("Error retrieving transactions====>>>>>>>>>>", error);
    }
};
export const deleteTransactions = async (req, res) => {
    const { transactionId } = req.params;
    try {
        if (!transactionId) {
            res.status(400).json({ message: "Transaction ID is required." });
            return;
        }
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
        if (deletedTransaction === null) {
            res.status(404).json({
                message: "Transaction not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully",
            item: deletedTransaction,
        });
        console.log("Transaction deleted successfully====>>>>>>", deletedTransaction);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting transaction",
            item: null,
        });
        console.log("Error deleting transaction====>>>>>>>>>>", error);
    }
};
export const getSummaryByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ message: "User ID is required." });
            return;
        }
        const transactions = await Transaction.find({ userId });
        const summary = transactions.reduce((acc, transaction) => {
            acc.total += transaction.amount;
            acc.count += 1;
            if (transaction.category === 'Income') {
                acc.income += transaction.amount;
            }
            else if (transaction.category === 'Expenses') {
                acc.expenses -= transaction.amount;
            }
            return acc;
        }, { total: 0, income: 0, expenses: 0, count: 0 });
        res.status(200).json({
            success: true,
            message: "Summary retrieved successfully",
            summary,
        });
        console.log("Summary retrieved successfully====>>>>>>", summary);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving summary",
            summary: null,
        });
        console.log("Error retrieving summary====>>>>>>>>>>", error);
    }
};
