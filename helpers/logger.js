exports.customLogger = (req,res,next) => {

    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const body = JSON.stringify(req.body, null, 2);
  
    // Log each piece of information on separate lines
    console.log(`[${timestamp}] ${method}`);
    console.log(`URL: ${url}`);
    console.log('Body:');
    console.log(body);
  
    next();
}

exports.apiResponseTime = (req,res,next) => {
    const startTime = new Date();
    res.on('finish',() => {
        const endTime = new Date();
        const executionTime = endTime - startTime; // Time in milliseconds
        console.log('API-Response-Time',executionTime)
    })
    next()
}

exports.log = (message) => {
    console.log(message)
}  