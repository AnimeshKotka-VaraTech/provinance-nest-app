import { Injectable } from '@nestjs/common';
import { ProvenanceExperience } from '@provenance/provenance-sdk'
import { ProvenanceClient, ContractFactory, Wallet } from '@provenanceio/provenance.js';
import { log } from 'console';
import { createHmac } from 'crypto';
import * as bip39 from 'bip39';
import { MockProvider } from './mockProvider';
import { buildMessage, createAnyMessageBase64 } from "@provenanceio/wallet-utils";

@Injectable()
export class AppService {

  private readonly mnemonic: string = 'outer door lyrics chunk onion razor park choice camp shed monkey hammer';
  
  public wallet;
  
  async getHello(): Promise<any> {
    const wallet = Wallet.fromMnemonic(this.mnemonic, true);
    const key = wallet.getKey(0, 0);
    console.log(key.baseAccount);

    const client = ProvenanceClient;
    log('Provinance Client', client);

    return client;
  }

  async generateWallet(): Promise<any> {
    const passphrase = 'animesh';
    this.wallet = Wallet.fromMnemonic(this.mnemonic, false, passphrase);
    const key = this.wallet.getKey(0, 0);
    console.log(key.baseAccount);
    const seed = bip39.mnemonicToSeedSync(this.mnemonic, passphrase);
    const hmac = createHmac('sha512', Buffer.from('Bitcoin seed', 'utf8'));
    hmac.update(seed);
    const digest = hmac.digest();
    const privateKey = Buffer.from(digest.subarray(0, 32));
    console.log('.'.repeat(100));
    console.log('Encoded Private Key generated', privateKey);

    console.log('Decoded Private Key generated', privateKey.toString('hex'));
    const chainCode = Buffer.from(digest.subarray(32, 64));

    const wallet2 = Wallet.fromPrivateKey(privateKey, chainCode, false);


    console.log(wallet2.getKey(0, 0).address);


    return { publcKey: key.publicKey, address: key.address };
  }

  async connectToLedger(): Promise<void> {
    this.wallet = Wallet.fromMnemonic(this.mnemonic, false, null);
    const owner = this.wallet.getKey(0, 0);
    const nonOwner = this.wallet.getKey(0, 1);

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);
    // client.constructAndBroadcastTx(
      
    // );



  }
}
