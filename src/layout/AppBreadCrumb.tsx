import type { AppBreadcrumbProps, Breadcrumb } from "../../types";
import { useLocation } from 'react-router-dom';
import { ObjectUtils } from "primereact/utils";
import React, { useEffect, useState } from "react";
import useStore from "./useStore";

const AppBreadcrumb = (props: AppBreadcrumbProps) => {
    const location = useLocation();
    const pathname = location.pathname;
    const [breadcrumb, setBreadcrumb] = useState<Breadcrumb | null>(null);
    const { breadcrumbs } = useStore().data;

    useEffect(() => {
        const filteredBreadcrumbs = breadcrumbs?.find((crumb: Breadcrumb) => {
            return crumb.to?.replace(/\/$/, "") === pathname.replace(/\/$/, "");
        });
        setBreadcrumb(filteredBreadcrumbs ?? null);
    }, [pathname, breadcrumbs]);

    return (
        <div className={props.className}>
            <nav className="layout-breadcrumb">
                <ol>
                    {ObjectUtils.isNotEmpty(breadcrumb) && pathname !== "/" ? (
                        breadcrumb?.labels?.map((label:any, index:any) => {
                            return (
                                <React.Fragment key={index}>
                                    {index !== 0 && (
                                        <li className="layout-breadcrumb-chevron">
                                            {" "}
                                            /{" "}
                                        </li>
                                    )}
                                    <li key={index}>{label}</li>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <>
                            {pathname === "/" && (
                                <li key={"home"}>Home</li>
                            )}
                            {pathname === "/dashboard-banking" && (
                                <li key={"banking"}>Banking Dashboard</li>
                            )}
                        </>
                    )}
                </ol>
            </nav>
        </div>
    );
};

export default AppBreadcrumb;
