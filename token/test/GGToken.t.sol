// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {MockERC20} from "./mocks/MockERC20.sol";
import {GGToken} from "../src/GGToken.sol";

contract GGTokenTest is Test {
    address addr1;
    uint256 addr1PrivateKey;

    GGToken public ggToken;
    MockERC20 public token;

    function setUp() public {
        (addr1, addr1PrivateKey) = makeAddrAndKey("addr1");
        ggToken = new GGToken();
        token = new MockERC20();
        token.mint(addr1, 2 ether);
    }

    function testStakeTokenSuccess() public {
        ggToken.addToken(address(token), 6000);
        vm.startPrank(addr1);

        assertEq(ggToken.calculatePortfolioValue(), 0);

        token.approve(address(ggToken), 1 ether);
        ggToken.stakeToken(address(token), 1 ether);
        assertEq(ggToken.calculatePortfolioValue(), 1200000000000000000);

        token.approve(address(ggToken), 1 ether);
        ggToken.stakeToken(address(token), 1 ether);
        assertEq(ggToken.calculatePortfolioValue(), 2400000000000000000);

        vm.stopPrank();
    }

    function testClaimTokenSuccess() public {
        ggToken.addToken(address(token), 6000);
        vm.startPrank(addr1);

        token.approve(address(ggToken), 1 ether);
        ggToken.stakeToken(address(token), 1 ether);
        assertEq(ggToken.calculatePortfolioValue(), 1200000000000000000);

        ggToken.claimToken(address(token), 1 ether);
        assertEq(ggToken.calculatePortfolioValue(), 0);

        vm.stopPrank();
    }
}
