import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SyncItem {
  id: string;
  action: string;
  source: string;
  target: string;
  status: "success" | "pending" | "syncing";
  time: string;
}

const recentSyncs: SyncItem[] = [
  {
    id: "1",
    action: "Push alterações",
    source: "Antigravity",
    target: "GitHub",
    status: "success",
    time: "Agora",
  },
  {
    id: "2",
    action: "Pull atualização",
    source: "GitHub",
    target: "Lovable",
    status: "success",
    time: "2 min",
  },
  {
    id: "3",
    action: "Sync pendente",
    source: "Lovable",
    target: "GitHub",
    status: "pending",
    time: "5 min",
  },
];

interface SyncStatusProps {
  usedMessages: number;
  totalMessages: number;
}

const SyncStatus = ({ usedMessages, totalMessages }: SyncStatusProps) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const percentage = (usedMessages / totalMessages) * 100;

  return (
    <motion.div 
      className="px-6 py-5 border-b border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Sincronização</h2>
          <p className="text-xs text-muted-foreground">{usedMessages}/{totalMessages} mensagens usadas</p>
        </div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleSync}
            size="sm"
            disabled={isSyncing}
            className="gradient-primary text-primary-foreground hover:opacity-90"
          >
            <RefreshCw className={cn("w-4 h-4 mr-1.5", isSyncing && "animate-spin")} />
            {isSyncing ? "Sincronizando..." : "Sincronizar"}
          </Button>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Uso mensal</span>
          <span className="text-foreground font-medium">{usedMessages}/{totalMessages}</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div 
            className="h-full rounded-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Recent syncs */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground">Atividade recente</span>
        {recentSyncs.map((sync, index) => (
          <motion.div
            key={sync.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30 border border-border"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
          >
            <div className="flex items-center gap-2.5">
              {sync.status === "success" && (
                <CheckCircle2 className="w-4 h-4 text-primary" />
              )}
              {sync.status === "pending" && (
                <Clock className="w-4 h-4 text-amber-500" />
              )}
              {sync.status === "syncing" && (
                <RefreshCw className="w-4 h-4 text-antigravity animate-spin" />
              )}
              
              <div>
                <p className="text-xs font-medium text-foreground">{sync.action}</p>
                <p className="text-[10px] text-muted-foreground">
                  {sync.source} <ArrowRight className="w-2.5 h-2.5 inline" /> {sync.target}
                </p>
              </div>
            </div>
            
            <span className="text-[10px] text-muted-foreground">{sync.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SyncStatus;
