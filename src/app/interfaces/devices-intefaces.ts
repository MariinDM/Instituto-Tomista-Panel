export interface ControllerVersion{
  id: number,
  previous_version_id: number,
  description: string,
  numeric_value: number,
  version: string,
  created_at: string,
  updated_at: string,
}

export interface HardwareVersion{
  id: number,
  previous_version_id: number,
  description: string,
  numeric_value: number,
  version: string,
  created_at: string,
  updated_at: string,
}

export interface Necessitie{
  id:number,
  code:string,
  description:string,
  name:string,
}

export interface DeviceType{
  id:number,
  code:string,
  description:string,
  name:string,
}

export interface DeviceVersion{
  id:number,
  code:string,
  description:string,
  name:string,
}

export interface DeviceCalibration{
  id:number,
  devices_id:number,
  default:string,
  max:string,
  min:string,
  name:string,
  value:string,
}

export interface Model{
  id:number,
  device_version_id:number,
  device_type_id:number,
  hardware_version_id:number,
  name:string,
  created_at:string,
  updated_at:string,
}

export interface ModelNecessities{
  id:number,
  models_id:number,
  necessities_id:number,
  active:boolean,
}

export interface FirmwareVersion{
  id: number,
  previous_version_id: number,
  model_id:number,
  description: string,
  version: string,
  created_at: string,
  updated_at: string,
}

export interface Device{
  id:number,
  controller_version_id:number,
  firmware_version_id:number,
  model_id:number,
  active:boolean,
  password:number,
  restarts:number,
  serial:number,
  token:string,
  comments:string,
  ip:string,
  lan:string,
  created_at:string,
  updated_at:string,
}
