import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  Activity, 
  TrendingUp,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  subServices: SubService[];
}

interface SubService {
  id: string;
  name: string;
  description: string;
  avgWaitTime: number;
  currentQueue: number;
}

interface AdminDashboardProps {
  services: Service[];
  onBack: () => void;
}

interface QueueItem {
  tokenNumber: number;
  customerName: string;
  status: 'waiting' | 'on-way' | 'serving' | 'missed';
  joinTime: string;
  estimatedArrival?: string;
}

export function AdminDashboard({ services, onBack }: AdminDashboardProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);
  const [currentServing, setCurrentServing] = useState(142);
  
  // Mock queue data
  const [queueData, setQueueData] = useState<QueueItem[]>([
    { tokenNumber: 143, customerName: 'John Smith', status: 'waiting', joinTime: '10:30 AM' },
    { tokenNumber: 144, customerName: 'Sarah Wilson', status: 'on-way', joinTime: '10:35 AM', estimatedArrival: '11:15 AM' },
    { tokenNumber: 145, customerName: 'Mike Johnson', status: 'waiting', joinTime: '10:40 AM' },
    { tokenNumber: 146, customerName: 'Emma Davis', status: 'waiting', joinTime: '10:45 AM' },
    { tokenNumber: 147, customerName: 'Robert Brown', status: 'waiting', joinTime: '10:50 AM' },
  ]);

  const handleCallNext = () => {
    setCurrentServing(prev => prev + 1);
    // Update queue status
    setQueueData(prev => 
      prev.map(item => 
        item.tokenNumber === currentServing + 1 
          ? { ...item, status: 'serving' as const }
          : item
      )
    );
  };

  const handleSkip = (tokenNumber: number) => {
    setQueueData(prev =>
      prev.map(item =>
        item.tokenNumber === tokenNumber
          ? { ...item, status: 'missed' as const }
          : item
      )
    );
  };

  const handleRecall = (tokenNumber: number) => {
    setQueueData(prev =>
      prev.map(item =>
        item.tokenNumber === tokenNumber
          ? { ...item, status: 'waiting' as const }
          : item
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-warning-light text-warning border-warning/20';
      case 'on-way': return 'bg-primary-light text-primary border-primary/20';
      case 'serving': return 'bg-success-light text-success border-success/20';
      case 'missed': return 'bg-error-light text-error border-error/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting': return <Clock className="w-4 h-4" />;
      case 'on-way': return <Activity className="w-4 h-4" />;
      case 'serving': return <CheckCircle className="w-4 h-4" />;
      case 'missed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Service Selection View
  if (!selectedService) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-medium">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="mr-3 p-2 hover:bg-primary-foreground/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-primary-foreground/80 text-sm">
                  Manage queues and monitor activity
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-success-light to-success/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/20 rounded-lg">
                  <Users className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">47</div>
                  <div className="text-sm text-success/80">Total in Queues</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-to-br from-primary-light to-primary/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">18m</div>
                  <div className="text-sm text-primary/80">Avg Wait Time</div>
                </div>
              </div>
            </Card>
          </div>

          <h2 className="text-xl font-semibold text-foreground mb-4">Select Service to Manage</h2>
          
          <div className="space-y-4">
            {services.map((service) => (
              <Card
                key={service.id}
                className="p-4 cursor-pointer hover:shadow-soft transition-all duration-300 hover:scale-[1.02]"
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-1">
                        {service.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {service.subServices.length} active services
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {service.subServices.reduce((sum, sub) => sum + sub.currentQueue, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">in queue</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Sub-service Selection View
  if (selectedService && !selectedSubService) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-medium">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedService(null)}
              className="mr-3 p-2 hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                {selectedService.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{selectedService.name}</h1>
                <p className="text-primary-foreground/80 text-sm">Select sub-service to manage</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {selectedService.subServices.map((subService) => (
              <Card
                key={subService.id}
                className="p-4 cursor-pointer hover:shadow-soft transition-all duration-300"
                onClick={() => setSelectedSubService(subService)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">
                      {subService.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {subService.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-muted-foreground">
                        Avg: {subService.avgWaitTime}min
                      </span>
                      <span className="text-muted-foreground">
                        Queue: {subService.currentQueue}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={subService.currentQueue > 5 ? 'bg-warning-light text-warning' : 'bg-success-light text-success'}>
                      {subService.currentQueue > 5 ? 'Busy' : 'Available'}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Queue Management View
  if (selectedSubService) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-medium">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedSubService(null)}
              className="mr-3 p-2 hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{selectedSubService.name}</h1>
              <p className="text-primary-foreground/80 text-sm">
                {selectedService?.name} • Queue Management
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Serving */}
          <Card className="p-6 text-center bg-gradient-to-br from-success-light to-success/10">
            <div className="mb-4">
              <div className="text-sm text-success mb-2">Now Serving</div>
              <div className="text-4xl font-bold text-success mb-2">
                {currentServing.toString().padStart(3, '0')}
              </div>
            </div>
            <Button 
              onClick={handleCallNext}
              className="bg-success hover:bg-success/90 text-white px-8"
            >
              <Play className="w-4 h-4 mr-2" />
              Call Next
            </Button>
          </Card>

          {/* Queue List */}
          <Card className="p-6">
            <h3 className="font-semibold text-card-foreground mb-4">Queue Status</h3>
            <div className="space-y-3">
              {queueData.map((item) => (
                <div 
                  key={item.tokenNumber}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-bold text-primary">
                      {item.tokenNumber.toString().padStart(3, '0')}
                    </div>
                    <div>
                      <div className="font-medium text-card-foreground">
                        {item.customerName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Joined: {item.joinTime}
                        {item.estimatedArrival && (
                          <span className="ml-2">• ETA: {item.estimatedArrival}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getStatusColor(item.status)} text-xs px-2 py-1`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status}</span>
                    </Badge>
                    
                    {item.status === 'waiting' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSkip(item.tokenNumber)}
                        className="text-error hover:text-error hover:bg-error-light p-2"
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    )}
                    
                    {item.status === 'missed' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRecall(item.tokenNumber)}
                        className="text-primary hover:bg-primary-light p-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {queueData.filter(q => q.status === 'waiting').length}
              </div>
              <div className="text-sm text-muted-foreground">Waiting</div>
            </Card>
            
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {queueData.filter(q => q.status === 'on-way').length}
              </div>
              <div className="text-sm text-muted-foreground">On Way</div>
            </Card>
            
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-error">
                {queueData.filter(q => q.status === 'missed').length}
              </div>
              <div className="text-sm text-muted-foreground">Missed</div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}