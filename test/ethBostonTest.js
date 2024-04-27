const { expect } = require("chai");
const { ethers } = require("hardhat");
const {abi, bytecode} = require("usingtellor/artifacts/contracts/TellorPlayground.sol/TellorPlayground.json");

describe("Tellor", function() {
  let dlcTaco;
  let tellorOracle;
  const abiCoder = new ethers.utils.AbiCoder();
  // generate queryData and queryId for eth/usd price
  const queryDataArgs = abiCoder.encode(["string"], ["t/f - should we unencrypt video?"]);
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


    console.log("tellor oracle reports whether bitcoin is Up or Down over the next day")
        let mockValue = true;
        let mockValueBytes = abiCoder.encode(["bool"], [mockValue]);
        await tellorOracle.submitValue(queryId, mockValueBytes, 0,queryData);
        await ethers.provider.send("evm_increaseTime", [901]);
        await ethers.provider.send("evm_mine");
        await dlcTaco.answerQuestion();
        let retrievedVal = await dlcTaco.getResult();
        expect(retrievedVal == mockValue);

        mockValue = false;
        mockValueBytes = abiCoder.encode(["bool"], [mockValue]);
        await tellorOracle.submitValue(queryId, mockValueBytes, 0,queryData);
        await ethers.provider.send("evm_increaseTime", [901]);
        await ethers.provider.send("evm_mine");
        await dlcTaco.answerQuestion();
        retrievedVal = await dlcTaco.getResult();
        expect(retrievedVal == mockValue);
        
    console.log("todo - tACO waits 24 hours and decrypts based on tellor oracle report")
    console.log("todo - message is taken from tACO and put back into bitcoin smart contract")


  })
});
