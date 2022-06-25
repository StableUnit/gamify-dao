import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { getShortAddress } from "../../utils/wallet";

import "./Header.scss";
import { StateContext } from "../../reducer/constants";
import GradientHref from "../../ui-kit/components/GradientHref/GradientHref";

interface NavbarProps {
    onConnect: () => void;
    onDisconnect: () => void;
}

type LinkType = {
    href: string;
    text: string;
};

const LINKS: LinkType[] = [
    {
        href: "/",
        text: "Home",
    },
    {
        href: "/add-task",
        text: "Add task",
    },
    {
        href: "/job",
        text: "Job",
    },
    {
        href: "/tasks-information",
        text: "Tasks Info",
    },
    {
        href: "/verification",
        text: "Verification",
    },
];

const Header = ({ onConnect, onDisconnect }: NavbarProps) => {
    const { account } = useContext(StateContext);
    const location = useLocation();

    return (
        <div className="header">
            <div className="header__logo">
                <a href="https://stableunit.org/" target="_blank" rel="noreferrer">
                    <img src="https://stableunit.org/assets/img/logo.svg" />
                </a>
            </div>
            <div className="header__content">
                <div className="header__links">
                    {LINKS.map(({ href, text }) => (
                        <GradientHref href={href} disabled={location.pathname === href}>
                            {text}
                        </GradientHref>
                    ))}
                </div>
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
