import React, { useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FormControl, MenuItem, Select } from "@mui/material";

import Web3 from "web3";
import { getShortAddress } from "../../utils/wallet";

import "./Header.scss";
import { StateContext } from "../../reducer/constants";
import GradientHref from "../../ui-kit/components/GradientHref/GradientHref";
import { changeNetworkAtMetamask, idToNetwork, networkNames } from "../../utils/network";
import { NetworkImage } from "../../ui-kit/components/NetworkImage/NetworkImage";
import { ReactComponent as ArrowDownIcon } from "../../ui-kit/images/arrow-down.svg";

interface NavbarProps {
    onConnect: () => void;
    onDisconnect: () => void;
}

type LinkType = {
    href: string;
    text: string;
};

const LINKS: LinkType[] = [
    // {
    //     href: "/",
    //     text: "Home",
    // },
    {
        href: "/create-task",
        text: "Create task",
    },
    {
        href: "/my-tasks",
        text: "My tasks",
    },
    {
        href: "/all-tasks",
        text: "All tasks",
    },
    {
        href: "/verification",
        text: "Task verification",
    },
];

const Header = ({ onConnect, onDisconnect }: NavbarProps) => {
    const { account, chain } = useContext(StateContext);

    const location = useLocation();

    const handleNetworkChange = useCallback((event) => {
        changeNetworkAtMetamask(event.target.value);
    }, []);

    return (
        <div className="header">
            <div className="header__section">
                <div className="header__logo">
                    <a href="https://stableunit.org/" target="_blank" rel="noreferrer">
                        <img src="https://stableunit.org/assets/img/logo.svg" />
                    </a>
                </div>
                <div className="header__userInfo">
                    <div>LVL: 1</div>
                    <div>XP: 10/100</div>
                </div>
            </div>

            <div className="header__section">
                <div className="header__links">
                    {LINKS.map(({ href, text }) => (
                        <GradientHref key={text} href={href} disabled={location.pathname === href}>
                            {text}
                        </GradientHref>
                    ))}
                </div>
                <FormControl className="header__network-form">
                    <Select
                        value={chain || "placeholder-value"}
                        onChange={handleNetworkChange}
                        inputProps={{ "aria-label": "Without label" }}
                        IconComponent={ArrowDownIcon}
                        MenuProps={{ classes: { paper: "header__paper", list: "header__list" } }}
                    >
                        <MenuItem disabled value="placeholder-value">
                            <NetworkImage />
                            Select network
                        </MenuItem>
                        {Object.entries(networkNames).map(([id, name]) => (
                            <MenuItem key={id} value={id}>
                                <NetworkImage network={id} />
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="header__navbar">
                    {account ? (
                        <div className="header__address" onClick={onDisconnect}>
                            {getShortAddress(account)}
                        </div>
                    ) : (
                        <div className="header__button" onClick={onConnect}>
                            Connect wallet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
