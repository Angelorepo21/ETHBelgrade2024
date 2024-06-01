build:
	forge build --sizes

compile:
	forge compile

tests:
	source .env && forge test --match-contract Test -vvv

deploy:
	source .env && forge script script/DeployGGToken.s.sol:DeployGGTokenScript --rpc-url $$BSC_RPC_URL --broadcast --etherscan-api-key $$BSCSCAN_API_KEY --verify -vvvv
