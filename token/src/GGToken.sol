// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//import "forge-std/Test.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IPancakeRouter02} from "./interfaces/IPancakeRouter02.sol";

contract GGToken is ERC20, Ownable, ReentrancyGuard {
    struct TokenStaked {
        address tokenAddress;
        uint256 amount;
    }

    mapping (address => uint256) public portfolio;
    mapping (address => TokenStaked[]) public stakers;
    address public routerV2 = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
    address public BNBTokenAddress = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

    error NotEnoughTokenSent(uint256 sentAmount);
    error WrongTokenAmountClaim(uint256 claimAmount);

    constructor() ERC20("GG", "GG") Ownable(msg.sender) {}

    function addToken(address _tokenAddress, uint256 _weight) external onlyOwner {
        portfolio[_tokenAddress] = _weight;
    }

    function getLatestPrice(address _tokenAddress) internal view returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = BNBTokenAddress;
        path[1] = _tokenAddress;
        uint[] memory amounts = IPancakeRouter02(routerV2).getAmountsOut(1 ether, path);
        return amounts[1];
//        return 2 ether;
    }

    function calculatePortfolioValue() public view returns (uint256) {
        uint256 _portfolioValue = 0;
        for (uint256 i = 0; i < stakers[msg.sender].length; i++) {
            TokenStaked storage token = stakers[msg.sender][i];
            uint256 _tokenPrice = getLatestPrice(token.tokenAddress);
            uint256 _tokenValue = token.amount * _tokenPrice / (10**18);
            _portfolioValue += _tokenValue * portfolio[token.tokenAddress];
        }
        return _portfolioValue / 10000; // Adjusting for weight factor (x100)
    }

    function tokenValue() public view returns (uint256) {
        uint256 _portfolioValue = calculatePortfolioValue();
        uint256 _totalSupply = balanceOf(msg.sender);
        if (_portfolioValue == 0 || _totalSupply == 0)
            return 1;
        return _portfolioValue / _totalSupply;
    }

    function stakeToken(address _tokenAddress, uint256 _amount) external nonReentrant {
        require(portfolio[_tokenAddress] != 0, "Wrong token address");

        uint256 _tokenAllowance = IERC20(_tokenAddress).allowance(msg.sender, address(this));
        if (_tokenAllowance < _amount)
            revert NotEnoughTokenSent({sentAmount: _amount});

        SafeERC20.safeTransferFrom(IERC20(_tokenAddress), msg.sender, address(this), _amount);

        bool staked = false;
        for (uint256 i = 0; i < stakers[msg.sender].length; i++) {
            TokenStaked storage token = stakers[msg.sender][i];
            if (token.tokenAddress == _tokenAddress) {
                stakers[msg.sender][i].amount += _amount;
                staked = true;
            }
        }
        if (!staked) {
            stakers[msg.sender].push(TokenStaked({
                tokenAddress: _tokenAddress,
                amount: _amount
            }));
        }

        _mint(msg.sender, _amount * tokenValue());
    }

    function claimToken(address _tokenAddress, uint256 _amount) external nonReentrant {
        require(portfolio[_tokenAddress] != 0, "Wrong token address");

        uint256 _tokenValue = tokenValue();
        uint256 _tokenSupply = balanceOf(msg.sender);
        if (_tokenSupply < _amount * _tokenValue)
            revert WrongTokenAmountClaim({claimAmount: _amount});

        for (uint256 i = 0; i < stakers[msg.sender].length; i++) {
            TokenStaked storage token = stakers[msg.sender][i];
            if (token.tokenAddress == _tokenAddress) {
                if (token.amount < _amount)
                    revert WrongTokenAmountClaim({claimAmount: _amount});
                stakers[msg.sender][i].amount -= _amount;
            }
        }

        _burn(msg.sender, _amount * _tokenValue);
        SafeERC20.safeTransfer(IERC20(_tokenAddress), msg.sender, _amount);
    }
}
