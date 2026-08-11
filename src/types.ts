export interface Booking {
  id: string;
  referenceCode: string;
  serviceType: string;
  propertyType: string;
  squareFootage: number;
  material: string;
  address: string;
  city: string;
  postalCode: string;
  date: string;
  timeSlot: string;
  status: "Confirmed" | "Inspection Scheduled" | "Technician Assigned" | "Completed";
  customerName: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;
  estimatedCost: string;
  photoUrl?: string;
}

export interface ServiceOption {
  id: string;
  title: string;
  category: "residential" | "commercial" | "emergency" | "maintenance";
  description: string;
  priceRange: string;
  duration: string;
  features: string[];
  popular?: boolean;
  image?: string;
  iconName: string;
}

export interface AIInspectionResult {
  diagnosisSummary: string;
  severityLevel: "Low" | "Moderate" | "High" | "Critical Emergency";
  urgencyRating: string;
  recommendedAction: string;
  recommendedMaterials: string[];
  estimatedCostRangeCAD: string;
  preventiveAdvice: string;
  inspectionChecklist: string[];
}

export interface CostEstimateParams {
  squareFootage: number;
  roofSlope: "flat" | "standard" | "steep" | "multi_gable";
  material: "asphalt" | "architectural" | "metal" | "flat_tpo" | "cedar" | "slate";
  storyCount: 1 | 2 | 3;
  tearOffNeeded: boolean;
  skylightsCount: number;
  emergencyRush: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
}

export interface ServiceAreaResult {
  serviced: boolean;
  regionName: string;
  responseTime: string;
  message: string;
}
