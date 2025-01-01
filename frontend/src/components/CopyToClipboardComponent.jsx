import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyToClipboardComponent = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="input-group">
      <input
        type="text"
        value={textToCopy}
        readOnly
        id="shorturl"
        className="input-field"
      />
      <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
        <button className="copy_btn">{copied ? "Copied!" : "Copy"}</button>
      </CopyToClipboard>
    </div>
  );
};

export default CopyToClipboardComponent;
