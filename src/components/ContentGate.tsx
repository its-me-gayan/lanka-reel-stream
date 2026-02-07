import { motion } from "framer-motion";
import { Lock, Crown, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSubscription, type ContentTier, TIER_LABELS } from "@/contexts/SubscriptionContext";

interface ContentGateProps {
  requiredTier: ContentTier;
  title: string;
}

const ContentGate = ({ requiredTier, title }: ContentGateProps) => {
  const { tier } = useSubscription();
  const navigate = useNavigate();
  const tierInfo = TIER_LABELS[requiredTier];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-cinema-dark border border-border shadow-2xl"
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-cinema-dark/80 to-cinema-dark">
        <div className="text-center px-6 max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-5 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
          >
            <Lock className="w-8 h-8 text-primary" />
          </motion.div>

          <h3 className="font-display text-3xl sm:text-4xl text-foreground tracking-wide mb-2">
            Upgrade to Watch
          </h3>

          <p className="text-sm text-muted-foreground mb-4">
            <span className="font-semibold text-foreground">{title}</span> requires a{" "}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${tierInfo.color}`}>
              {requiredTier === "premium" ? <Crown className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
              {tierInfo.label}
            </span>{" "}
            plan or higher.
          </p>

          <p className="text-xs text-muted-foreground/70 mb-6">
            You're currently on the <span className="capitalize font-medium text-foreground/80">{tier}</span> plan.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/pricing")}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl glow-gold transition-all hover:brightness-110"
          >
            View Plans
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentGate;
