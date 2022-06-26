// SPDX-License-Identifier: BSL 1.1

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./SuAuthenticated.sol";

pragma solidity ^0.8.0;

/**
 * @title SuAccessControl
 * @dev Access control for contracts. SuVaultParameters can be inherited from it.
 */
// TODO: refactor by https://en.wikipedia.org/wiki/Principle_of_least_privilege
contract SuAccessControlSingleton is AccessControl, SuAuthenticated {
    /**
     * @dev Initialize the contract with initial owner to be deployer
     */
    constructor() SuAuthenticated(address(this)) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
    * @dev Transfers ownership of the contract to a new account (`newOwner`).
    * Can only be called by the current owner.
    */
    function transferOwnership(address newOwner) external {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Ownable: caller is not the owner");

        if (hasRole(MINTER_ROLE, msg.sender)) {
            grantRole(MINTER_ROLE, newOwner);
            revokeRole(MINTER_ROLE, msg.sender);
        }

        grantRole(DEFAULT_ADMIN_ROLE, newOwner);
        revokeRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
}
