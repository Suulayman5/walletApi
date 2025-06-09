export const createTransactions = async (req, res) => {
    try {
        const { userId, amount, category, description } = req.body;
        if (!userId || !amount || !category) {
            return res.status(400).json({ message: "User ID, amount, and category are required." });
        }
    } catch (error) {
        
    }
}