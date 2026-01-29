import { useState } from "react";
import { 
  Settings, 
  Github, 
  Webhook, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Link2,
  ExternalLink,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

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
}

const SettingsScreen = ({ onClose }: SettingsScreenProps) => {
  const [activeTab, setActiveTab] = useState<"repos" | "webhooks">("repos");
  const [newRepoUrl, setNewRepoUrl] = useState("");
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [newWebhookName, setNewWebhookName] = useState("");

  const [repositories, setRepositories] = useState<Repository[]>([
    { id: "1", name: "lovable-project", url: "https://github.com/user/lovable-project", connected: true },
    { id: "2", name: "antigravity-sync", url: "https://github.com/user/antigravity-sync", connected: false },
  ]);

  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    { id: "1", name: "Deploy Hook", url: "https://api.example.com/deploy", enabled: true, events: ["push", "merge"] },
    { id: "2", name: "Notification", url: "https://api.example.com/notify", enabled: false, events: ["push"] },
  ]);

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

  return (
    <div className="flex flex-col h-full">
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
      <div className="px-6 py-3 border-b border-border">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("repos")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "repos" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <Github className="w-4 h-4" />
            Repositórios
          </button>
          <button
            onClick={() => setActiveTab("webhooks")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "webhooks" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <Webhook className="w-4 h-4" />
            Webhooks
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
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
    </div>
  );
};

export default SettingsScreen;
