import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Hospital, 
  Building2, 
  Utensils, 
  Scissors, 
  LandmarkIcon, 
  Wrench,
  ArrowLeft,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  X,
  ChevronRight
} from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import { QueueTicket } from "./QueueTicket";
import { AdminDashboard } from "./AdminDashboard";

type ViewMode = 'home' | 'service' | 'queue' | 'admin';

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

interface QueueTicketData {
  tokenNumber: number;
  serviceName: string;
  subServiceName: string;
  estimatedTime: number;
  status: 'waiting' | 'on-way' | 'serving' | 'missed';
  position: number;
  totalInQueue: number;
}

const services: Service[] = [
  {
    id: 'hospital',
    name: 'Hospital',
    icon: <Hospital className="w-6 h-6" />,
    description: 'Medical services & appointments',
    subServices: [
      { id: 'opd', name: 'OPD Consultation', description: 'General physician consultation', avgWaitTime: 25, currentQueue: 8 },
      { id: 'specialist', name: 'Specialist Clinics', description: 'Cardiology, Orthopedics, etc.', avgWaitTime: 35, currentQueue: 12 },
      { id: 'diagnostics', name: 'Diagnostic Center', description: 'Pathology & Radiology', avgWaitTime: 15, currentQueue: 5 },
      { id: 'pharmacy', name: 'Pharmacy', description: 'Medicine collection', avgWaitTime: 8, currentQueue: 3 }
    ]
  },
  {
    id: 'bank',
    name: 'Bank',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Banking & financial services',
    subServices: [
      { id: 'teller', name: 'Teller Services', description: 'Cash deposit & withdrawal', avgWaitTime: 12, currentQueue: 6 },
      { id: 'loans', name: 'Loan Advisory', description: 'Personal & business loans', avgWaitTime: 30, currentQueue: 4 },
      { id: 'customer-care', name: 'Customer Care', description: 'Account issues & support', avgWaitTime: 18, currentQueue: 7 }
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: <Utensils className="w-6 h-6" />,
    description: 'Dining & takeaway services',
    subServices: [
      { id: 'table', name: 'Table Reservation', description: 'Dine-in seating', avgWaitTime: 20, currentQueue: 9 },
      { id: 'takeaway', name: 'Takeaway Queue', description: 'Order pickup', avgWaitTime: 10, currentQueue: 4 }
    ]
  },
  {
    id: 'salon',
    name: 'Salon & Spa',
    icon: <Scissors className="w-6 h-6" />,
    description: 'Beauty & grooming services',
    subServices: [
      { id: 'haircut', name: 'Haircut & Styling', description: 'Hair services', avgWaitTime: 45, currentQueue: 6 },
      { id: 'beauty', name: 'Beauty Services', description: 'Facial, manicure, etc.', avgWaitTime: 60, currentQueue: 4 }
    ]
  },
  {
    id: 'government',
    name: 'Government Office',
    icon: <LandmarkIcon className="w-6 h-6" />,
    description: 'Citizen services & documents',
    subServices: [
      { id: 'documents', name: 'Document Submission', description: 'Passport, Aadhar, License', avgWaitTime: 40, currentQueue: 15 },
      { id: 'citizen-desk', name: 'Citizen Service Desk', description: 'General inquiries', avgWaitTime: 25, currentQueue: 8 }
    ]
  },
  {
    id: 'service-center',
    name: 'Service Center',
    icon: <Wrench className="w-6 h-6" />,
    description: 'Repair & technical services',
    subServices: [
      { id: 'electronics', name: 'Electronics Repair', description: 'Phone, laptop repair', avgWaitTime: 30, currentQueue: 5 },
      { id: 'support', name: 'Customer Support', description: 'Technical assistance', avgWaitTime: 20, currentQueue: 3 }
    ]
  }
];

export function QueueManager() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);
  const [queueTicket, setQueueTicket] = useState<QueueTicketData | null>(null);
  const [userRole, setUserRole] = useState<'customer' | 'admin'>('customer');

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentView('service');
  };

  const handleSubServiceSelect = (subService: SubService) => {
    setSelectedSubService(subService);
    // Simulate joining queue
    const newTicket: QueueTicketData = {
      tokenNumber: Math.floor(Math.random() * 900) + 100,
      serviceName: selectedService?.name || '',
      subServiceName: subService.name,
      estimatedTime: subService.avgWaitTime + Math.floor(Math.random() * 10),
      status: 'waiting',
      position: subService.currentQueue + 1,
      totalInQueue: subService.currentQueue + 1
    };
    setQueueTicket(newTicket);
    setCurrentView('queue');
  };

  const handleBack = () => {
    if (currentView === 'service') {
      setCurrentView('home');
      setSelectedService(null);
    } else if (currentView === 'queue') {
      setCurrentView('service');
      setQueueTicket(null);
    } else if (currentView === 'admin') {
      setCurrentView('home');
    }
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

  // Home View
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-medium">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Queue Manager</h1>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setCurrentView('admin')}
              className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              {userRole === 'customer' ? 'Staff Login' : 'Dashboard'}
            </Button>
          </div>
          <p className="text-primary-foreground/80 text-sm">
            Join digital queues and track your turn in real-time
          </p>
        </div>

        {/* Services Grid */}
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">Choose a Service</h2>
          <div className="grid gap-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.name}
                description={service.description}
                onClick={() => handleServiceSelect(service)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Service Selection View
  if (currentView === 'service' && selectedService) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-medium">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
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
                <p className="text-primary-foreground/80 text-sm">{selectedService.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-services */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Select a Service</h2>
          <div className="space-y-4">
            {selectedService.subServices.map((subService) => (
              <Card
                key={subService.id}
                className="p-4 cursor-pointer hover:shadow-soft transition-all duration-300 hover:scale-[1.02]"
                onClick={() => handleSubServiceSelect(subService)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground mb-1">
                      {subService.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {subService.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">~{subService.avgWaitTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{subService.currentQueue} in queue</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Queue Ticket View
  if (currentView === 'queue' && queueTicket) {
    return <QueueTicket ticket={queueTicket} onBack={handleBack} />;
  }

  // Admin Dashboard View
  if (currentView === 'admin') {
    return <AdminDashboard services={services} onBack={handleBack} />;
  }

  return null;
}