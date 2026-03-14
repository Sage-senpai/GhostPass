export interface Privilege {
  id: string;
  name: string;
  game: string;
  type: "rank" | "access" | "buff" | "governance";
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  imageUrl?: string;
}

export interface RentalListing {
  id: string;
  privilege: Privilege;
  lender: string;
  price: number;
  currency: string;
  duration: string;
  durationHours: number;
  isActive: boolean;
}

export interface Session {
  id: string;
  privilege: Privilege;
  renter: string;
  lender: string;
  startTime: string;
  endTime: string;
  timeRemainingMs: number;
  status: "active" | "expired" | "cancelled";
  price: number;
  currency: string;
}

export interface ActivityItem {
  id: string;
  type: "rental" | "listing" | "session_end" | "payment";
  privilegeName: string;
  game: string;
  amount: number;
  currency: string;
  timestamp: string;
  counterparty: string;
  direction: "earned" | "spent";
}

export interface UserStats {
  totalPrivileges: number;
  activeRentals: number;
  revenueEarned: number;
  currency: string;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
}
