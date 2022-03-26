const option = require("./option");

module.exports = {
    isTokenSupported: function (token) {
        const optionLower = option.supportTokenType.map(element => {
            return element.toLowerCase();
        });
        if (optionLower.includes(token.toLowerCase())) {
            return true;
        };
        return false;
    },
};
