export interface top4I {
    price: number;
    title: string;
    images: [string];
    _id: string
}

export interface filterI {
    brand: {clicked: boolean, name: string}[],
    priceLt: number,
    priceGt: number,
}

export interface ProductI {
    products: [],
    loading: boolean,
    error: string | undefined
}

export interface stateI {
    product: ProductI,
    user: {isLogged: string}
}

export interface singleProductI {
    title: string,
    price: number,
    description: string,
    images: string[],
    colors: string[]
}

export interface ProductItem {
    _id: string;
    category: string;
    createdAt: string;
    description: string;
    images: string[];
    colors: string[];
    price: number;
    title: string;
    updatedAt: string;
  }
