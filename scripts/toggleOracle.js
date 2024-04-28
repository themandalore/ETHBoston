// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { abi, bytecode } = require("usingtellor/artifacts/contracts/TellorPlayground.sol/TellorPlayground.json")
//  npx hardhat run scripts/toggleOracle.js --network   polygon_amoy

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const abiCoder = new ethers.utils.AbiCoder();
  const queryDataArgs = abiCoder.encode(["string"], ["t/f - should we unencrypt video?"]);
  const queryData= abiCoder.encode(["string", "bytes"], ["StringQuery", queryDataArgs]);
  const queryId = ethers.utils.keccak256(queryData);
  const tellorAddy = "0xC866DB9021fe81856fF6c5B3E3514BF9D1593D81"
  const ethBostonAddy = "0xF1CE255bd4759EE2ef487a5E6F918AAC75e82735"

  var provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  
  ////////////// TellorFlex
  console.log("Toggling oracle.")
  const ethBoston= await ethers.getContractAt("contracts/EthBoston.sol:EthBoston", ethBostonAddy,wallet)
  let _currentState = await ethBoston.result.call()
  let tellorOracle = await ethers.getContractFactory(abi, bytecode);
  tellorOracle = tellorOracle.attach(tellorAddy);
  let mockValue = !_currentState;
  let mockValueBytes = abiCoder.encode(["bool"], [mockValue]);
  console.log("calling tellor oracle, switching it to: ", mockValue)
  await tellorOracle.connect(wallet).submitValue(queryId, mockValueBytes, 0,queryData);
  console.log("answering question")
  await ethBoston.connect(wallet).answerQuestion();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
