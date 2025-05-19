import type {MenuModel} from "../../types";
import AppSubMenu from "./AppSubMenu";

const AppMenu = () => {
    const model: MenuModel[] = [
        {
            label: "Dashboards",
            icon: "pi pi-home",
            items: [
                {
                    label: "Home",
                    icon: "pi pi-fw pi-home",
                    to: "/",
                },
                {
                    label: "Orders",
                    icon: "pi pi-fw pi-shopping-cart",
                    to: "/order",
                },
            ],
        },
    ];

    return <AppSubMenu model={model}/>;
};

export default AppMenu;
