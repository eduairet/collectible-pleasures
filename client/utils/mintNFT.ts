import { Contract, ContractTransactionReceipt } from "ethers";
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import artifact from './CollectiblePleasures.json';

export async function mintNFT(url: `ipfs://${string}`) {
    const { ethereum } = window as any,
        contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (ethereum && url && contractAddress) {
        const { abi } = artifact;
        const provider: Web3Provider = new Web3Provider(ethereum),
            signer: JsonRpcSigner = provider.getSigner(),
            contract: Contract = new Contract(contractAddress, abi, signer as any),
            tx: ContractTransactionReceipt = await contract.safeMint(await signer.getAddress(), url);
        return tx.hash;
    }
}