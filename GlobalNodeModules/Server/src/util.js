module.exports.validPath = (path) => {
    let endsSlash = /^.*(\\|\/)$/;
    let absolute  = /^[A-Z]{1}:((\\|\/)\w*)+$/;
    let relative  = /^(\.|(\.{2}))?((\\|\/)\w*)+$/;

    if(endsSlash.test(path))
        path = path.slice(0,-1);
    console.log(path);
    if(absolute.test(path) || relative.test(path)) {
        return pathExists(path);
    }
    return false;
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