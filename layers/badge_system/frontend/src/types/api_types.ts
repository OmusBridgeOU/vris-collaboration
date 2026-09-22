export type PublicConfig = {
  termsVersion: string;
  maxUploadBytesPerItem: number;
  maxItemsPerBatch: number;
  maxQuantityPerItem: number;
  unitPriceYen: number | null;
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

export type SessionUser = {
  id: string;
  username: string;
  displayName: string;
  roles: string[];
  authMode?: "shared_basic" | "session";
};

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
  expiresAt: null;
  acceptedAt: string | null;
  productionStartedAt: string | null;
  readyAt: string | null;
  deliveredAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  items: StaffOrderItem[];
};

export type StaffOrderBatchList = {
  orderBatches: StaffOrderBatch[];
};
