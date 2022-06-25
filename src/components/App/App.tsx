import React, { useContext } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal, { IProviderOptions } from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import Header from "../Header/Header";
import { idToNetwork, NETWORK, networkInfo, networkToId } from "../../utils/network";
import { DispatchContext, StateContext } from "../../reducer/constants";
import Actions from "../../reducer/actions";

import "./App.scss";
import Routes from "../Routes/Routes";

const RPC = {
    [networkToId.eth]: networkInfo[NETWORK.eth].rpcUrls[0],
    [networkToId.rinkeby]: networkInfo[NETWORK.rinkeby].rpcUrls[0],
    [networkToId.bsc]: networkInfo[NETWORK.bsc].rpcUrls[0],
    [networkToId.polygon]: networkInfo[NETWORK.polygon].rpcUrls[0],
    [networkToId.fantom]: networkInfo[NETWORK.fantom].rpcUrls[0],
    [networkToId.avalanche]: networkInfo[NETWORK.avalanche].rpcUrls[0],
    [networkToId.aurora]: networkInfo[NETWORK.aurora].rpcUrls[0],
};

const providerOptions: IProviderOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: RPC,
            qrcode: true,
            qrcodeModalOptions: {
                mobileLinks: ["metamask", "trust"],
            },
        },
    },
    binancechainwallet: {
        package: true,
    },
    coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: "StableUnit App",
            infuraId: "20518e992a3143bd86f2367198e7856a",
            rpc: RPC,
            chainId: [networkToId[NETWORK.rinkeby]],
            darkMode: true,
        },
    },
};

const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
    theme: {
        background: "#313131",
        main: "rgb(255, 255, 255)",
        secondary: "rgb(136, 136, 136)",
        border: "none",
        hover: "rgba(32, 32, 29, 0.8)",
    },
});

const App = () => {
    const { web3, chain } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const onDisconnect = async () => {
        // @ts-ignore
        if (web3?.currentProvider?.close) {
            // @ts-ignore
            await web3.currentProvider.close();
        }
        await web3Modal.clearCachedProvider();
        dispatch({ type: Actions.SetAccount, payload: undefined });
    };

    const subscribeProvider = async (provider: any) => {
        if (!provider.on) {
            return;
        }
        provider.on("disconnect", () => {
            onDisconnect();
        });
        provider.on("accountsChanged", async (accounts: string[]) => {
            dispatch({ type: Actions.SetAccount, payload: accounts[0] });
        });
        provider.on("chainChanged", async (hexChainId: string) => {
            const chainId = Web3.utils.hexToNumber(hexChainId ?? "");
            dispatch({ type: Actions.SetChain, payload: idToNetwork[chainId] });
        });
    };

    const onConnect = async () => {
        const provider = await web3Modal.connect();
        await subscribeProvider(provider);

        const newWeb3 = new Web3(provider);
        dispatch({ type: Actions.SetWeb3, payload: newWeb3 });

        const accounts = await newWeb3.eth.getAccounts();
        dispatch({ type: Actions.SetAccount, payload: accounts[0] });

        const chainId = await web3.eth.getChainId();
        dispatch({ type: Actions.SetChain, payload: idToNetwork[chainId] });
    };

    return (
        <div className="App">
            <Header onConnect={onConnect} onDisconnect={onDisconnect} />
            <Routes />
        </div>
    );
};

export default App;
