module.exports = class HTTP_Server {
    constructor(options = {
        index: 'index.html',
        port: 8080
    }) {
        this.port = options.port;
        const http = require('http');
        const fs = require('fs');
        this.server = http.createServer( (request, response) => {
            if(options.index.endsWith("\\") || options.index.endsWith("/"))
                options.index = options.index.slice(0, -1);
            let req = request.url;
            while(req.startsWith(".")) {
                req = req.slice(1, request.url.length);
            }
            if(req.length === 1)
                req = '/index.html';
            let fileUrl = options.index + req;
            
            fs.readFile(fileUrl, (err, data) => {
                if (!err) {
                    let dotoffset = fileUrl.lastIndexOf('.');
                    let mimetype = dotoffset == -1
                                   ? 'text/plain'
                                   : {
                                     '.html' : 'text/html',
                                     '.ico' : 'image/x-icon',
                                     '.jpg' : 'image/jpeg',
                                     '.png' : 'image/png',
                                     '.gif' : 'image/gif',
                                     '.css' : 'text/css',
                                     '.js' : 'text/javascript'
                                    }[ fileUrl.substr(dotoffset) ];
                    response.setHeader('Content-type' , mimetype);
                    response.end(data);
                    console.log('\x1b[30m\x1b[43mServer:\x1b[0m \x1b[35mRequested file:\x1b[0m ' + fileUrl, mimetype );
                } else {
                    console.log('\x1b[30m\x1b[43mServer:\x1b[0m \x1b[31mFile not found:\x1b[0m ' + fileUrl);
                    response.writeHead(404, "Not Found");
                    response.end();
                }
                });
        });
    }
    listen() {
         this.server.listen(this.port)
         console.log('\x1b[30m\x1b[43mServer:\x1b[0m \x1b[35mListening on port:\x1b[0m ' + this.port);
    };
}