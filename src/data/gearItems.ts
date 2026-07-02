import iphoneImg from '@/assets/gear/iphone_14_pro_max.webp';
import macbookImg from '@/assets/gear/macbook_pro_m4_pro.webp';
import airpodsImg from '@/assets/gear/airpods_pro_4.webp';
import amazfitImg from '@/assets/gear/amazfit_balance_2.webp';
import walletImg from '@/assets/gear/sennator_cullen_wayne.webp';
import powerbankImg from '@/assets/gear/anker_powercore.webp';
import hubImg from '@/assets/gear/basseus_6_in_1.webp';
import monitorImg from '@/assets/gear/battlestation/samsung_odyssey_g53f.webp';
import lightbarImg from '@/assets/gear/battlestation/monitor_light_bar.webp';
import keyboardImg from '@/assets/gear/battlestation/aula_f75.webp';
import mouseImg from '@/assets/gear/battlestation/pro_x_superlight_2.webp';
import mousepadImg from '@/assets/gear/battlestation/artisan_fx_zero.webp';
import cpuImg from '@/assets/gear/battlestation/ryzen_7_5700G.webp';
import gpuImg from '@/assets/gear/battlestation/geforce_rtx_5060_ti.webp';
import moboImg from '@/assets/gear/battlestation/b550m_aorus_pro_p.webp';
import ramImg from '@/assets/gear/battlestation/kingston_fury_beast.webp';
import storageImg from '@/assets/gear/battlestation/samsung_970_evo_plus.webp';
import caseImg from '@/assets/gear/battlestation/nzxt_h510.webp';
import coolerImg from '@/assets/gear/battlestation/thermalright_peerless_assassin.webp';
import psuImg from '@/assets/gear/battlestation/gigabyte_p750GM.webp';
import chairImg from '@/assets/gear/battlestation/musso_e600_pro.webp';

export type GearCategoryId = 'daily-carry' | 'battlestation';

export type GearImage = {
  /** Real asset path. Leave empty to render a labeled placeholder slot. */
  src?: string;
  alt: string;
};

export type GearItem = {
  /** Stable slug. Maps a data row to its shape in the desk illustrations. */
  id: string;
  name: string;
  /** Maker, shown in mono under the name. */
  brand?: string;
  category: GearCategoryId;
  /** Short mono spec line, e.g. "27" · curved VA". */
  spec?: string;
  /** A short, personal note — why it earns its place. Edit freely. */
  note: string;
  /** Optional buy/reference URL. When set, the card links out in a new tab. */
  source?: string;
  image: GearImage;
};

export type GearCategory = {
  id: GearCategoryId;
  label: string;
  blurb: string;
};

/** ISO date of the last meaningful edit. Drives the "Updated" line. */
export const gearUpdated = '2026-07-02';

export const gearIntro =
  'The tools I carry and the bench I build on — a working inventory, not a wishlist. Hover the desk to inspect a piece, or read the full kit below. A mix of personal preference, practicality, and the occasional indulgence.';

export const gearCategories: GearCategory[] = [
  {
    id: 'daily-carry',
    label: 'Daily Carry',
    blurb: 'What travels with me — pockets, wrist, and bag.',
  },
  {
    id: 'battlestation',
    label: 'Battlestation',
    blurb: 'The bench I build on — peripherals up top, the machine underneath.',
  },
];

