import React, { HTMLAttributes, ReactNode, useEffect, useState, useRef } from 'react';
import { findAll, FoundChildren, FoundChild, getComponents } from '../../util/findAll';
import "./Drawer.css";

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Option } from '../Option/Option';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** 
     * Type of drawer that will be used. `absolute` assumes the drawer is in front of everything and 
     * will use a backdrop. `persistent` will have a relative width and can push other elements to 
     * the side on expansion.`permanent` Just an element with its own overflow.
     */
    type?: "absolute" | "persistent" | "permanent";
    /** 
     * When `type="absolute"`, the values `"left"`, `"right"`, `"bottom"`, and `"top"` determine the anchoring
     * point for the drawer. When `type="persistent"` OR `type="permanent"`, the values will determine where the
     * border separating the content will appear
     */
    orientation?: "left" | "right" | "top" | "bottom" | "vertical" | "horizontal";
    /** Executes a method when the **open** prop is going from `true` to `false` */
    onClose?: () => void;
    /** Determines the time in milliseconds it will take to open/close, won't do anything when `permanent` */
    transition?: number;
    /** Method that changes **open** variable */
    toggleOpen?: () => any;
    /** Determines whether the drawer is visible or not, won't do anything when `permanent` */
    open?: boolean;
    /** Determines to what height or width the drawer will extend to */
    dimension?: string | number;
}

/**
 * A drawer represents a container that slides out or stationary to an anchored area of a 
 * page. An anchor can be left, right, top, or bottom.
 */
export const Drawer = ({
        children,
        className,
        type = "absolute", 
        orientation = "left",
        open = false,
        transition = 300,
        dimension = 300,
        onClose,
        toggleOpen,
        style,
        ...props
    }: Props) => {
    // ref
    const drawer = useRef<HTMLDivElement>(null);

    // state variables
    const [display, toggleDisplay] = useState(type === "permanent" || open);
    const [effect, toggleEffect] = useState(type === "permanent" || open);
    const [modifiedDimension, setModifiedDimension] = useState("width");

    // make a useEffect to determine what transition will be used, acts as on init
    useEffect(() => {
        if (orientation === "bottom" || orientation === "top") {
            setModifiedDimension("height");
        } else {
            setModifiedDimension("width");
        }
    }, [orientation])
    
    // toggle a useEffect that focses on the display element
    useEffect(() => {
        // check whenever display and open are out of sync
        if (open !== display) {
            if (display) {
                // not open, it nee
                toggleEffect(false);
                setTimeout(() => toggleDisplay(false), transition + 100);
                onClose && onClose();
            } else {
                toggleDisplay(true);
                setTimeout(() => toggleEffect(true), 100);
            }
        }
    }, [open]);

    /**
     * Finds all target components and renders them in final drawer component
     * 
     * @returns render ready drawer component
     */
    const renderDrawer = (): ReactNode => {
        // gets all found children
        const components: FoundChildren = findAll(children, [Header, Footer, Option]);
        const Headers: FoundChild[] = components.Header;
        const Footers: FoundChild[] = components.Footer;

        // check that there is only one header and footer max
        if (Headers.length > 1) throw new Error("Drawer can only have one Header component");
        if (Footers.length > 1) throw new Error("Drawer can only have one Footer component");

        // if the header and/or footer exists, make sure to get them both
        // get the header/footer if it exists and assign it into a variable
        const header: ReactNode = 
            components.Header.length > 0 ? (
                <Header 
                    {...components.Header[0].component.props} 
                    style={{marginBottom: 10, ...components.Header[0].component.props.style}}
                />
            ) : null;
        const footer: ReactNode = 
            components.Footer.length > 0 ? (
                <Footer 
                    {...components.Footer[0].component.props} 
                    style={{marginTop: 10, ...components.Footer[0].component.props.style}}
                />
            ) : null;

        // format options
        const formattedOptions: FoundChild[] = formatOptions(components.Option);

        // create a FoundChildren object to represent all other components
        const otherComponents: FoundChildren = {
            Option: formattedOptions,
            other: components.other
        }

        // get all other components and store in variable
        const otherChildren: ReactNode[] = getComponents(otherComponents);
        const containerStyle = {
            [orientation]: 0,
            [modifiedDimension]: type === "permanent" || effect ? dimension : 0,
            transition: `${modifiedDimension} ${transition}ms`,
            ...style
        }

        const drawerStyle = {
            [modifiedDimension]: dimension,
            ...style
        }

        return (
            <div 
                className={`apollo-component-library-drawer-component ${className} ${orientation} ${type}`}
                style={containerStyle}
            >
                <div 
                    {...props} 
                    ref={drawer}
                    style={drawerStyle}
                >
                    {header}
                    <div className="apollo-component-library-drawer-component-body">
                        {otherChildren}
                    </div>
                    {footer}
                </div>
            </div>
        )
    }

    /**
     * Changes style of options to match
     */
    const formatOptions = (options: FoundChild[]): FoundChild[] => {
        return options?.map((option: FoundChild) => {
            // abstract component from option
            const component = option.component;

            // extract specific props to get new props
            const { style, children, ...optionProps } = component.props;
            return {
                component: (
                    <Option 
                        key={Math.random()}
                        {...optionProps}
                        style={{height: "2rem", display: "flex", alignItems: "center",...style}}
                    >
                        {children}
                    </Option>
                ),
                index: option.index
            }
        })
    }

    return (
        <React.Fragment>
            {
                type === "permanent"|| display ? (
                    <div className={`apollo-component-library-drawer-component-container ${type}`}>
                        <div>
                            { renderDrawer() }
                            {
                                type === "absolute" ? (
                                    <div 
                                        onClick={toggleOpen}
                                        className={`apollo-component-library-drawer-component-backdrop ${type}`} 
                                        style={{opacity: effect ? 1 : 0}}
                                    />
                                ) : null
                            }
                        </div>
                    </div>
                ) : null
            }
        </React.Fragment>
    )
}