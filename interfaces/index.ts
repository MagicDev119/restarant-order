export type Product = {
  id: string;
  fields: {
    nomenclature_price: number;
    nomenclature_title: string;
    is_recomended: string;
    places: Array<string>;
    img: {
      url: string;
      thumbnails: {
        small: {
          url: string;
        };
        large: {
          url: string;
        };
        full: {
          url: string;
        };
      };
    }[];
    "Name (from nomenclature_category_id)": Array<string>;
    "Name (from places)": Array<string>;
  };
};

export type Cart = {
  id: string;
  imgUrl: string;
  count: number;
  price: number;
  title: string;
  "Name (from nomenclature_category_id)": string;
  "Name (from places)": string;
}