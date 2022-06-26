# Deployment

This is my development boilerplate for rapid ethereum smart-contract deployment. It includes code of mock erc20 token with typescript deployer via truffle, via hardhat plugin, hardhat test, and hardhat task. It also has code for vanity address deployment. 
The code is based on https://github.com/dethcrypto/TypeChain/tree/master/examples/hardhat-truffe-v5 example.

## Compile
```
npm install
npm audit fix
truffle compile
npm run generate-types
```

## Test
```
npm run test
npm run coverage
```

## Deploy contracts
Open `.env.example` file and follow instructions.

After that:
```
npm run migrate -- --network rinkeby
```
Or using hardhat
```
npx hardhat run scripts/deploy-mockerc20.ts --network rinkeby
```

## Verify
```
truffle run verify MockErc20 --network rinkeby
```
