export interface ExploitData {
  _id: string;
  title: string;
  version: string;
  updatedDate: string;
  uncStatus: boolean;
  free: boolean;
  detected: boolean;
  rbxversion: string;
  updateStatus: boolean;
  websitelink: string;
  discordlink: string;
  beta: boolean;
  platform: string;
  extype: string;
  roleId: string;
  index: number;
  elementCertified?: boolean;
  decompiler?: boolean;
  multiInject?: boolean;
  suncPercentage?: number;
  uncPercentage?: number;
  sunc?: {
    suncScrap: string;
    suncKey: string;
  };
  recommendedReason?: {
    features: string[];
  };
  clientmods?: boolean;
  unlinked?: boolean;
  purchaselink?: string;
  keysystem?: boolean;
  cost?: string;
}

export interface CardData {
  id: string;
  name: string;
  platform: string;
  version: string;
  last_update: string;
  cost: string;
  status: string;
  updateStatus: boolean;
  detected: boolean;
  free: boolean;
}

export interface DetailData extends CardData {
  description?: string;
  developer?: string;
  websitelink?: string;
  discordlink?: string;
  purchaselink?: string;
  uncPercentage?: number;
  suncPercentage?: number;
  decompiler?: boolean;
  multiInject?: boolean;
  keysystem?: boolean;
  elementCertified?: boolean;
  extype?: string;
  rbxversion?: string;
}

export interface RobloxVersions {
  Windows: string;
  WindowsDate: string;
  Mac: string;
  MacDate: string;
  Android: string;
  AndroidDate: string;
  iOS: string;
  iOSDate: string;
}

export type Platform = 'windows' | 'android' | 'mac' | 'ios' | 'all';