export type PublicConfig = {
  termsVersion: string;
  maxUploadBytesPerItem: number;
  maxItemsPerBatch: number;
  maxQuantityPerItem: number;
  canvasSizePx: number;
  finishDiameterRatio: number;
  safeAreaRatio: number;
  xShareText: string;
  xHashtags: string[];
};

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type OrderBatchCreatedItem = {
  itemCode: string;
  localProjectCode: string;
  quantity: number;
};

export type OrderBatchCreatedResponse = {
  receptionNumber: string;
  publicToken: string;
  status: string;
  totalItemTypes: number;
  totalQuantity: number;
  createdAt: string;
  expiresAt: null;
  publicUrl: string;
  items: OrderBatchCreatedItem[];
};

export type SessionUser = { username: string; displayName: string };

export type StaffOrderItem = {
  id: string;
  itemCode: string;
  localProjectCode: string;
  status: string;
  quantity: number;
  imageUrl: string;
  thumbnailUrl: string;
  widthPx: number;
  heightPx: number;
};

export type StaffOrderBatch = {
  unitPriceYen?: number | null;
  totalPriceYen?: number | null;
  id: string;
  receptionNumber: string;
  status: string;
  totalItemTypes: number;
  totalQuantity: number;
  ownershipConfirmed: boolean;
  portraitConfirmed: boolean;
  copyrightConfirmed: boolean;
  createdAt: string;
  items: StaffOrderItem[];
};
