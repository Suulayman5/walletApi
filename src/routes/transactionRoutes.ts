import { Router } from "express";

import { createTransactions, getTransactionByUserId, deleteTransactions, getSummaryByUserId } from "../controllers/transactionControllers.js";

const router = Router();


router.post("/transactions", createTransactions);
router.get("/transactions/:userId", getTransactionByUserId); 
router.get("/transactions/summary/:userId", getSummaryByUserId);  
router.delete("/transactions/:id", deleteTransactions);
 
export default router;