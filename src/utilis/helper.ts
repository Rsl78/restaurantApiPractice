import {Toast} from "primereact/toast";


export default function callToast(
    toast: React.RefObject<Toast | null>,
    type: boolean | string,
    msg: string,
    life: number = 3000
) {
    if (toast?.current) {
        toast?.current?.show({
            severity: type === "warn" ? "warn" : type ? "success" : "error",
            summary: type === "warn" ? "Warning" : type ? "Successful" : "Error",
            detail: msg,
            life: life,
        });
    }
}
