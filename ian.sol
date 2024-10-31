// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract Ians_contract{
    uint256 number;
    string public message;

    //constructor
    constructor(uint256 startingPoint, string  memory _startingMessage){
        number = startingPoint;
        message = _startingMessage;
    }

    //reading functions this collects data but not updating it
    function getNumber() external view returns(uint256){
            return number;

    }
    //function to increase a number by 1
    function increaseNumber()external {
        number++;
    }

    //function to decrease anumber by 1
    function decreaseNumber()external {
        number--;
    }
    //function to update a message
    function setMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}