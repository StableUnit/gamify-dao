import React from "react";
import cn from "classnames";

import "./GradientHref.scss";
import { NavLink } from "react-router-dom";

interface GradientBorderProps {
    className?: string;
    target?: string;
    disabled?: boolean;
    inline?: boolean;
    href?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const GradientHref = ({ children, className, target, disabled, href, onClick, inline }: GradientBorderProps) => {
    return href ? (
        <NavLink
            onClick={onClick}
            to={href}
            target={target}
            rel="noreferrer"
            className={cn("gradient-href", className, {
                "gradient-href--disabled": disabled,
                "gradient-href--inline": inline,
            })}
        >
            {/* @ts-ignore */}
            {children}
        </NavLink>
    ) : (
        <div
            className={cn("gradient-href gradient-href-text", className, {
                "gradient-href--disabled": disabled,
                "gradient-href--inline": inline,
            })}
        >
            {children}
        </div>
    );
};

export default GradientHref;
