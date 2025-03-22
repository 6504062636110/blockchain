// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";

contract RecycleCreditToken is ERC20PresetFixedSupply, AccessControl {
    // contract RecycleCreditToken is ERC20PresetFixedSupply {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    constructor(
        address owner
    )
        ERC20PresetFixedSupply(
            "Recycle Credit",
            "GKT",
            30000000 * 10 ** 18,
            owner
        )
    {
        _grantRole(DEFAULT_ADMIN_ROLE, owner);
        _grantRole(MINTER_ROLE, owner);
    }

    // Allow minters to add more tokens to the contract #แบบฝึกหัด Smart Contract
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
    // Allow the owner to add minters #แบบฝึกหัด Smart Contract #2
    function addMinter(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MINTER_ROLE, minter);
    }
}