module.exports.validPath = (path) => {
    const endsSlash = /^.*(\\|\/)$/;
    const absolute  = /^[A-Z]{1}:((\\|\/)\w*)+$/;
    const relative  = /^(\.|(\.{2}))?((\\|\/)\w*)+$/;

    if(endsSlash.test(path))
        path = path.slice(0,-1);
    if(absolute.test(path) || relative.test(path)) {
        return pathExists(path);
    }
    return false;
}

module.exports.validPort = (port) => {
    const isNumber = /^\d{1,5}$/;
    return isNumber.test(port);
}

function pathExists(path) {
    try {
        let fs = require("fs");
        fs.accessSync(path);
        return true;
    } catch (error) {
        return false;
    }
}