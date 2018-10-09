const http = require('http');

const server = http.createServer(function(req,res)
{
    if (req.url === '/')
    {
        res.write('Hello world!!!');
        res.end();
    }
});

const port = process.env.PORT || 3000
server.listen(port);
console.log(`listening  ${port}`);