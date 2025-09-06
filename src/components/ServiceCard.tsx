import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  gradient?: string;
}

export function ServiceCard({ icon, title, description, onClick, gradient }: ServiceCardProps) {
  return (
    <Card 
      className={`
        p-6 cursor-pointer transition-all duration-300 
        hover:scale-105 hover:shadow-medium 
        bg-card border border-border/50 
        ${gradient || 'bg-gradient-to-br from-primary-light to-secondary/30'}
        group
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-1">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {description}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      </div>
    </Card>
  );
}