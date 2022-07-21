export interface Dealer{
  id:number,
  regions_id:number,
  active:boolean,
  legal_id:string,
  name:string,
  created_at:string,
  updated_at:string
}

export interface Client{
  id:number,
  dealers_id:number,
  users_id:number,
  active:boolean,
  name:string,
  legal_id:string,
  created_at:string,
  updated_at:string
}

export interface Region{
  id:number,
  code:string,
  description:string,
  name:string
}

export interface Sale{
  id:number,
  dealers_id:number,
  date:string,
  warranty_date:string,
  comments:string,
  shipping_date:string,
  created_at:string,
  updated_at:string
}

export interface DealerUser{
  id:number,
  dealers_id:number,
  users_id:number,
  created_at:string,
  updated_at:string
}

export interface SaleDevice{
  id:number,
  devices_id:number,
  sales_id:number
}

export interface SaleDeviceClient{
  id:number,
  clients_id:number,
  sales_devices_id:number,
  created_at:string,
  updated_at:string
}
