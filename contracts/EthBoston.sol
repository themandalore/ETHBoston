// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "usingtellor/contracts/UsingTellor.sol";

contract EthBoston is UsingTellor {
    bytes public queryData = abi.encode("StringQuery", abi.encode("t/f - did ETH rise over the 24 hours ending Sunday Apr 28th UTC0?"));
    bytes32 public queryId = keccak256(queryData);
    bool public result;
    uint256 public lastStoredTimestamp; // Cache timestamp to prevent dispute attacks

    constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) {}

    function getResult() external view returns(bool){
        require(lastStoredTimestamp > 0, "must answer question first");
        return result;
    }

    function answerQuestion() external{
        (bytes memory _value, uint256 _timestampRetrieved) = _getDataBefore(queryId, block.timestamp - 15 minutes);
        require(lastStoredTimestamp == 0, "must be first time running");
        if(_timestampRetrieved > 0) {
            if(block.timestamp - _timestampRetrieved < 24 hours) {
                if(_timestampRetrieved > lastStoredTimestamp) {
                    lastStoredTimestamp = _timestampRetrieved;
                    result = abi.decode(_value, (bool));
                }
            }
        }
    }
}
