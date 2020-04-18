export interface IPickupLocation {
  id: string;
  name: string;
  location_code: string;
  short_address: string;
  distance_from_location: string;
  address: {
    id: string;
    attributes: string[];
    business_name: null;
    address_line_1: string;
    address_line_2: null;
    zip_code: string;
    address_type: string;
    note: null;
    city: string;
    state: string;
    lat: number;
    lon: number;
    structured_address: [string, string];
    location: string;
    delivery_instruction: null;
  };
  warehouse: {
    id: string;
    name: string;
    slug: string;
    logo: {
      url: string;
      alt: string;
      responsive: any[];
      sizes: any[];
    };
    background_color: string;
  };
  select_warehouse_location: {
    type: string;
    data: {
      params: any[];
      tracking_params: any;
      tracking_event_names: any;
      title: null;
    };
  };
  badge: null;
  tracking_params: { warehouse_location_id: number; source2: number };
}

export interface IFilteredPickupLocation {
  locationId: string;
  name: string;
  urlSlug: string;
  address: {
    streetOne: string;
    streetTwo: null;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
}
