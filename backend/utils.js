const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
console.log("TOKEN:", token);
    if (!token) {
        console.log("No token provided");
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
        console.log("JWT ERROR:", err.message); // 🔥 VERY IMPORTANT
        return res.status(403).json({ error: err.message });
    }

    // console.log("VERIFY SECRET:", process.env.ACCESS_TOKEN_SECRET);


    req.user = user;
    next();
});
}

module.exports = authenticateToken;