import type { StaffOrderBatch } from "../types/api_types";
export const staff_order_fixture: StaffOrderBatch = {
  id: "11111111-1111-1111-1111-111111111111",
  receptionNumber: "48317",
  status: "UPLOADED",
  totalItemTypes: 2,
  totalQuantity: 3,
  unitPriceYen: 500,
  totalPriceYen: 1500,
  ownershipConfirmed: true,
  portraitConfirmed: true,
  copyrightConfirmed: true,
  createdAt: "2026-06-22T10:00:00+09:00",
  expiresAt: null,
  acceptedAt: null,
  productionStartedAt: null,
  readyAt: null,
  deliveredAt: null,
  rejectedAt: null,
  rejectionReason: null,
  items: [
    {
      id: "22222222-2222-2222-2222-222222222222",
      itemCode: "48317-01",
      localProjectCode: "B-001",
      status: "UPLOADED",
      quantity: 1,
      imageUrl:
        "/api/staff/order-items/22222222-2222-2222-2222-222222222222/print-image",
      thumbnailUrl:
        "/api/staff/order-items/22222222-2222-2222-2222-222222222222/thumbnail",
      widthPx: 1200,
      heightPx: 1200,
    },
    {
      id: "33333333-3333-3333-3333-333333333333",
      itemCode: "48317-02",
      localProjectCode: "B-002",
      status: "UPLOADED",
      quantity: 2,
      imageUrl:
        "/api/staff/order-items/33333333-3333-3333-3333-333333333333/print-image",
      thumbnailUrl:
        "/api/staff/order-items/33333333-3333-3333-3333-333333333333/thumbnail",
      widthPx: 1200,
      heightPx: 1200,
    },
  ],
};
