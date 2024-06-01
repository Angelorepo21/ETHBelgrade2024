// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";

import {GGToken} from "../src/GGToken.sol";


contract DeployGGTokenScript is Script {
    GGToken public ggToken;
    uint256 public deployerPrivateKey;

    function setUp() public {
        deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        ggToken = new GGToken();
        console.log("==GGToken addr=%s", address(ggToken));
        vm.stopBroadcast();
    }
}
