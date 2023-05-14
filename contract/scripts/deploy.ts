import { ethers } from 'hardhat';
import { Contract, ContractFactory } from 'ethers';

const { getContractFactory } = ethers;

async function main(): Promise<void> {
    const CollectiblePleasures: ContractFactory = await getContractFactory(
            'CollectiblePleasures'
        ),
        collectiblePleasures: Contract = await CollectiblePleasures.deploy();
    await collectiblePleasures.deployed();

    console.log(
        `CollectiblePleasures deployed to ${collectiblePleasures.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exitCode = 1;
    });
