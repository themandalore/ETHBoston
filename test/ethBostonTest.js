const { expect } = require("chai");
const { ethers } = require("hardhat");
const {abi, bytecode} = require("usingtellor/artifacts/contracts/TellorPlayground.sol/TellorPlayground.json");
const { format } = require("node:util");
const {
  toBytes,
  toHexString,
} = require("./utils.js");
// const {
//   conditions,
//   decrypt,
//   domains,
//   encrypt,
//   fromBytes,
//   getPorterUri,
//   initialize,
//   ThresholdMessageKit
// } = require("@nucypher/taco");


rpcProviderUrl = "https://rpc-amoy.polygon.technology"
encryptorPrivateKey = "0x900edb9e8214b2353f82aa195e915128f419a92cfb8bbc0f4784f10ef4112b86"
CONSUMER_PRIVATE_KEY="0xf307e165339cb5deb2b8ec59c31a5c0a957b8e8453ce7fe8a19d9a4c8acf36d4"
ritualId = 0
domain = "tapir"
const provider = new ethers.providers.JsonRpcProvider(rpcProviderUrl);



async function encryptToBytes(messageString) {
  const encryptorSigner = new ethers.Wallet(encryptorPrivateKey);
  console.log(
    "Encryptor signer's address:",
    await encryptorSigner.getAddress(),
  );

  const message = toBytes(messageString);
  console.log(format('Encrypting message ("%s") ...', messageString));
  return message
  }

async function decryptFromBytes(encryptedBytes) {
  const consumerSigner = new ethers.Wallet(consumerPrivateKey);
  console.log(
    "\nConsumer signer's address:",
    await consumerSigner.getAddress(),
  );

  const messageKit = ThresholdMessageKit.fromBytes(encryptedBytes);
  console.log('Decrypting message ...');
  return decrypt(
    provider,
    domain,
    messageKit,
    getPorterUri(domain),
    consumerSigner,
  );
}


describe("Tellor", function() {
  let dlcTaco;
  let tellorOracle;
  const abiCoder = new ethers.utils.AbiCoder();
  // generate queryData and queryId for eth/usd price
  const queryDataArgs = abiCoder.encode(["string"], ["t/f - did ETH rise over the 24 hours ending Sunday Apr 28th UTC0?"]);
  const queryData= abiCoder.encode(["string", "bytes"], ["StringQuery", queryDataArgs]);
  const queryId = ethers.utils.keccak256(queryData);

  // Set up Tellor Playground Oracle and SampleUsingTellor
  beforeEach(async function () {
    let TellorOracle = await ethers.getContractFactory(abi, bytecode);
    tellorOracle = await TellorOracle.deploy();
    await tellorOracle.deployed();

    let ETHBoston = await ethers.getContractFactory("EthBoston");
    dlcTaco = await ETHBoston.deploy(tellorOracle.address);
    await dlcTaco.deployed();
  });

  it("full Test: ", async function() {
    console.log("todo - create Bitcoin DLC contract -- alice and bob are oracles")
    console.log("todo - set question as 'will btc rise in 24 hours?'")
    console.log("todo - set potential outcomes as enum all to bob or all to alice, or money back")
    console.log("todo - two parties lock funds into contract")
    console.log("todo - both parties send encoded signed message of 'invalid' and 'other party wins' to tACO")

    let _mySecret = "super secret secret....secret"
    //await initialize();
    let _bytes = await encryptToBytes(_mySecret);
    console.log('Ciphertext: ', toHexString(_bytes));

    console.log("tellor oracle reports whether bitcoin is Up or Down over the next day")
        const mockValue = true;
        const mockValueBytes = abiCoder.encode(["bool"], [mockValue]);
        await tellorOracle.submitValue(queryId, mockValueBytes, 0,queryData);
        await ethers.provider.send("evm_increaseTime", [901]);
        await ethers.provider.send("evm_mine");
        await dlcTaco.answerQuestion();
        const retrievedVal = await dlcTaco.getResult();
        expect(retrievedVal == mockValue);

    console.log("todo - tACO waits 24 hours and decrypts based on tellor oracle report")
    console.log("todo - message is taken from tACO and put back into bitcoin smart contract")


  })
});
