import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { TrustProvider } from '@trustwallet/provider';
import { Account } from '@trustwallet/types';

interface Props {
    openModal(title: string, body: React.ReactNode): void;
    closeModal(): void;
}

export default class ProviderExamples extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    private async getAccount(network: number): Promise<Account> {
        let accounts = await TrustProvider.getAccounts().then(list => list.filter(item => item.network === network));

        if (accounts.length < 1) {
            throw 'Account no found';
        }

        return accounts[0];
    }

    testGetAccounts = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let accounts = await TrustProvider.getAccounts();
            openModal('Accounts', <samp>{JSON.stringify(accounts)}</samp>);
        } catch (e) {
            openModal('Accounts Error', <div>{e}</div>);
        }
    };

    testCosmosSendCoins = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 118; // Cosmos
            let account = await this.getAccount(network);
            let transaction = {
                accountNumber: '1035',
                chainId: 'cosmoshub-2',
                fee: {
                    amounts: [
                        {
                            denom: 'uatom',
                            amount: '5000',
                        },
                    ],
                    gas: '200000',
                },
                sequence: '40',
                sendCoinsMessage: {
                    fromAddress: account.address,
                    toAddress: 'cosmos1zcax8gmr0ayhw2lvg6wadfytgdhen25wrxunxa',
                    amounts: [
                        {
                            denom: 'uatom',
                            amount: '100000',
                        },
                    ],
                },
            };

            let result = await TrustProvider.signTransaction(network, transaction);
            openModal('Cosmos Send Coins Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    testCosmosStake = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 118; // Cosmos
            let transaction = {
                typePrefix: 'auth/StdTx',
                accountNumber: '1035',
                chainId: 'cosmoshub-2',
                fee: {
                    amounts: [
                        {
                            denom: 'uatom',
                            amount: '5000',
                        },
                    ],
                    gas: '200000',
                },
                sequence: '40',
                stakeMessage: {
                    delegatorAddress: 'cosmos1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02',
                    validatorAddress: 'cosmosvaloper1zkupr83hrzkn3up5elktzcq3tuft8nxsmwdqgp',
                    amount: {
                        denom: 'uatom',
                        amount: '100000',
                    },
                },
            };

            let result = await TrustProvider.signTransaction(network, transaction);
            openModal('Cosmos Stake Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    testCosmosUnstake = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 118; // Cosmos
            let transaction = {
                typePrefix: 'auth/StdTx',
                accountNumber: '1035',
                chainId: 'cosmoshub-2',
                fee: {
                    amounts: [
                        {
                            denom: 'uatom',
                            amount: '5000',
                        },
                    ],
                    gas: '200000',
                },
                sequence: '40',
                unstakeMessage: {
                    delegatorAddress: 'cosmos1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02',
                    validatorAddress: 'cosmosvaloper1zkupr83hrzkn3up5elktzcq3tuft8nxsmwdqgp',
                    amount: {
                        denom: 'uatom',
                        amount: '100000',
                    },
                },
            };

            let result = await TrustProvider.signTransaction(network, transaction);
            openModal('Cosmos Unstake Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    testCosmosWithdraw = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 118; // Cosmos
            let transaction = {
                typePrefix: 'auth/StdTx',
                accountNumber: '1035',
                chainId: 'cosmoshub-2',
                fee: {
                    amounts: [
                        {
                            denom: 'uatom',
                            amount: '5000',
                        },
                    ],
                    gas: '200000',
                },
                sequence: '40',
                withdrawStakeRewardMessage: {
                    delegatorAddress: 'cosmos1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02',
                    validatorAddress: 'cosmosvaloper1zkupr83hrzkn3up5elktzcq3tuft8nxsmwdqgp',
                },
            };
            let result = await TrustProvider.signTransaction(network, transaction);
            openModal('Cosmos Withdraw Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    testBnbTransfer = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 714; // Binance
            let transaction = {
                accountNumber: '29',
                chainId: 'Binance-Chain-Tigris',
                data: null,
                memo: '',
                sendOrder: {
                    inputs: [
                        {
                            address: 'bnb1xwalxpaes9r0z0fqdy70j3kz6aayetegur38gl',
                            coins: [
                                {
                                    amount: 1000000,
                                    denom: 'BNB',
                                },
                            ],
                        },
                    ],
                    outputs: [
                        {
                            address: 'bnb14u7newkxwdhcuhddvtg2n8n96m9tqxejsjuuhn',
                            coins: [
                                {
                                    amount: 1000000,
                                    denom: 'BNB',
                                },
                            ],
                        },
                    ],
                },
                sequence: '300',
                source: '1',
            };

            let result = await TrustProvider.signTransaction(network, transaction);
            openModal('Binance Transfer Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    testBnbCreateOrder = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 714; // Binance
            let transaction = {
                accountNumber: '29',
                chainId: 'Binance-Chain-Tigris',
                data: null,
                memo: '',
                tradeOrder: {
                    id: '33BBF307B98146F13D20693CF946C2D77A4CAF28-300',
                    ordertype: 2,
                    price: 7800,
                    quantity: 10000000000,
                    sender: 'bnb1xwalxpaes9r0z0fqdy70j3kz6aayetegur38gl',
                    side: 1,
                    symbol: 'PVT-554_BNB',
                    timeinforce: 1,
                },
                sequence: '299',
                source: '1',
            };

            let result = await TrustProvider.signTransaction(network, transaction);
            openModal('Binance Create Order Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    testBnbCancelOrder = async (): Promise<void> => {
        let { openModal } = this.props;

        try {
            let network = 714; // Binance
            let transaction = {
                accountNumber: '29',
                chainId: 'Binance-Chain-Tigris',
                data: null,
                memo: '',
                cancelOrder: {
                    refid: '33BBF307B98146F13D20693CF946C2D77A4CAF28-300',
                    sender: 'bnb1xwalxpaes9r0z0fqdy70j3kz6aayetegur38gl',
                    symbol: 'PVT-554_BNB',
                },
                sequence: '300',
                source: '1',
            };

            let result = await TrustProvider.signTransaction(network, transaction);
            openModal('Binance Cancel Order Signed', <samp>{result}</samp>);
        } catch (e) {
            openModal('Sign Error', <div>{e}</div>);
        }
    };

    get isAvailable(): boolean {
        return TrustProvider.isAvailable;
    }

    render(): JSX.Element {
        return (
            <>
                <Card>
                    <Card.Header>Provider Examples</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Trust Provider{' '}
                            <Badge variant={this.isAvailable ? 'success' : 'danger'}>
                                {this.isAvailable ? 'is available' : 'is not available'}
                            </Badge>
                        </Card.Title>
                        <Button size="lg" disabled={!this.isAvailable} onClick={this.testGetAccounts}>
                            Get Accounts
                        </Button>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>Sign Cosmos Transaction Examples</Card.Header>
                    <Card.Body>
                        <Button size="lg" disabled={!this.isAvailable} onClick={this.testCosmosSendCoins}>
                            Send Coins
                        </Button>
                        <Button size="lg" disabled={!this.isAvailable} onClick={this.testCosmosStake}>
                            Stake
                        </Button>
                        <Button size="lg" disabled={!this.isAvailable} onClick={this.testCosmosUnstake}>
                            Unstake
                        </Button>
                        <Button size="lg" disabled={!this.isAvailable} onClick={this.testCosmosWithdraw}>
                            Withdraw
                        </Button>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>Sign BNB Transaction Examples</Card.Header>
                    <Card.Body>
                        <Button size="lg" disabled={!this.isAvailable} onClick={this.testBnbTransfer}>
                            Transfer
                        </Button>
                        <Button size="lg" disabled={!this.isAvailable} onClick={this.testBnbCreateOrder}>
                            Create Trade Order
                        </Button>
                        <Button size="lg" disabled={!this.isAvailable} onClick={this.testBnbCancelOrder}>
                            Cancel Trade Order
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    }
}
