import type {
  Privilege,
  RentalListing,
  Session,
  ActivityItem,
  UserStats,
} from "./types";

export const privileges: Privilege[] = [
  {
    id: "priv-1",
    name: "Elite Rank Badge",
    game: "Mythic Realm",
    type: "rank",
    description:
      "Top 1% competitive rank granting access to elite matchmaking pools and exclusive tournaments.",
    rarity: "legendary",
  },
  {
    id: "priv-2",
    name: "Legendary Sword Buff",
    game: "Mythic Realm",
    type: "buff",
    description:
      "+45% damage boost from the Sword of Aeons legendary achievement.",
    rarity: "legendary",
  },
  {
    id: "priv-3",
    name: "Tournament Access",
    game: "Arena Champions",
    type: "access",
    description:
      "Entry pass to the $50k weekend tournament series. Requires Diamond rank SBT.",
    rarity: "epic",
  },
  {
    id: "priv-4",
    name: "Raid Entry Key",
    game: "Mythic Realm",
    type: "access",
    description:
      "Access to the Abyssal Fortress raid instance. Legendary-tier dungeon.",
    rarity: "epic",
  },
  {
    id: "priv-5",
    name: "Guild Council Vote",
    game: "Realm Governance",
    type: "governance",
    description:
      "Temporary voting rights in the Phoenix Guild council decisions.",
    rarity: "rare",
  },
  {
    id: "priv-6",
    name: "VIP Lobby Access",
    game: "Arena Champions",
    type: "access",
    description:
      "Access to VIP matchmaking lobbies with reduced queue times and premium servers.",
    rarity: "rare",
  },
  {
    id: "priv-7",
    name: "Legendary Mount Speed",
    game: "Mythic Realm",
    type: "buff",
    description:
      "2x mount speed from the Shadowflame Drake legendary achievement.",
    rarity: "epic",
  },
  {
    id: "priv-8",
    name: "Prestige Skin Access",
    game: "Arena Champions",
    type: "rank",
    description:
      "Unlock prestige-tier cosmetic skins. Only available to Season 1 veterans.",
    rarity: "common",
  },
];

export const rentalListings: RentalListing[] = [
  {
    id: "list-1",
    privilege: privileges[0],
    lender: "Player#7721",
    price: 0.5,
    currency: "SOL",
    duration: "3 hours",
    durationHours: 3,
    isActive: true,
  },
  {
    id: "list-2",
    privilege: privileges[2],
    lender: "Player#3391",
    price: 0.8,
    currency: "SOL",
    duration: "24 hours",
    durationHours: 24,
    isActive: true,
  },
  {
    id: "list-3",
    privilege: privileges[3],
    lender: "Player#5502",
    price: 0.4,
    currency: "SOL",
    duration: "3 hours",
    durationHours: 3,
    isActive: true,
  },
  {
    id: "list-4",
    privilege: privileges[6],
    lender: "Player#1187",
    price: 0.3,
    currency: "SOL",
    duration: "1 hour",
    durationHours: 1,
    isActive: true,
  },
  {
    id: "list-5",
    privilege: privileges[4],
    lender: "Player#9943",
    price: 0.2,
    currency: "SOL",
    duration: "24 hours",
    durationHours: 24,
    isActive: true,
  },
  {
    id: "list-6",
    privilege: privileges[5],
    lender: "Player#6670",
    price: 0.35,
    currency: "SOL",
    duration: "3 hours",
    durationHours: 3,
    isActive: true,
  },
];

export const activeSessions: Session[] = [
  {
    id: "sess-1",
    privilege: privileges[3],
    renter: "Player#4421",
    lender: "You",
    startTime: "2026-03-10T10:00:00Z",
    endTime: "2026-03-10T13:00:00Z",
    timeRemainingMs: 7980000,
    status: "active",
    price: 0.4,
    currency: "SOL",
  },
  {
    id: "sess-2",
    privilege: privileges[0],
    renter: "You",
    lender: "Player#7721",
    startTime: "2026-03-10T09:00:00Z",
    endTime: "2026-03-10T12:00:00Z",
    timeRemainingMs: 4380000,
    status: "active",
    price: 0.5,
    currency: "SOL",
  },
];

export const activityHistory: ActivityItem[] = [
  {
    id: "act-1",
    type: "rental",
    privilegeName: "Raid Access",
    game: "Mythic Realm",
    amount: 0.3,
    currency: "SOL",
    timestamp: "2026-03-10T08:30:00Z",
    counterparty: "Player#4421",
    direction: "earned",
  },
  {
    id: "act-2",
    type: "rental",
    privilegeName: "Tournament Pass",
    game: "Arena Champions",
    amount: 0.5,
    currency: "SOL",
    timestamp: "2026-03-09T14:00:00Z",
    counterparty: "Player#8812",
    direction: "earned",
  },
  {
    id: "act-3",
    type: "session_end",
    privilegeName: "Elite Rank Badge",
    game: "Mythic Realm",
    amount: 0.5,
    currency: "SOL",
    timestamp: "2026-03-09T11:00:00Z",
    counterparty: "Player#7721",
    direction: "spent",
  },
  {
    id: "act-4",
    type: "listing",
    privilegeName: "Legendary Sword Buff",
    game: "Mythic Realm",
    amount: 0.6,
    currency: "SOL",
    timestamp: "2026-03-08T16:00:00Z",
    counterparty: "Player#2209",
    direction: "earned",
  },
  {
    id: "act-5",
    type: "payment",
    privilegeName: "Guild Council Vote",
    game: "Realm Governance",
    amount: 0.2,
    currency: "SOL",
    timestamp: "2026-03-08T10:00:00Z",
    counterparty: "Player#9943",
    direction: "spent",
  },
];

export const userStats: UserStats = {
  totalPrivileges: 3,
  activeRentals: 2,
  revenueEarned: 1.4,
  currency: "SOL",
};

export const games = ["Mythic Realm", "Arena Champions", "Realm Governance"];
export const privilegeTypes = ["rank", "access", "buff", "governance"] as const;
export const durations = ["1 hour", "3 hours", "24 hours"] as const;
