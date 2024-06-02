export const Abi = [
  'function calculatePortfolioValue() public view returns (uint256)',
  'function tokenValue() external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function stakeToken(address _tokenAddress, uint256 _amount) external',
  'function claimToken(address _tokenAddress, uint256 _amount) external',
];

export const Erc20Abi = [
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
  'function approve(address _spender, uint256 _value) external returns (bool)',
];
