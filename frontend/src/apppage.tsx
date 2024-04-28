import {
    conditions,
    decrypt,
    domains,
    encrypt,
    getPorterUri,
    initialize,
    ThresholdMessageKit,
    toHexString,
  } from "@nucypher/taco";
  import { useEthers } from "@usedapp/core";
  import { ethers } from "ethers";
  import React, { useEffect, useState } from "react";
  
  import { ConditionBuilder } from "./ConditionBuilder";
  import { Decrypt } from "./Decrypt";
  import { Encrypt } from "./Encrypt";
  import { Spinner } from "./Spinner";
  import { downloadData, getWebIrys, uploadData } from "./irys";
  
  const chainIdForDomain = {
    [domains.DEVNET]: 80002,
    [domains.TESTNET]: 80002,
    [domains.MAINNET]: 137,
  };
  
  export default function AppPage() {
    const { activateBrowserWallet, deactivate, account, switchNetwork } =
      useEthers();
  
    const [loading, setLoading] = useState(false);
    const [condition, setCondition] = useState<conditions.condition.Condition>();
    const [encryptedMessageId, setEncryptedMessageIdId] = useState<string>();
    const [decryptedImage, setDecryptedImage] = useState<string>();
    const [decryptionErrors, setDecryptionErrors] = useState<string[]>([]);
    const [decryptionFailureMessage, setDecryptionFailureMessage] = useState<string>("");
    const ritualId = 0;
    const domain = domains.TESTNET;
  
    const chainId = chainIdForDomain[domain];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    useEffect(() => {
      initialize();
      switchNetwork(chainId);
    }, [chainId]);
  
    const encryptMessage = async (message: string) => {
      if (!condition) {
        return;
      }
      setLoading(true);
  
      await switchNetwork(chainId);
  
      const encryptedMessage = await encrypt(
        provider,
        domain,
        message,
        condition,
        ritualId,
        provider.getSigner()
      );
  
      const encryptedMessageHex = toHexString(encryptedMessage.toBytes());
      const webIrys = await getWebIrys(provider);
      const receiptId = await uploadData(webIrys, encryptedMessageHex);
  
      setEncryptedMessageIdId(receiptId);
      setLoading(false);
    };
  
    const decryptMessage = async (encryptedMessageId: string) => {
      if (!condition) {
        return;
      }
      console.log("1")
      setLoading(true);
      setDecryptedImage("");
      setDecryptionErrors([]);
  
      const encryptedMessageHex = (await downloadData(
        encryptedMessageId
      )) as string;
      const encryptedMessage = ThresholdMessageKit.fromBytes(
        Buffer.from(encryptedMessageHex, "hex")
      );
  
      console.log("2")
  
      try {
        const decryptedMessage = await decrypt(
        provider,
        domain,
        encryptedMessage,
        getPorterUri(domain),
        provider.getSigner()
        );
  
        setDecryptedImage(new TextDecoder().decode(decryptedMessage));
      } catch (e) {
        setDecryptionFailureMessage("Failed to validate condition");
      }
  
      setLoading(false);
    };
  
    if (!account) {
      return (
        <div>
          <button onClick={() => activateBrowserWallet()}>Connect Wallet</button>
        </div>
      );
    }
  
    if (loading) {
      return <Spinner loading={loading} />;
    }
  
    return (
      <div>
        <div className="float-end">
            <button onClick={deactivate}> Disconnect Wallet</button>
            {account && <p>Account: {account}</p>}
        </div>

        <ConditionBuilder
            enabled={true}
            condition={condition}
            setConditions={setCondition}
        />

        <Encrypt
            enabled={!!condition}
            encrypt={encryptMessage}
            encryptedMessageId={encryptedMessageId!}
        />

        <Decrypt
            enabled={!!encryptedMessageId}
            decrypt={decryptMessage}
            decryptedImage={decryptedImage}
            decryptionErrors={decryptionErrors}
            decryptionFailure={decryptionFailureMessage}
        />
        </div>
    );
  }