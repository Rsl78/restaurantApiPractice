import { Sidebar } from "primereact/sidebar";
import useStore from "./useStore";

const AppProfileSidebar = () => {

    const {
        layoutState,
        setLayoutState,
    } = useStore().data;

    const onProfileSidebarHide = () => {
        setLayoutState((prevState:any) => ({
            ...prevState,
            profileSidebarVisible: false,
        }));
    };

    return (
        <Sidebar
            visible={layoutState.profileSidebarVisible}
            onHide={onProfileSidebarHide}
            position="right"
            className="layout-profile-sidebar w-full sm:w-25rem"
        >
            <div className="flex flex-column mx-auto md:mx-0">
                <span className="mb-2 font-semibold">Welcome</span>
                <span className="text-color-secondary font-medium mb-5">
                    Isabella Andolini
                </span>

                <ul className="list-none m-0 p-0">
                    <li>
                        <div className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                            <span>
                                <i className="pi pi-user text-xl text-primary"></i>
                            </span>
                            <div className="ml-3">
                                <span className="mb-2 font-semibold">
                                    Profile
                                </span>
                                <p className="text-color-secondary m-0">
                                    Lorem ipsum date visale
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                            <span>
                                <i className="pi pi-power-off text-xl text-primary"></i>
                            </span>
                            <div className="ml-3">
                                <span className="mb-2 font-semibold">
                                    Sign Out
                                </span>
                                <p className="text-color-secondary m-0">
                                    Sed ut perspiciatis
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Sidebar>
    );
};

export default AppProfileSidebar;
