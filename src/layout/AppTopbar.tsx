import type {AppTopbarRef} from "../../types";
import {forwardRef, useImperativeHandle, useRef} from "react";
import AppBreadcrumb from "./AppBreadCrumb";
import useStore from "./useStore";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { onMenuToggle } =
        useStore().data;
    const menubuttonRef = useRef(null);
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
    }));

    return (
        <div className="layout-topbar">
            <div className="topbar-start">
                <button
                    ref={menubuttonRef}
                    type="button"
                    className="topbar-menubutton p-link p-trigger"
                    onClick={onMenuToggle}
                >
                    <i className="pi pi-bars"></i>
                </button>
                <AppBreadcrumb className="topbar-breadcrumb"></AppBreadcrumb>
            </div>
        </div>
    );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
