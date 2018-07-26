exports.run = (options) => {
    const m_server = require('./server.js');
    options.port = parseInt(options.port);
    try {
        options = testArgs(options);
    } catch (error) {
        return;
    }
    const Server = new m_server(options);
    Server.listen();
}

function testArgs(args) {
    let fixed = {};
    if(require('./util.js').validPath(args.index)) {
        fixed.index = args.index;
    } else {
        console.error("\x1b[35mserve[arg:1]\x1b[0m Path is not valid");
        throw Error("Path is not valid")
    }
    if(typeof(args.port) != "number" || isNaN(args.port)) {
        console.error("\x1b[35mserve[arg:2]\x1b[0m Expected a Number, received a " + typeof(args.index));
        console.log("Port set to \x1b[33m80\x1b[0m");
        fixed.port = 80;
    } else {
        fixed.port = args.port;
    }
    return fixed;
}