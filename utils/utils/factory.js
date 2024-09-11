const { v4 } = require("uuid");

function createToken() {
    return v4();
}


module.exports = {
    createToken
}