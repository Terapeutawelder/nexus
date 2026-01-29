import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  Github, 
  Webhook, 
  Plus, 
  Trash2, 
  Check, 
  Key, 
  Link2,
  ExternalLink,
  ChevronLeft,
  Crown,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface Repository {
  id: string;
  name: string;
  url: string;
  connected: boolean;
}

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  events: string[];
}

interface SettingsScreenProps {
  onClose: () => void;
  selectedPlan: string;
  onSelectPlan: (plan: string) => void;
  usedMessages: number;
  isActivated: boolean;
  onActivate: (activated: boolean) => void;
  licenseKey: string;
  onLicenseKeyChange: (key: string) => void;
}

const planLimits: Record<string, number> = {
  free: 5,
  pro: 250,
  plus: 500,
  premium: 1000,
};

const plans = [
  { id: "free", name: "Gratuito", messages: 5, price: null },
  { id: "pro", name: "Pro", messages: 250, price: "R$ 29,80" },
  { id: "plus", name: "Plus", messages: 500, price: "R$ 49,90" },
  { id: "premium", name: "Premium", messages: 1000, price: "R$ 79,80" },
];

const SettingsScreen = ({ 
  onClose, 
  selectedPlan, 
  onSelectPlan, 
  usedMessages,
  isActivated,
  onActivate,
  licenseKey: externalLicenseKey,
  onLicenseKeyChange
}: SettingsScreenProps) => {
  const [activeTab, setActiveTab] = useState<"license" | "plans" | "repos" | "webhooks">("license");
  const [newRepoUrl, setNewRepoUrl] = useState("");
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [newWebhookName, setNewWebhookName] = useState("");
  const [licenseKey, setLicenseKey] = useState(externalLicenseKey);
  const [showKey, setShowKey] = useState(false);
  const [licenseStatus, setLicenseStatus] = useState<"idle" | "valid" | "invalid">(
    externalLicenseKey.length >= 16 ? "valid" : "idle"
  );

  const [repositories, setRepositories] = useState<Repository[]>([
    { id: "1", name: "lovable-project", url: "https://github.com/user/lovable-project", connected: true },
    { id: "2", name: "antigravity-sync", url: "https://github.com/user/antigravity-sync", connected: false },
  ]);

  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    { id: "1", name: "Deploy Hook", url: "https://api.example.com/deploy", enabled: true, events: ["push", "merge"] },
    { id: "2", name: "Notification", url: "https://api.example.com/notify", enabled: false, events: ["push"] },
  ]);

  const handleActivateLicense = () => {
    if (licenseKey.length >= 16) {
      setLicenseStatus("valid");
      onActivate(true);
      onLicenseKeyChange(licenseKey);
    } else {
      setLicenseStatus("invalid");
    }
  };

  const addRepository = () => {
    if (!newRepoUrl.trim()) return;
    const repoName = newRepoUrl.split("/").pop() || "new-repo";
    setRepositories([
      ...repositories,
      { id: Date.now().toString(), name: repoName, url: newRepoUrl, connected: false }
    ]);
    setNewRepoUrl("");
  };

  const toggleRepositoryConnection = (id: string) => {
    setRepositories(repositories.map(repo => 
      repo.id === id ? { ...repo, connected: !repo.connected } : repo
    ));
  };

  const removeRepository = (id: string) => {
    setRepositories(repositories.filter(repo => repo.id !== id));
  };

  const addWebhook = () => {
    if (!newWebhookUrl.trim() || !newWebhookName.trim()) return;
    setWebhooks([
      ...webhooks,
      { id: Date.now().toString(), name: newWebhookName, url: newWebhookUrl, enabled: true, events: ["push"] }
    ]);
    setNewWebhookUrl("");
    setNewWebhookName("");
  };

  const toggleWebhook = (id: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, enabled: !webhook.enabled } : webhook
    ));
  };

  const removeWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
  };

  const currentPlan = plans.find(p => p.id === selectedPlan);
  const totalMessages = planLimits[selectedPlan];
  const usagePercent = (usedMessages / totalMessages) * 100;

  return (
    <motion.div 
      className="flex flex-col h-full"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center gap-3">
        <button 
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <Settings className="w-4 h-4 text-accent" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Configurações</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-3 border-b border-border overflow-x-auto">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("license")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              activeTab === "license" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <Key className="w-3.5 h-3.5" />
            Licença
          </button>
          <button
            onClick={() => setActiveTab("plans")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              activeTab === "plans" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <Crown className="w-3.5 h-3.5" />
            Planos
          </button>
          <button
            onClick={() => setActiveTab("repos")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              activeTab === "repos" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <Github className="w-3.5 h-3.5" />
            Repos
          </button>
          <button
            onClick={() => setActiveTab("webhooks")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              activeTab === "webhooks" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <Webhook className="w-3.5 h-3.5" />
            Webhooks
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* License Tab */}
        {activeTab === "license" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-secondary/30 border border-border space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Key className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Chave de Licença</h3>
                  <p className="text-xs text-muted-foreground">Ative sua licença para desbloquear recursos</p>
                </div>
              </div>

              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={licenseKey}
                  onChange={(e) => {
                    setLicenseKey(e.target.value);
                    setLicenseStatus("idle");
                  }}
                  className="pr-10 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground font-mono text-sm tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <Button
                onClick={handleActivateLicense}
                className="w-full gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Ativar Licença
              </Button>

              {licenseStatus === "valid" && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">Licença ativada com sucesso!</span>
                </div>
              )}

              {licenseStatus === "invalid" && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/30">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <span className="text-xs font-medium text-destructive">Chave inválida. Verifique e tente novamente.</span>
                </div>
              )}
            </div>

            {isActivated && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">Extensão ativada</span>
              </div>
            )}
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === "plans" && (
          <div className="space-y-4">
            {/* Current Plan Summary */}
            <div className="p-4 rounded-xl bg-secondary/30 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Plano Atual</span>
                </div>
                <span className="text-sm font-bold text-primary">{currentPlan?.name}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Mensagens usadas</span>
                  <span className="text-foreground font-medium">{usedMessages} / {totalMessages}</span>
                </div>
                <Progress value={usagePercent} className="h-2" />
              </div>
            </div>

            {/* Plan Options */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Escolha seu plano
              </h3>
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => onSelectPlan(plan.id)}
                  className={cn(
                    "w-full p-3 rounded-lg border transition-all text-left",
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-secondary/30 hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{plan.name}</p>
                      <p className="text-xs text-muted-foreground">{plan.messages} mensagens/mês</p>
                    </div>
                    <div className="text-right">
                      {plan.price ? (
                        <p className="text-sm font-bold text-primary">{plan.price}</p>
                      ) : (
                        <p className="text-sm font-medium text-muted-foreground">Grátis</p>
                      )}
                      {selectedPlan === plan.id && (
                        <Check className="w-4 h-4 text-primary ml-auto mt-1" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "repos" && (
          <div className="space-y-4">
            {/* Add new repo */}
            <div className="p-4 rounded-xl bg-secondary/30 border border-border space-y-3">
              <h3 className="text-sm font-medium text-foreground">Adicionar Repositório</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="https://github.com/usuario/repositorio"
                  value={newRepoUrl}
                  onChange={(e) => setNewRepoUrl(e.target.value)}
                  className="flex-1 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground text-sm"
                />
                <Button 
                  onClick={addRepository}
                  size="sm" 
                  className="gradient-primary text-primary-foreground"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Repository list */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Repositórios Conectados ({repositories.filter(r => r.connected).length})
              </h3>
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      repo.connected ? "bg-primary/20" : "bg-muted"
                    )}>
                      <Github className={cn(
                        "w-4 h-4",
                        repo.connected ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{repo.name}</p>
                      <a 
                        href={repo.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Ver no GitHub
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRepositoryConnection(repo.id)}
                      className={cn(
                        "h-8 px-3",
                        repo.connected 
                          ? "text-primary hover:text-primary/80" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {repo.connected ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Conectado
                        </>
                      ) : (
                        <>
                          <Link2 className="w-3.5 h-3.5 mr-1" />
                          Conectar
                        </>
                      )}
                    </Button>
                    <button
                      onClick={() => removeRepository(repo.id)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "webhooks" && (
          <div className="space-y-4">
            {/* Add new webhook */}
            <div className="p-4 rounded-xl bg-secondary/30 border border-border space-y-3">
              <h3 className="text-sm font-medium text-foreground">Adicionar Webhook</h3>
              <div className="space-y-2">
                <Input
                  placeholder="Nome do webhook"
                  value={newWebhookName}
                  onChange={(e) => setNewWebhookName(e.target.value)}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground text-sm"
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="https://api.exemplo.com/webhook"
                    value={newWebhookUrl}
                    onChange={(e) => setNewWebhookUrl(e.target.value)}
                    className="flex-1 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground text-sm"
                  />
                  <Button 
                    onClick={addWebhook}
                    size="sm" 
                    className="gradient-primary text-primary-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Webhook list */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Webhooks Configurados ({webhooks.filter(w => w.enabled).length} ativos)
              </h3>
              {webhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      webhook.enabled ? "bg-primary/20" : "bg-muted"
                    )}>
                      <Webhook className={cn(
                        "w-4 h-4",
                        webhook.enabled ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{webhook.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {webhook.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={webhook.enabled}
                      onCheckedChange={() => toggleWebhook(webhook.id)}
                    />
                    <button
                      onClick={() => removeWebhook(webhook.id)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SettingsScreen;
