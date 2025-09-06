import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  QrCode, 
  Bell, 
  Shield,
  ArrowRight,
  Check,
  Users,
  Clock,
  TrendingUp
} from "lucide-react";
import queueHero from "@/assets/queue-hero.jpg";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const [showFeatures, setShowFeatures] = useState(false);

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Digital Queue Management",
      description: "Join queues digitally and track your position in real-time"
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code Check-in",
      description: "Quick queue joining at venues with QR code scanning"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "Get notified when it's almost your turn to be served"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Multi-Industry Support",
      description: "Works across hospitals, banks, restaurants, and more"
    }
  ];

  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "50K+", label: "Active Users" },
    { icon: <Clock className="w-5 h-5" />, value: "15 min", label: "Avg. Wait Reduction" },
    { icon: <TrendingUp className="w-5 h-5" />, value: "98%", label: "Customer Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/30 to-secondary/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        
        <div className="relative px-6 pt-12 pb-8">
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src={queueHero} 
                alt="Queue Management"
                className="w-32 h-32 mx-auto rounded-3xl shadow-medium object-cover"
              />
            </div>
            
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ✨ Digital Queue Revolution
            </Badge>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Queue Manager
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6 max-w-sm mx-auto">
              Skip the lines, track your turn, and get served efficiently across hospitals, banks, restaurants, and more.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 text-center bg-card/70 backdrop-blur-sm border-border/50">
                <div className="flex items-center justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-card-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={onGetStarted}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-6 text-lg font-semibold shadow-medium"
              size="lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setShowFeatures(!showFeatures)}
              className="w-full border-primary/20 text-primary hover:bg-primary-light py-4"
            >
              {showFeatures ? 'Hide' : 'Learn More About'} Features
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {showFeatures && (
        <div className="px-6 pb-8 animate-fade-in">
          <Card className="p-6 bg-card/70 backdrop-blur-sm border-border/50">
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              Why Choose Queue Manager?
            </h2>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                  <div className="text-success">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-primary-light to-secondary/30 rounded-xl border border-primary/20">
              <div className="text-center">
                <h3 className="font-semibold text-card-foreground mb-2">
                  🏥 Multi-Industry Support
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Hospitals • Banks • Restaurants • Salons • Government Offices • Service Centers
                </p>
                <Button 
                  onClick={onGetStarted}
                  variant="outline"
                  size="sm"
                  className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Start Managing Queues
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 pb-6 text-center">
        <p className="text-xs text-muted-foreground">
          Trusted by 50,000+ users across multiple industries
        </p>
      </div>
    </div>
  );
}