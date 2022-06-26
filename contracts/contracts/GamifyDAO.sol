// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SuAuthenticated.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract GamifyDAO is SuAuthenticated {
    ERC721 public immutable NFT;
    mapping (address => uint256) public levels;

    constructor(address _authControl, address nft) SuAuthenticated(_authControl) {
        NFT = ERC721(nft);
    }

    function mintNFT(address user) public onlyMinter {
        NFT
    }
    function doLevelUp(address user, uint256 level) public onlyMinter {
        require(levels[user] <= level, "can't lower level");
        levels[user] = level;
    }
}
