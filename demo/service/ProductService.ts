import type { Demo } from "../../types";


export const ProductService = {
    async getProductsSmall() {
        const res = await fetch("/utilis/demo/data/products-small.json", {
            headers: {"Cache-Control": "no-cache"},
        });
        const d = await res.json();
        return d.data as Demo.Product[];
    },
};
