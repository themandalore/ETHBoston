import { conditions } from '@nucypher/taco';
import { useEthers } from '@usedapp/core';
import React, { useState } from 'react';

interface Props {
  condition?: conditions.condition.Condition | undefined;
  setConditions: (value: conditions.condition.Condition) => void;
  enabled: boolean;
}

// const getResultAbi: conditions.base.contract.FunctionAbiProps = {
//   name: "getResult",
//   type: "function",
//   stateMutability: "view",
//   inputs: [],
//   outputs: [
//     {
//       "internalType": "bool",
//       "name": "",
//       "type": "bool"
//     }
//   ],
// }

const getResultAbi: conditions.base.contract.FunctionAbiProps = {
  inputs: [],
  name: "getResult",
  outputs: [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  stateMutability: "view",
  type: "function"
};

const getResultCondition = new conditions.base.contract.ContractCondition({
  method: 'getResult',
  parameters: [],
  functionAbi: getResultAbi,
  contractAddress: "0xF1CE255bd4759EE2ef487a5E6F918AAC75e82735",
  chain: 80002,
  returnValueTest: {
    comparator: '>',
    value: 0,
  },
});

// const rpcCondition = new conditions.base.rpc.RpcCondition({
//   chain: 80002,
//   method: 'eth_getBalance',
//   parameters: [':userAddress'],
//   returnValueTest: {
//     comparator: '>',
//     value: 0,
//   },
// });

export const ConditionBuilder = ({
  condition,
  setConditions,
  enabled,
}: Props) => {
  const { library } = useEthers();

  const demoCondition = JSON.stringify((condition ?? getResultCondition).toObj());
  const [conditionString, setConditionString] = useState(demoCondition);

  if (!enabled || !library) {
    return <></>;
  }

  const prettyPrint = (obj: object | string) => {
    if (typeof obj === 'string') {
      obj = JSON.parse(obj);
    }
    return JSON.stringify(obj, null, 2);
  };

  const makeInput = (
    onChange = (e: any) => console.log(e),
    defaultValue: string,
  ) => (
    <textarea
      rows={15}
      onChange={(e: any) => onChange(e.target.value)}
      defaultValue={prettyPrint(defaultValue)}
    >
      {}
    </textarea>
  );

  const conditionJSONInput = makeInput(
    setConditionString,
    JSON.stringify(getResultCondition.toObj()),
  );

  const onCreateCondition = (e: any) => {
    e.preventDefault();
    setConditions(
      conditions.ConditionFactory.conditionFromProps(
        JSON.parse(conditionString),
      ),
    );
  };

  return (
    <>
      <h2>Ready to get Started?</h2>
      <div>
        {/* <div>
          <h3>Customize your Conditions</h3>
          <div>
            <h3>Condition JSON</h3>
            {conditionJSONInput}
          </div>
        </div> */}
        <button onClick={onCreateCondition}>Create Conditions</button>
      </div>
    </>
  );
};
