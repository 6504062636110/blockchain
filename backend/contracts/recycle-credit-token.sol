// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonCredit {
    address public owner;
    mapping(address => uint256) public userCoins;

    event QuestCompleted(address indexed user, uint256 reward);

    // Constructor to set the contract owner
    constructor() {
        owner = msg.sender;
    }

    // Modifier to check that the caller is the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only admin can reward");
        _;
    }

    // Function to complete a quest and reward a user with Ether
    function completeQuest(address user, uint num) external onlyOwner {
        userCoins[user] += num;

        // Debugging line: Log the balance of the contract before and after transfer
        emit QuestCompleted(user, num);
    }

    // Function to get the balance of a user
    function getBalance(address user) external view returns (uint256) {
        return userCoins[user];
    }

    function burn(address user, uint256 amount) external {
        require(msg.sender == owner, "Only admin can burn tokens");
        require(userCoins[user] >= amount, "Insufficient balance");
        userCoins[user] -= amount;
    }
}
