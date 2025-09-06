import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QueueManager } from "@/components/QueueManager";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />;
  }

  return <QueueManager />;
};

export default Index;
