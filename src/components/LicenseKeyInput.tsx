import { useState } from "react";
import { Key, Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LicenseKeyInput = () => {
  const [licenseKey, setLicenseKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");

  const handleActivate = () => {
    if (licenseKey.length >= 16) {
      setStatus("valid");
    } else {
      setStatus("invalid");
    }
  };

  return (
    <div className="px-6 py-5 border-b border-border">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
          <Key className="w-4 h-4 text-accent" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Chave de Licença</h2>
          <p className="text-xs text-muted-foreground">Ative sua licença para desbloquear recursos</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Input
            type={showKey ? "text" : "password"}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            value={licenseKey}
            onChange={(e) => {
              setLicenseKey(e.target.value);
              setStatus("idle");
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

        <div className="flex items-center gap-2">
          <Button
            onClick={handleActivate}
            className="flex-1 gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Ativar Licença
          </Button>
        </div>

        {status === "valid" && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">Licença ativada com sucesso!</span>
          </div>
        )}

        {status === "invalid" && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/30">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <span className="text-xs font-medium text-destructive">Chave inválida. Verifique e tente novamente.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LicenseKeyInput;
