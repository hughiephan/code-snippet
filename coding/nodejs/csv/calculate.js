module.exports = {
    all: function (result) {
        const res = Array.from(result.reduce((m, { token, amount, transaction_type }) => {
            if (transaction_type === 'DEPOSIT')
                return m.set(token, (m.get(token) || 0) + amount)
            else if (transaction_type === 'WITHDRAWAL')
                return m.set(token, (m.get(token) || 0) - amount)
        }, new Map), ([token, amount]) => ({ token, amount }));
        return res;
    },
};
