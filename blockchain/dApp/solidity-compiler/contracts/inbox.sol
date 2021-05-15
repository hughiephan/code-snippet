pragma solidity ^0.8.3;

contract Inbox {
    string public message;

    constructor (string memory InitialMessage) public {
        message = InitialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}