export const gearItems: GearItem[] = [
  // ── Daily Carry ─────────────────────────────────────────────
  {
    id: 'iphone',
    name: 'iPhone 14 Pro Max',
    brand: 'Apple',
    category: 'daily-carry',
    spec: '6.7" · A16 Pro',
    note: "The one device I can't leave home without.",
    source: 'https://www.apple.com/ph/iphone/',
    image: { src: iphoneImg, alt: 'iPhone 14 Pro Max' },
  },
  {
    id: 'macbook',
    name: 'MacBook Pro',
    brand: 'Apple',
    category: 'daily-carry',
    spec: 'M4 Pro · 24GB memory · 1TB SSD',
    note: 'The half of the setup that follows me to the café.',
    source: 'https://www.apple.com/ph/macbook-pro/',
    image: { src: macbookImg, alt: 'MacBook Pro' },
  },
  {
    id: 'airpods',
    name: 'AirPods 4',
    brand: 'Apple',
    category: 'daily-carry',
    spec: 'USB-C · ANC',
    note: 'Audio for calls, music, and the occasional dive into the metaverse.',
    source: 'https://www.apple.com/ph/airpods-4/',
    image: { src: airpodsImg, alt: 'AirPods 4' },
  },
  {
    id: 'amazfit',
    name: 'Amazfit Balance 2',
    brand: 'Amazfit',
    category: 'daily-carry',
    spec: 'AMOLED · GPS',
    note: 'My all-around smartwatch.',
    source: 'https://www.amazfit.com/',
    image: { src: amazfitImg, alt: 'Amazfit Balance 2 watch' },
  },
  {
    id: 'wallet',
    name: 'Senator Wallet',
    brand: 'Cullen Wayne',
    category: 'daily-carry',
    spec: 'Leather · slim',
    note: 'The only wallet I’ve ever owned that doesn’t feel like a brick in my pocket.',
    source: 'https://www.cullenwayne.com/',
    image: { src: walletImg, alt: 'Cullen Wayne Senator leather wallet' },
  },
  {
    id: 'powerbank',
    name: 'PowerCore 30W Power Bank',
    brand: 'Anker',
    category: 'daily-carry',
    spec: '20,000mAh · 30W',
    note: 'Enough charge to outlast any airport, café, or dead outlet.',
    source: 'https://anker.ph/',
    image: { src: powerbankImg, alt: 'Anker PowerCore 20,000mAh 30W power bank' },
  },
  {
    id: 'hub',
    name: 'Metal Gleam II',
    brand: 'Baseus',
    category: 'daily-carry',
    spec: '6-in-1 · USB-C',
    note: 'Turns one MacBook port into every port I actually need.',
    source: 'https://baseusonline.com/product/1545/baseus-6-in-1-usb-c-hub-100w-pd-4k-hdmi-rj45',
    image: { src: hubImg, alt: 'Baseus Metal Gleam Series II 6-in-1 USB-C hub' },
  },

  // ── Battlestation · peripherals ─────────────────────────────
  {
    id: 'monitor',
    name: 'Odyssey G53F',
    brand: 'Samsung',
    category: 'battlestation',
    spec: '27" · flat',
    note: 'Editor, preview, and terminal.',
    source: 'https://www.samsung.com/ph/monitors/all-monitors/',
    image: { src: monitorImg, alt: 'Samsung Odyssey G53f monitor' },
  },
  {
    id: 'lightbar',
    name: 'Monitor Light Bar',
    brand: 'Xiaomi',
    category: 'battlestation',
    spec: 'Screen bar · no glare',
    note: 'Lights the desk, never the screen. Best late-night upgrade.',
    source: 'https://xiaomistoreph.com/products/mi-computer-monitor-light-bar',
    image: { src: lightbarImg, alt: 'Xiaomi monitor light bar' },
  },
  {
    id: 'keyboard',
    name: 'F75',
    brand: 'Aula',
    category: 'battlestation',
    spec: '75% · gasket',
    note: 'The keyboard I type on all day, every day.',
    source: 'https://aulagear.com/products/aula-f75',
    image: { src: keyboardImg, alt: 'Aula F75 mechanical keyboard' },
  },
  {
    id: 'mouse',
    name: 'G PRO X Superlight 2',
    brand: 'Logitech G',
    category: 'battlestation',
    spec: '60g · wireless',
    note: "So light I forget it's in my hand.",
    source: 'https://www.logitechg.com/en-ph/shop/p/pro-x2-superlight-wireless-mouse',
    image: { src: mouseImg, alt: 'Logitech G PRO X Superlight 2 mouse' },
  },
  {
    id: 'mousepad',
    name: 'Ninja FX Zero',
    brand: 'Artisan',
    category: 'battlestation',
    spec: 'XL · control',
    note: 'Overkill for spreadsheets, perfect for everything else.',
    source: 'https://artisan-jp.com/global/fx-zero',
    image: { src: mousepadImg, alt: 'Artisan Ninja FX Zero mousepad' },
  },

  // ── Battlestation · the machine ─────────────────────────────
  {
    id: 'cpu',
    name: 'Ryzen 7 5700G',
    brand: 'AMD',
    category: 'battlestation',
    spec: '8C / 16T · APU',
    note: 'Eight cores, with an iGPU as my safety net.',
    source: 'https://www.amd.com/en/products/processors/desktops/ryzen.html',
    image: { src: cpuImg, alt: 'AMD Ryzen 7 5700G processor' },
  },
  {
    id: 'gpu',
    name: 'GeForce RTX 5060 Ti',
    brand: 'NVIDIA',
    category: 'battlestation',
    spec: '16GB · Blackwell',
    note: '16GB — room for local models and easy 1440p.',
    source: 'https://www.nvidia.com/en-ph/geforce/graphics-cards/50-series/rtx-5060-family/',
    image: { src: gpuImg, alt: 'NVIDIA GeForce RTX 5060 Ti graphics card' },
  },
  {
    id: 'mobo',
    name: 'B550M Aorus Pro-P',
    brand: 'Gigabyte',
    category: 'battlestation',
    spec: 'AM4 · microATX',
    note: 'The motherboard that ties it all together.',
    source: 'https://www.gigabyte.com/ph/Motherboard',
    image: { src: moboImg, alt: 'Gigabyte B550M Aorus Pro-P motherboard' },
  },
  {
    id: 'ram',
    name: 'Fury Beast',
    brand: 'Kingston',
    category: 'battlestation',
    spec: '32GB · DDR4',
    note: 'Keeps my Docker stack and forty tabs from fighting.',
    source: 'https://www.kingston.com/en/memory',
    image: { src: ramImg, alt: 'Kingston Fury Beast DDR4 memory' },
  },
  {
    id: 'storage',
    name: '970 Evo Plus',
    brand: 'Samsung',
    category: 'battlestation',
    spec: 'NVMe · Gen3',
    note: 'The boot drive that keeps the system snappy and the OS happy.',
    source: 'https://www.samsung.com/us/memory-storage/all-memory-storage/',
    image: { src: storageImg, alt: 'Samsung 970 Evo Plus NVMe SSD' },
  },
  {
    id: 'case',
    name: 'H510',
    brand: 'NZXT',
    category: 'battlestation',
    spec: 'mid-tower · glass',
    note: 'The build looks as considered as it runs.',
    source: 'https://nzxt.com/en-intl',
    image: { src: caseImg, alt: 'NZXT H510 compact ATX mid-tower case' },
  },
  {
    id: 'cooler',
    name: 'Peerless Assassin',
    brand: 'Thermalright',
    category: 'battlestation',
    spec: 'dual-tower air',
    note: 'Punches above its price. No pump to ever worry about.',
    source: 'https://www.thermalright.com/',
    image: { src: coolerImg, alt: 'Thermalright Peerless Assassin CPU cooler' },
  },
  {
    id: 'psu',
    name: 'P750GM',
    brand: 'Gigabyte',
    category: 'battlestation',
    spec: '750W · 80+ Gold',
    note: 'The power supply that keeps the whole system running smoothly.',
    source: 'https://www.gigabyte.com/ph',
    image: { src: psuImg, alt: 'Gigabyte P750GM power supply' },
  },
  {
    id: 'chair',
    name: 'E600 Pro',
    brand: 'Musso',
    category: 'battlestation',
    spec: 'ergonomic · mesh',
    note: 'Real lumbar support — no regrets at hour eight.',
    source: 'https://www.musso.ph/',
    image: { src: chairImg, alt: 'Musso E600 Pro ergonomic chair' },
  },
];

/** Lookup helper used by the illustrations to resolve a hotspot id → item. */
export const gearById: Record<string, GearItem> = Object.fromEntries(gearItems.map((item) => [item.id, item]));

/** Items grouped in category order, for the reference grid. */
export const gearByCategory = gearCategories.map((category) => ({
  category,
  items: gearItems.filter((item) => item.category === category.id),
}));
