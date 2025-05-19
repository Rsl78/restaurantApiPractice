import React, {useRef} from 'react';
import {classNames} from "primereact/utils";
import useStore from "../layout/useStore";
import AppSidebar from "./AppSidebar";
import AppTopbar from "./AppTopbar";
import AppBreadCrumb from "./AppBreadCrumb";
import {Outlet} from "react-router-dom";
import {AppTopbarRef} from "../../types";
import AppProfileSidebar from "./AppProfileSidebar";

const Layout = () => {

    const {
        layoutConfig,
        layoutState,
        setLayoutState,
    } = useStore().data;
    const sidebarRef = useRef<HTMLDivElement>(null);
    const topbarRef = useRef<AppTopbarRef>(null);


    let timeout: ReturnType<typeof setTimeout> | null = null;
    const onMouseEnter = () => {
        if (!layoutState.anchored) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            setLayoutState((prevLayoutState: any) => ({
                ...prevLayoutState,
                sidebarActive: true,
            }));
        }
    };

    const onMouseLeave = () => {
        if (!layoutState.anchored) {
            if (!timeout) {
                timeout = setTimeout(
                    () =>
                        setLayoutState((prevLayoutState: any) => ({
                            ...prevLayoutState,
                            sidebarActive: false,
                        })),
                    300
                );
            }
        }
    };


    const containerClass = classNames({
        "layout-light": layoutConfig.colorScheme === "light",
        "layout-dim": layoutConfig.colorScheme === "dim",
        "layout-dark": layoutConfig.colorScheme === "dark",
        "layout-colorscheme-menu": layoutConfig.menuTheme === "colorScheme",
        "layout-primarycolor-menu": layoutConfig.menuTheme === "primaryColor",
        "layout-transparent-menu": layoutConfig.menuTheme === "transparent",
        "layout-overlay": layoutConfig.menuMode === "overlay",
        "layout-static": layoutConfig.menuMode === "static",
        "layout-slim": layoutConfig.menuMode === "slim",
        "layout-slim-plus": layoutConfig.menuMode === "slim-plus",
        "layout-horizontal": layoutConfig.menuMode === "horizontal",
        "layout-reveal": layoutConfig.menuMode === "reveal",
        "layout-drawer": layoutConfig.menuMode === "drawer",
        "layout-static-inactive":
            layoutState.staticMenuDesktopInactive &&
            layoutConfig.menuMode === "static",
        "layout-overlay-active": layoutState.overlayMenuActive,
        "layout-mobile-active": layoutState.staticMenuMobileActive,
        "p-input-filled": layoutConfig.inputStyle === "filled",
        "p-ripple-disabled": !layoutConfig.ripple,
        "layout-sidebar-active": layoutState.sidebarActive,
        "layout-sidebar-anchored": layoutState.anchored,
    });

    return (
        <>
            <div className={classNames("layout-container", containerClass)}>
                <div
                    ref={sidebarRef}
                    className="layout-sidebar"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <AppSidebar/>
                </div>
                <div className="layout-content-wrapper">
                    <AppTopbar ref={topbarRef}/>

                    <AppBreadCrumb className="content-breadcrumb"></AppBreadCrumb>
                    <div className="layout-content">
                        <Outlet/>
                    </div>

                </div>
                <AppProfileSidebar/>
                <div className="layout-mask"></div>
            </div>
        </>
    );
};

export default Layout;