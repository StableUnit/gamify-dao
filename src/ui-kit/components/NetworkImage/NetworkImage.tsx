import React from "react";
import DefaultImage from "../../images/default.png";
import EthImage from "../../images/network/Eth.svg";
import RinkebyImage from "../../images/network/Rinkeby.svg";
import PolygonImage from "../../images/network/Polygon.svg";
import FantomImage from "../../images/network/Fantom.svg";
import BscImage from "../../images/network/BSC.svg";
import AvalancheImage from "../../images/network/Avalanche.svg";
import AuroraImage from "../../images/network/Aurora.png";
import HarmonyImage from "../../images/network/Harmony.svg";

export type NetworkType = "eth" | "rinkeby" | "polygon" | "bsc" | "fantom" | "avalanche" | string;

interface NetworkImageProps {
    network?: NetworkType;
    width?: number;
    height?: number;
}

const getNetworkImage = (network?: NetworkType) => {
    switch (network?.toLowerCase()) {
        case "eth":
            return EthImage;
        case "rinkeby":
            return RinkebyImage;
        case "polygon":
            return PolygonImage;
        case "fantom":
            return FantomImage;
        case "bsc":
            return BscImage;
        case "avalanche":
            return AvalancheImage;
        case "aurora":
            return AuroraImage;
        case "harmony":
            return HarmonyImage;
        default:
            return DefaultImage;
    }
};

export const NetworkImage = ({ network, width = 32, height = 32 }: NetworkImageProps) => (
    <img src={getNetworkImage(network)} width={width} height={height} alt={network} />
);
