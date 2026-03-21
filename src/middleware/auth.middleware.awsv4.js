
// AWS V4 signature validation
const aws4 = require('aws4');

const authMiddleware = (req, res, next) => {
    // Check for AWS Authorization header
    const authorization = req.headers['authorization'];
    const amzDate = req.headers['x-amz-date'];
    const host = req.headers['host'];
    if (!authorization || !amzDate || !host) {
        return res.status(401).json({ error: 'Missing AWS V4 headers' });
    }

    // Validate AWS V4 signature
    // NOTE: In production, you must fetch the secret key for the access key from AWS IAM or env
    // Here, for local testing, use dummy credentials
    const opts = {
        host,
        method: req.method,
        path: req.originalUrl,
        headers: req.headers,
        body: req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : undefined
    };
    console.log(opts)
    // Dummy credentials for local testing
    const credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIDEXAMPLE',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY',
    };
    try {
        // aws4.sign mutates opts, so compare signature
        const signed = aws4.sign({ ...opts }, credentials);
        console.log(authorization)
                console.log(signed.headers['Authorization'])

        if (signed.headers['Authorization'] !== authorization) {
            return res.status(401).json({ error: 'Invalid AWS V4 signature' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'AWS V4 validation error', details: err.message });
    }
};

module.exports = authMiddleware;