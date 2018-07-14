module.exports = class HTTP_Server {
    constructor(options = {
        pathToIndex: 'index.html',
        port: 8080
    }) {
        this.port = options.port;
        const http = require('http');
        const fs = require('fs');
        this.server = http.createServer( (request, response) => {
            let fileUrl = request.url == '/' ? options.pathToIndex : request.url;
            fs.readFile('./' + fileUrl, (err, data) => {
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
                    console.log( fileUrl, mimetype );
                } else {
                    console.log ('File not found: ' + fileUrl);
                    response.writeHead(404, "Not Found");
                    response.end();
                }
                });
        });
    }
    listen(){
         this.server.listen(this.port)
    };
}