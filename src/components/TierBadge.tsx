import { Crown, Zap } from "lucide-react";
import { type ContentTier, TIER_LABELS } from "@/contexts/SubscriptionContext";

interface TierBadgeProps {
  tier: ContentTier;
  className?: string;
}

const TierBadge = ({ tier, className = "" }: TierBadgeProps) => {
  if (tier === "basic" || tier === "free") return null;

  const info = TIER_LABELS[tier];
  const Icon = tier === "premium" ? Crown : Zap;

  return (
    <div
      className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${info.color} ${className}`}
    >
      <Icon className="w-2.5 h-2.5" />
      {info.label}
    </div>
  );
};

export default TierBadge;
