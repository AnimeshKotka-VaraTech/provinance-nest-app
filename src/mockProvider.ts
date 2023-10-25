import { IProvider, Network } from '@provenanceio/provenance.js';

export class MockProvider implements IProvider {

    constructor() {
        this.network = {
            //uri: 'piomock1:9090',
            //chainId: 'piomock1'
            uri: 'https://wallet.test.provenance.io/proxy', //localhost:9090',
            chainId: 'chain-local'
        };
    }

    readonly network: Network;

}
