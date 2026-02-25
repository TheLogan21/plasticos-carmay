export interface ProductItem {
  name: string;
  details: string;
  measurements?: string[];
}

export interface ProductCategory {
  id: string;
  category: string;
  imageSrc: string;
  description: string;
  products: ProductItem[];
}
