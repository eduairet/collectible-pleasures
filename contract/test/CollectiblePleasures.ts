import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract, ContractFactory } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers.js';

const { getSigners } = ethers;

interface Fixture {
    signers: SignerWithAddress[];
    collectiblePleasures: Contract;
}

describe('CollectiblePleasures', function (): void {
    async function deployFixture(): Promise<Fixture> {
        const signers: SignerWithAddress[] = await getSigners(),
            CollectiblePleasures: ContractFactory =
                await ethers.getContractFactory('CollectiblePleasures'),
            collectiblePleasures: Contract =
                await CollectiblePleasures.deploy();

        return { signers, collectiblePleasures };
    }

    describe('Deployment', function (): void {
        it('Should deploy', async function (): Promise<void> {
            const { collectiblePleasures } = await loadFixture(deployFixture);
            expect(collectiblePleasures).to.haveOwnProperty('address');
        });
    });
});
