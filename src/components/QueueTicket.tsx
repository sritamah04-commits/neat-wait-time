import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  X,
  MapPin,
  Bell,
  RotateCcw
} from "lucide-react";

interface QueueTicketData {
  tokenNumber: number;
  serviceName: string;
  subServiceName: string;
  estimatedTime: number;
  status: 'waiting' | 'on-way' | 'serving' | 'missed';
  position: number;
  totalInQueue: number;
}

interface QueueTicketProps {
  ticket: QueueTicketData;
  onBack: () => void;
}

export function QueueTicket({ ticket, onBack }: QueueTicketProps) {
  const [currentTicket, setCurrentTicket] = useState(ticket);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress based on position in queue
    const progressValue = Math.max(0, ((currentTicket.totalInQueue - currentTicket.position) / currentTicket.totalInQueue) * 100);
    setProgress(progressValue);

    // Simulate queue movement
    const interval = setInterval(() => {
      if (currentTicket.position > 1 && Math.random() > 0.7) {
        setCurrentTicket(prev => ({
          ...prev,
          position: prev.position - 1,
          estimatedTime: Math.max(5, prev.estimatedTime - 3)
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTicket.position, currentTicket.totalInQueue]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'waiting':
        return {
          icon: <Clock className="w-6 h-6" />,
          label: 'Waiting in Queue',
          color: 'bg-warning-light text-warning border-warning/20',
          description: 'Please wait for your turn'
        };
      case 'on-way':
        return {
          icon: <MapPin className="w-6 h-6" />,
          label: 'On the Way',
          color: 'bg-primary-light text-primary border-primary/20',
          description: 'Please head to the service counter'
        };
      case 'serving':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          label: 'Now Serving',
          color: 'bg-success-light text-success border-success/20',
          description: 'Your turn! Please proceed to counter'
        };
      case 'missed':
        return {
          icon: <AlertCircle className="w-6 h-6" />,
          label: 'Missed Turn',
          color: 'bg-error-light text-error border-error/20',
          description: 'You missed your turn. Please reschedule.'
        };
      default:
        return {
          icon: <Clock className="w-6 h-6" />,
          label: 'Unknown',
          color: 'bg-muted text-muted-foreground border-border',
          description: ''
        };
    }
  };

  const statusInfo = getStatusInfo(currentTicket.status);

  const handleCancel = () => {
    // Simulate cancellation
    onBack();
  };

  const handleReschedule = () => {
    // Simulate rescheduling
    setCurrentTicket(prev => ({
      ...prev,
      status: 'waiting',
      position: prev.totalInQueue + 1,
      estimatedTime: prev.estimatedTime + 15
    }));
  };

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
              <h1 className="text-2xl font-bold">Queue Ticket</h1>
              <p className="text-primary-foreground/80 text-sm">
                {currentTicket.serviceName} • {currentTicket.subServiceName}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-primary-foreground/10"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Token Number Card */}
        <Card className="p-8 text-center bg-gradient-to-br from-primary-light to-secondary/30 border-none shadow-medium">
          <div className="mb-4">
            <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-3">
              {statusInfo.icon}
            </div>
            <Badge className={`${statusInfo.color} text-sm px-4 py-2`}>
              {statusInfo.label}
            </Badge>
          </div>
          
          <div className="text-6xl font-bold text-primary mb-2">
            {currentTicket.tokenNumber.toString().padStart(3, '0')}
          </div>
          
          <p className="text-muted-foreground text-lg font-medium mb-4">
            Your Token Number
          </p>
          
          <p className="text-muted-foreground">
            {statusInfo.description}
          </p>
        </Card>

        {/* Queue Progress */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-card-foreground">Queue Progress</h3>
            <span className="text-sm text-muted-foreground">
              {currentTicket.position} of {currentTicket.totalInQueue}
            </span>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Position</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                #{currentTicket.position}
              </div>
            </div>
            
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Est. Time</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {currentTicket.estimatedTime}m
              </div>
            </div>
          </div>
        </Card>

        {/* Current Status */}
        <Card className="p-6">
          <h3 className="font-semibold text-card-foreground mb-3">Current Status</h3>
          <div className={`p-4 rounded-lg border-2 ${statusInfo.color}`}>
            <div className="flex items-center space-x-3">
              {statusInfo.icon}
              <div>
                <div className="font-semibold">{statusInfo.label}</div>
                <div className="text-sm opacity-80">{statusInfo.description}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {currentTicket.status === 'missed' ? (
            <Button 
              onClick={handleReschedule}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-6"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reschedule Appointment
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="w-full border-error/20 text-error hover:bg-error-light py-6"
              size="lg"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel Appointment
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
          💡 You'll receive a notification when it's almost your turn
        </div>
      </div>
    </div>
  );
}