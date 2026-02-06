import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Zap, Star, Smartphone, Monitor, Tv, Download, Headphones, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  icon: React.ReactNode;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  badge?: string;
  features: PlanFeature[];
  screens: number;
  quality: string;
  gradient: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Basic",
    icon: <Smartphone className="w-6 h-6" />,
    monthlyPrice: 299,
    yearlyPrice: 2990,
    description: "Perfect for individual viewers on mobile",
    screens: 1,
    quality: "SD (480p)",
    gradient: "from-secondary to-cinema-elevated",
    features: [
      { text: "Unlimited movies & TV shows", included: true },
      { text: "Watch on mobile & tablet", included: true },
      { text: "SD quality (480p)", included: true },
      { text: "1 screen at a time", included: true },
      { text: "Sinhala & Tamil subtitles", included: true },
      { text: "HD quality", included: false },
      { text: "Downloads for offline", included: false },
      { text: "Ad-free experience", included: false },
    ],
  },
  {
    name: "Standard",
    icon: <Monitor className="w-6 h-6" />,
    monthlyPrice: 599,
    yearlyPrice: 5990,
    description: "Great for couples and small families",
    badge: "Most Popular",
    popular: true,
    screens: 2,
    quality: "Full HD (1080p)",
    gradient: "from-primary/20 to-gold-dark/20",
    features: [
      { text: "Unlimited movies & TV shows", included: true },
      { text: "Watch on any device", included: true },
      { text: "Full HD quality (1080p)", included: true },
      { text: "2 screens at a time", included: true },
      { text: "Sinhala & Tamil subtitles", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Downloads for offline", included: true },
      { text: "4K Ultra HD", included: false },
    ],
  },
  {
    name: "Premium",
    icon: <Crown className="w-6 h-6" />,
    monthlyPrice: 999,
    yearlyPrice: 9990,
    description: "The ultimate experience for the whole family",
    screens: 4,
    quality: "4K Ultra HD + HDR",
    gradient: "from-primary/30 to-gold-light/10",
    features: [
      { text: "Unlimited movies & TV shows", included: true },
      { text: "Watch on any device", included: true },
      { text: "4K Ultra HD + HDR", included: true },
      { text: "4 screens at a time", included: true },
      { text: "Sinhala & Tamil subtitles", included: true },
      { text: "Ad-free experience", included: true },
      { text: "Downloads for offline", included: true },
      { text: "Dolby Atmos audio", included: true },
    ],
  },
];

const paymentMethods = [
  { name: "Visa / Mastercard", icon: "💳" },
  { name: "Dialog Genie", icon: "📱" },
  { name: "FriMi", icon: "🏦" },
  { name: "PayHere", icon: "🇱🇰" },
  { name: "Bank Transfer", icon: "🏛️" },
  { name: "eZ Cash", icon: "📲" },
];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Choose Your Plan</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground tracking-wider mb-4">
              Stream <span className="text-gradient-gold">Without</span> Limits
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Enjoy unlimited movies and TV shows in Sinhala, Tamil & English. 
              Plans starting from just Rs. 299/month.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-secondary border border-border">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isYearly
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-bold">
                  Save 17%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular
                  ? "border-2 border-primary shadow-[0_0_40px_hsl(var(--gold)/0.15)] scale-[1.02] md:scale-105"
                  : "border border-border"
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute top-0 left-0 right-0 bg-primary py-1.5 text-center">
                  <span className="text-xs font-bold text-primary-foreground tracking-wider uppercase">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={`bg-gradient-to-b ${plan.gradient} p-6 sm:p-8 ${plan.badge ? "pt-12" : ""}`}>
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    plan.popular ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-foreground tracking-wide">{plan.name}</h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-muted-foreground">Rs.</span>
                    <span className="font-display text-5xl text-foreground">
                      {isYearly
                        ? Math.round(plan.yearlyPrice / 12).toLocaleString()
                        : plan.monthlyPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  {isYearly && (
                    <p className="text-xs text-primary mt-1">
                      Rs. {plan.yearlyPrice.toLocaleString()}/year — Save Rs.{" "}
                      {(plan.monthlyPrice * 12 - plan.yearlyPrice).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:brightness-110 glow-gold"
                      : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                  }`}
                >
                  Start Free Trial
                </button>

                {/* Divider */}
                <div className="my-6 border-t border-border/50" />

                {/* Quality & Screens */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Tv className="w-4 h-4" />
                    <span>{plan.quality}</span>
                  </div>
                  <span className="text-foreground font-medium">{plan.screens} screen{plan.screens > 1 ? "s" : ""}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        feature.included
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-muted-foreground/40"
                      }`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className={`text-sm ${
                        feature.included ? "text-foreground/80" : "text-muted-foreground/40 line-through"
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl text-foreground tracking-wider mb-3">
            Pay Your <span className="text-gradient-gold">Way</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            We support all major Sri Lankan and international payment methods
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 transition-all hover:bg-secondary"
            >
              <span className="text-2xl">{method.icon}</span>
              <span className="text-xs font-medium text-foreground/80 text-center">{method.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ-like Section */}
      <section className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-b from-secondary/50 to-card border border-border p-8 sm:p-10 text-center"
        >
          <Globe className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl text-foreground tracking-wider mb-3">
            Made for Sri Lanka
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
            CeylonFlix is designed for Sri Lankan audiences with Sinhala and Tamil subtitles, 
            local payment methods, and content curated for you. Stream Bollywood, Hollywood, 
            Tamil cinema, and Sinhala movies — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: <Headphones className="w-4 h-4" />, text: "24/7 Support" },
              { icon: <Download className="w-4 h-4" />, text: "Offline Downloads" },
              { icon: <Star className="w-4 h-4" />, text: "No Ads (Standard+)" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default PricingPage;
