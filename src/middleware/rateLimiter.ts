import ratelimiter from '../config/upstash.js';
type Iprop = {
    req: import('express').Request;
    res: import('express').Response;
    next: import('express').NextFunction;
}
const rateLimit = async ({req, res, next}: Iprop) => {
    try {
        const {success} = await ratelimiter.limit('my-rate-limiter');

        if (!success) { 
            res.status(429).json({ message: 'Too many requests, please try again later.' });
            return;
        } 
        next();
    } catch (error) {
        console.error('Rate limit error:', error);
        next(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}
export default rateLimit;