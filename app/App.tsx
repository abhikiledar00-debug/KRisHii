import React, { useState } from "react";

import { LanguageOnboarding } from "./components/LanguageOnboarding";
import { LoginScreen } from "./components/LoginScreen";

import { FarmerDashboard } from "./components/FarmerDashboard";
import { RetailerDashboard } from "./components/RetailerDashboard";
import { TransporterDashboard } from "./components/TransporterDashboard";

import { VoiceAssistant } from "./components/VoiceAssistant";

type LanguageType =
  | "en"
  | "hi"
  | "kn"
  | "mr";

export default function App() {

  // LANGUAGE
  const [language, setLanguage] =
    useState<LanguageType>("en");

  // USER
  const [user, setUser] =
    useState<any>(null);

  // VOICE
  const handleVoiceCommand = (
    command: string
  ) => {
    console.log(command);
  };

  // LOGOUT
  const handleLogout = () => {
    setUser(null);
  };

  // LANGUAGE SCREEN
  if (!language) {
    return (
      <LanguageOnboarding
        onLanguageSelect={
          setLanguage as any
        }
      />
    );
  }

  // LOGIN SCREEN
  if (!user) {
    return (
      <LoginScreen
        onLogin={setUser}
      />
    );
  }

  // FARMER
  if (user.role === "farmer") {
    return (
      <div className="size-full">

        <FarmerDashboard
          language={language}
          setLanguage={setLanguage}
          onLogout={handleLogout}
          user={user}
        />

        <VoiceAssistant
          onVoiceCommand={
            handleVoiceCommand
          }
        />

      </div>
    );
  }

  // RETAILER
  if (user.role === "retailer") {
    return (
      <RetailerDashboard
        language={language}
        setLanguage={setLanguage as any}
        onLogout={handleLogout}
      />
    );
  }

  // TRANSPORTER
  return (
    <TransporterDashboard
      language={language}
      setLanguage={setLanguage as any}
      onLogout={handleLogout}
    />
  );
}