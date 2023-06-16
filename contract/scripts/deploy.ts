import { ethers } from 'hardhat';
import { Contract, ContractFactory } from 'ethers';
import { JsonRpcSigner } from '@ethersproject/providers/lib/json-rpc-provider';

const { getContractFactory, provider } = ethers

async function main(): Promise<void> {
    const CollectiblePleasures: ContractFactory = await getContractFactory("CollectiblePleasures"),
        nft: Contract = await CollectiblePleasures.deploy();
    await nft.deployed();
    console.log("NFT deployed to:", nft.address);

    const signer: JsonRpcSigner = provider.getSigner(0);
    await nft.safeMint(await signer.getAddress(), "ipfs://QmPDf8jgtpoD97YUCa6WCzmSgsNmt96Wgkt93CTVmQgKzP");
    console.log("NFT Minted!");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exitCode = 1;
    });
