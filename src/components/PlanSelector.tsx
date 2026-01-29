import { useState } from "react";
import { ChevronDown, Check, Sparkles, Zap, Crown, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  messages: number;
  price: number | null;
  icon: React.ElementType;
  gradient: string;
  popular?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Gratuito",
    messages: 5,
    price: null,
    icon: Sparkles,
    gradient: "from-muted to-secondary",
    features: ["5 sincronizações/mês", "Suporte básico", "1 repositório"],
  },
  {
    id: "pro",
    name: "Pro",
    messages: 250,
    price: 29.8,
    icon: Zap,
    gradient: "from-blue-500 to-blue-600",
    features: ["250 sincronizações/mês", "Suporte prioritário", "5 repositórios", "Webhooks"],
  },
  {
    id: "plus",
    name: "Plus",
    messages: 500,
    price: 49.9,
    icon: Crown,
    gradient: "from-purple-500 to-pink-500",
    popular: true,
    features: ["500 sincronizações/mês", "Suporte 24/7", "15 repositórios", "Webhooks", "API Access"],
  },
  {
    id: "premium",
    name: "Premium",
    messages: 1000,
    price: 79.8,
    icon: Gem,
    gradient: "from-amber-500 to-orange-500",
    features: ["1000 sincronizações/mês", "Suporte dedicado", "Repositórios ilimitados", "Webhooks", "API Access", "White-label"],
  },
];

interface PlanSelectorProps {
  selectedPlan: string;
  onSelectPlan: (planId: string) => void;
  usedMessages: number;
}

const PlanSelector = ({ selectedPlan, onSelectPlan, usedMessages }: PlanSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];
  const CurrentIcon = currentPlan.icon;
  const totalMessages = currentPlan.messages;
  const percentage = Math.min((usedMessages / totalMessages) * 100, 100);

  const handleSelectPlan = (planId: string) => {
    onSelectPlan(planId);
    setIsOpen(false);
  };

  return (
    <div className="px-6 py-4">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="w-full p-4 rounded-xl border border-border bg-card hover:bg-secondary/30 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br",
                  currentPlan.gradient
                )}>
                  <CurrentIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Plano {currentPlan.name}</span>
                    {currentPlan.popular && (
                      <span className="px-1.5 py-0.5 rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full rounded-full gradient-primary transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {usedMessages}/{totalMessages} msgs
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </button>
        </SheetTrigger>
        
        <SheetContent side="bottom" className="rounded-t-2xl bg-card border-border">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-foreground">Escolha seu Plano</SheetTitle>
          </SheetHeader>
          
          <div className="grid grid-cols-2 gap-3 pb-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;

              return (
                <button
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan.id)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 text-left transition-all duration-300",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-glow"
                      : "border-border bg-card hover:border-muted-foreground/30 hover:bg-secondary/30"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                      POPULAR
                    </div>
                  )}

                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br",
                    plan.gradient
                  )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="text-sm font-bold text-foreground mb-1">{plan.name}</h3>
                  
                  <div className="flex items-baseline gap-1 mb-2">
                    {plan.price !== null ? (
                      <>
                        <span className="text-lg font-bold text-foreground">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                        <span className="text-xs text-muted-foreground">/mês</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-primary">Grátis</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="px-2 py-0.5 rounded-md bg-secondary text-xs font-medium text-muted-foreground">
                      {plan.messages} msgs
                    </div>
                  </div>

                  <ul className="space-y-1.5">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="w-3 h-3 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedPlan !== "free" && (
            <Button className="w-full gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Assinar {currentPlan.name}
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PlanSelector;
