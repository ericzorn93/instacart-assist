export interface IRetailer {
  id: string;
  name: string;
  slug: string;
  logo: {
    url: string;
    alt: string;
    responsive: {
      template: string;
      defaults: {
        width: number;
      };
    };
    sizes: any[];
  };
  background_color: string;
  attributes: string[];
  green_badge: null;
  services: ['delivery', 'pickup'];
  price_transparency: {
    label: string;
    color: string;
    kind: string;
    description: string;
  };
  categories: string;
  categories_formatted_text: {
    strings: [
      {
        value: string;
        attributes: any[];
      },
      {
        value: string;
        attributes: [];
      },
      {
        value: string;
        attributes: any[];
      },
      {
        value: string;
        attributes: [];
      },
      {
        value: string;
        attributes: any[];
      }
    ];
    action: null;
    alt: null;
  };
  hero_image: {
    url: string;
    alt: string;
    responsive: {
      template: string;
      defaults: {
        width: number;
        quality: number;
      };
    };
    sizes: any[];
  };
  retailer_type: string;
  wind_down_container_path: null;
}

export interface IFilteredRetailer {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  services: ['delivery', 'pickup'];
  categories: string[];
  retailerGenre: string;
}
