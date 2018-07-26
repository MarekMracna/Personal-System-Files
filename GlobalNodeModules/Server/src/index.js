exports.run = (options) => {
    try {
        options = validateArgs(options);
    } catch (error) {
        console.error(error.message);
        printUsage();
        return;
    }
    const m_server = require('./server.js');
    const Server = new m_server(options);
    Server.listen();
}

function validateArgs(args) {
    let fixed = {};
    const utils = require('./util.js');

    // Index validation
    if(utils.validPath(args.index))
        fixed.index = args.index;
    else throw Error("\x1b[31mserve[arg:1]\x1b[0m Path is not valid");

    // Port validation
    if(utils.validPort(args.port))
        fixed.port = parseInt(args.port);
    else throw Error("\x1b[31mserve[arg:2]\x1b[0m Port is not valid");

    return fixed;
}

function printUsage() {
    const usage = `Usage: serve <path> <port>
    Where \x1b[33m<path>\x1b[0m: Path to served page directory (can be both absolute and relative)
    And   \x1b[33m<port>\x1b[0m: Port for the server to use`
    console.log(usage);
}