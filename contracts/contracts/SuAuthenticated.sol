// SPDX-License-Identifier: BSL 1.1

pragma solidity ^0.8.7;


interface ISuAccessControl {
    function hasRole(bytes32 role, address account) external view returns (bool);

    function getRoleAdmin(bytes32 role) external view returns (bytes32);

    function grantRole(bytes32 role, address account) external;

    function revokeRole(bytes32 role, address account) external;

    function renounceRole(bytes32 role, address account) external;

    function supportsInterface(bytes4 interfaceId) external view returns (bool);

}

/**
 * @title SuAuthenticated
 * @dev other contracts should inherit to be authenticated
 */
abstract contract SuAuthenticated {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 private constant DEFAULT_ADMIN_ROLE = 0x00;

    /// @dev the address of SuAccessControlSingleton - it should be one for all contract that inherits SuAuthenticated
    ISuAccessControl public immutable ACCESS_CONTROL_SINGLETON;

    /// @dev should be passed in constructor
    constructor(address _accessControlSingleton) {
        ACCESS_CONTROL_SINGLETON = ISuAccessControl(_accessControlSingleton);
    }

    /// @dev check DEFAULT_ADMIN_ROLE
    modifier onlyOwner() {
        require(ACCESS_CONTROL_SINGLETON.hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "onlyOwner AUTH_FAILED");
        _;
    }

    /// @dev check MINTER_ROLE
    modifier onlyMinter() {
        require(ACCESS_CONTROL_SINGLETON.hasRole(MINTER_ROLE, msg.sender), "onlyMinter AUTH_FAILED");
        _;
    }
}
