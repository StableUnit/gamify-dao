const RINKEBY = {
    NAME: "rinkeby",

    OWNER: "0xe1DF4a122a7cA8Ed8617aDe4dd8532A1c1C3606a",
    MOCK_ERC20: "0xDA8B736f3A6240A5f3c7A69044F326642f3d9B68"
}

export {RINKEBY};

export function getDeployedAddresses(network: string): typeof RINKEBY {
    let NETWORK = {} as typeof RINKEBY;
    if (network == RINKEBY.NAME) NETWORK = RINKEBY; else
        throw `getDeployedAddresses error: unknown network ${network}`;
    return NETWORK;
}
