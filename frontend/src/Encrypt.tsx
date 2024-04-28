import React, { ChangeEventHandler, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { fileToDataString } from "./utils";

interface Props {
  enabled: boolean;
  encryptedMessageId?: string;
  encrypt: (value: string) => void;
}

export const Encrypt = ({ encrypt, encryptedMessageId, enabled }: Props) => {
  if (!enabled) {
    return <></>;
  }
  const [imageSrc, setImageSrc] = useState<string>("");
  const onClick = () => encrypt(imageSrc);

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    console.log("file change");
    const file = e.target.files?.[0]

    if (!file) {
      return
    }
    
    try {
      setImageSrc(await fileToDataString(file));
    } catch(e) {
      console.error(e);
    }
  };

  const EncryptedMessageIdContent = () => {
    if (!encryptedMessageId) {
      return <></>;
    }

    return (
      <>
        <div>
          <h3>Encrypted image id:</h3>
          <pre className="encryptedMessageId">{encryptedMessageId}</pre>
          <CopyToClipboard text={encryptedMessageId}>
            <button>Copy to clipboard</button>
          </CopyToClipboard>
        </div>
      </>
    );
  };

  return (
    <div>
      <h2>Image Encryption</h2>
      <input type="file" onChange={handleChangeFile} accept="image/*"/>
      <img src={imageSrc} />
      <button onClick={onClick}>Encrypt</button>
      {EncryptedMessageIdContent()}
    </div>
  );
};
