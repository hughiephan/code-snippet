const assert = require('assert');
// Local ethereum test network
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

beforeEach(async () => {
    // Without using async
    // web3.eth.getAccounts()
    //     .then(fetchedAccounts => {
    //         console.log(fetchedAccounts);
    //     });
    accounts = await web3.eth.getAccounts();

    // deploy contract
    // Refactor: write to a file so we don't waste time compiling each time
    inbox = await new web3.eth.Contract(interface)
      .deploy({ data: bytecode, arguments: ['Hi there!']})
      .send({ from: accounts[0], gas: '1000000'})
});

describe('Inbox Test', () => {
    it('deploys a contract', () => {
        // If we have an address then the contract is sent
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        assert.strictEqual(await inbox.methods.message().call(), 'Hi there!');
    });

    it('can change the messasge', async () => {
        await inbox.methods.setMessage('Bye there!').send({ from: accounts[0]} );
        assert.strictEqual(await inbox.methods.message().call(), 'Bye there!');
    })
})