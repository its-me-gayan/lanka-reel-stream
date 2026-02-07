import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type SubscriptionTier = "free" | "basic" | "standard" | "premium";

interface SubscriptionContextType {
  tier: SubscriptionTier;
  setTier: (tier: SubscriptionTier) => void;
  canAccess: (requiredTier: ContentTier) => boolean;
}

export type ContentTier = "free" | "basic" | "standard" | "premium";

const TIER_LEVEL: Record<SubscriptionTier, number> = {
  free: 0,
  basic: 1,
  standard: 2,
  premium: 3,
};

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within SubscriptionProvider");
  return ctx;
};

/**
 * Determines the required tier for a piece of content based on its properties.
 * - New releases (< 90 days) & high popularity → Premium
 * - Rating ≥ 7.5 or popularity ≥ 500 → Standard
 * - Everything else → Basic (free users see nothing gated beyond teasers)
 */
export const getContentTier = (item: {
  vote_average: number;
  popularity: number;
  release_date?: string;
  first_air_date?: string;
}): ContentTier => {
  const dateStr = item.release_date || (item as any).first_air_date;
  const isNewRelease = dateStr
    ? (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24) < 90
    : false;

  if (isNewRelease && item.popularity >= 400) return "premium";
  if (item.vote_average >= 7.5 || item.popularity >= 500) return "standard";
  return "basic";
};

export const TIER_LABELS: Record<ContentTier, { label: string; color: string }> = {
  free: { label: "Free", color: "bg-muted text-muted-foreground" },
  basic: { label: "Basic", color: "bg-secondary text-secondary-foreground" },
  standard: { label: "Standard", color: "bg-primary/20 text-primary border border-primary/30" },
  premium: { label: "Premium", color: "bg-accent/20 text-accent border border-accent/30" },
};

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [tier, setTier] = useState<SubscriptionTier>(() => {
    return (localStorage.getItem("ceylonflix_tier") as SubscriptionTier) || "free";
  });

  const handleSetTier = useCallback((newTier: SubscriptionTier) => {
    setTier(newTier);
    localStorage.setItem("ceylonflix_tier", newTier);
  }, []);

  const canAccess = useCallback(
    (requiredTier: ContentTier) => {
      return TIER_LEVEL[tier] >= TIER_LEVEL[requiredTier];
    },
    [tier]
  );

  return (
    <SubscriptionContext.Provider value={{ tier, setTier: handleSetTier, canAccess }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
