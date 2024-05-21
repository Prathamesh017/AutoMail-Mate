// @description - verify with token
const verifyToken = (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res
                .status(403)
                .json({ message: 'A token is required for authentication' });
        }
        try {
            req.token = token;
            next();
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({ message: 'No Authorization' });
        }
    }
    else {
        return res.status(401).json({ message: 'No Authorization, No Token' });
    }
};
export default verifyToken;
