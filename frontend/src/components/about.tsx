import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p className="text-lg leading-relaxed">
            Recon Network is a decentralized protocol enables trustless storage of encrypted videos that can only be released upon certain conditions, such as judicial order, dao or public vote, or time delay

            Recon use's Threashold's TACo access control to perform permissionless decryption and leverages Tellor oracles to establish trustless off-chain information relase conditions. Encrypted data is stored on Arweave
        </p>
      </div>
    </div>
  );
}

export default AboutPage;