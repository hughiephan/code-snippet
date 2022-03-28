const option = require("./option");

module.exports = {
    /**
     * Check if our program support the token or not
     * @param token  token to be checked
     * @return       (boolean)
     */
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
