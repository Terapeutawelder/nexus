import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExtensionHeader from "@/components/ExtensionHeader";
import SyncStatus from "@/components/SyncStatus";
import ExtensionFooter from "@/components/ExtensionFooter";
import SettingsScreen from "@/components/SettingsScreen";
import ChatInput from "@/components/ChatInput";

const planLimits: Record<string, number> = {
  free: 5,
  pro: 250,
  plus: 500,
  premium: 1000,
};

const STORAGE_KEY = "nexus_settings";

interface StoredSettings {
  selectedPlan: string;
  isActivated: boolean;
  licenseKey: string;
  usedMessages: number;
}

const getStoredSettings = (): StoredSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading from localStorage:", e);
  }
  return {
    selectedPlan: "free",
    isActivated: false,
    licenseKey: "",
    usedMessages: 3,
  };
};

const Index = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<StoredSettings>(getStoredSettings);

  // Save to localStorage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  }, [settings]);

  const totalMessages = planLimits[settings.selectedPlan];

  const updateSettings = (updates: Partial<StoredSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-dark">
      {/* Extension popup container */}
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-card overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {showSettings ? (
            <SettingsScreen 
              key="settings"
              onClose={() => setShowSettings(false)} 
              selectedPlan={settings.selectedPlan}
              onSelectPlan={(plan) => updateSettings({ selectedPlan: plan })}
              usedMessages={settings.usedMessages}
              isActivated={settings.isActivated}
              onActivate={(activated) => updateSettings({ isActivated: activated })}
              licenseKey={settings.licenseKey}
              onLicenseKeyChange={(key) => updateSettings({ licenseKey: key })}
            />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ExtensionHeader />
              <SyncStatus usedMessages={settings.usedMessages} totalMessages={totalMessages} />
              <ChatInput />
              <ExtensionFooter onSettingsClick={() => setShowSettings(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
