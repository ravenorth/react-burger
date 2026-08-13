import type { TOrder } from './types.ts';

const NOW = Date.now();

const minutesAgo = (minutes: number): string =>
  new Date(NOW - minutes * 60_000).toISOString();

const BUN_R2_D3 = '692889f16bf770001bfeb4cd';
const BUN_KRATOR = '692889f16bf770001bfeb4cc';
const MEAT_MAGNOLIA = '692889f16bf770001bfeb4d1';
const MEAT_METEOR = '692889f16bf770001bfeb4d0';
const MEAT_MOLLUSK = '692889f16bf770001bfeb4cf';
const MEAT_FILLET = '692889f16bf770001bfeb4ce';
const MEAT_KOLTSA = '692889f16bf770001bfeb4d6';
const MEAT_PLODY = '692889f16bf770001bfeb4d7';
const MEAT_KRISTALL = '692889f16bf770001bfeb4d8';
const MEAT_SYR = '692889f16bf770001bfeb4da';
const SAUCE_SPICY = '692889f16bf770001bfeb4d2';
const SAUCE_SPACE = '692889f16bf770001bfeb4d3';
const SAUCE_GALACTIC = '692889f16bf770001bfeb4d4';
const SAUCE_ANTAR = '692889f16bf770001bfeb4d5';

type TMockOrder = {
  _id: string;
  number: number;
  name: string;
  status: TOrder['status'];
  ingredients: string[];
  createdAtMinutesAgo: number;
};

const MOCK_ORDERS_SOURCE: TMockOrder[] = [
  {
    _id: '64581d23a3e2c4001b4c1b01',
    number: 34533,
    name: 'Краторный астероидный бургер',
    status: 'done',
    ingredients: [BUN_KRATOR, MEAT_METEOR, MEAT_MAGNOLIA, SAUCE_SPICY, BUN_KRATOR],
    createdAtMinutesAgo: 24,
  },
  {
    _id: '64581d23a3e2c4001b4c1b02',
    number: 34532,
    name: 'Флюоресцентный люминесцентный бургер',
    status: 'done',
    ingredients: [BUN_R2_D3, MEAT_FILLET, SAUCE_SPACE, BUN_R2_D3],
    createdAtMinutesAgo: 47,
  },
  {
    _id: '64581d23a3e2c4001b4c1b03',
    number: 34531,
    name: 'Сырный метеоритный бургер',
    status: 'pending',
    ingredients: [BUN_R2_D3, MEAT_METEOR, MEAT_SYR, SAUCE_GALACTIC, BUN_R2_D3],
    createdAtMinutesAgo: 61,
  },
  {
    _id: '64581d23a3e2c4001b4c1b04',
    number: 34530,
    name: 'Моллюсковый космический бургер',
    status: 'done',
    ingredients: [BUN_KRATOR, MEAT_MOLLUSK, MEAT_PLODY, SAUCE_ANTAR, BUN_KRATOR],
    createdAtMinutesAgo: 96,
  },
  {
    _id: '64581d23a3e2c4001b4c1b05',
    number: 34529,
    name: 'Люминесцентный минеральный бургер',
    status: 'done',
    ingredients: [
      BUN_R2_D3,
      MEAT_KOLTSA,
      MEAT_FILLET,
      MEAT_KRISTALL,
      SAUCE_SPACE,
      BUN_R2_D3,
    ],
    createdAtMinutesAgo: 133,
  },
  {
    _id: '64581d23a3e2c4001b4c1b06',
    number: 34528,
    name: 'Краторный метеоритный бургер',
    status: 'created',
    ingredients: [BUN_KRATOR, MEAT_METEOR, MEAT_MAGNOLIA, SAUCE_SPICY, BUN_KRATOR],
    createdAtMinutesAgo: 158,
  },
  {
    _id: '64581d23a3e2c4001b4c1b07',
    number: 34527,
    name: 'Астероидный сырный бургер',
    status: 'done',
    ingredients: [BUN_KRATOR, MEAT_METEOR, MEAT_SYR, SAUCE_GALACTIC, BUN_KRATOR],
    createdAtMinutesAgo: 224,
  },
  {
    _id: '64581d23a3e2c4001b4c1b08',
    number: 34526,
    name: 'Флюоресцентный плодовый бургер',
    status: 'pending',
    ingredients: [BUN_R2_D3, MEAT_PLODY, MEAT_KRISTALL, SAUCE_ANTAR, BUN_R2_D3],
    createdAtMinutesAgo: 281,
  },
  {
    _id: '64581d23a3e2c4001b4c1b09',
    number: 34525,
    name: 'Марсианский магнолиевый бургер',
    status: 'done',
    ingredients: [BUN_R2_D3, MEAT_MAGNOLIA, SAUCE_SPACE, BUN_R2_D3],
    createdAtMinutesAgo: 326,
  },
  {
    _id: '64581d23a3e2c4001b4c1b0a',
    number: 34524,
    name: 'Краторный космический бургер',
    status: 'done',
    ingredients: [BUN_KRATOR, MEAT_MOLLUSK, MEAT_FILLET, SAUCE_SPICY, BUN_KRATOR],
    createdAtMinutesAgo: 372,
  },
  {
    _id: '64581d23a3e2c4001b4c1b0b',
    number: 34523,
    name: 'Метеоритный люминесцентный бургер',
    status: 'created',
    ingredients: [BUN_R2_D3, MEAT_METEOR, MEAT_KOLTSA, SAUCE_GALACTIC, BUN_R2_D3],
    createdAtMinutesAgo: 1680,
  },
  {
    _id: '64581d23a3e2c4001b4c1b0c',
    number: 34522,
    name: 'Плодовый моллюсковый бургер',
    status: 'done',
    ingredients: [BUN_KRATOR, MEAT_PLODY, MEAT_MOLLUSK, SAUCE_ANTAR, BUN_KRATOR],
    createdAtMinutesAgo: 1745,
  },
  {
    _id: '64581d23a3e2c4001b4c1b0d',
    number: 34521,
    name: 'Сырный минеральный бургер',
    status: 'done',
    ingredients: [BUN_R2_D3, MEAT_KOLTSA, MEAT_SYR, SAUCE_SPACE, BUN_R2_D3],
    createdAtMinutesAgo: 2890,
  },
];

export const MOCK_ORDERS: TOrder[] = MOCK_ORDERS_SOURCE.map(
  ({ createdAtMinutesAgo, ...order }) => ({
    ...order,
    createdAt: minutesAgo(createdAtMinutesAgo),
    updatedAt: minutesAgo(createdAtMinutesAgo),
  })
);

export const MOCK_FEED_STATS = {
  total: 5302,
  today: 138,
};
