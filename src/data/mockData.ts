// Mock data for the dashboard application

export const mockProperties = [
  {
    id: 1,
    name: "Austin Prime Residences",
    address: "2401 E 6th St, Austin, TX 78702",
    totalUnits: 48,
    occupiedUnits: 42,
    occupancyRate: 87.5,
    monthlyRevenue: 96000,
    image: "/api/placeholder/300/200",
    status: "active"
  },
  {
    id: 2,
    name: "Downtown Corporate Lofts",
    address: "1200 Main St, Houston, TX 77002",
    totalUnits: 32,
    occupiedUnits: 28,
    occupancyRate: 87.5,
    monthlyRevenue: 84000,
    image: "/api/placeholder/300/200",
    status: "active"
  },
  {
    id: 3,
    name: "Garden View Estates",
    address: "3500 Oak Lawn Ave, Dallas, TX 75219",
    totalUnits: 72,
    occupiedUnits: 65,
    occupancyRate: 90.3,
    monthlyRevenue: 108000,
    image: "/api/placeholder/300/200",
    status: "active"
  }
];

export const mockUnits = [
  {
    id: 1,
    propertyId: 1,
    unitNumber: "A101",
    type: "1 Bedroom",
    rent: 1800,
    tenant: "John Smith",
    leaseEnd: "2024-12-31",
    status: "occupied"
  },
  {
    id: 2,
    propertyId: 1,
    unitNumber: "A102",
    type: "2 Bedroom",
    rent: 2200,
    tenant: "Sarah Johnson",
    leaseEnd: "2024-11-30",
    status: "occupied"
  },
  {
    id: 3,
    propertyId: 1,
    unitNumber: "A103",
    type: "1 Bedroom",
    rent: 1800,
    tenant: null,
    leaseEnd: null,
    status: "vacant"
  }
];

export const mockApplications = [
  {
    id: 1,
    applicantName: "Emily Davis",
    propertyName: "Austin Prime Residences",
    unitType: "A112",
    applicationDate: "2024-01-15",
    status: "pending",
    monthlyIncome: 5200
  },
  {
    id: 2,
    applicantName: "Michael Chen",
    propertyName: "Garden View Estates",
    unitType: "B205",
    applicationDate: "2024-01-14",
    status: "pending",
    monthlyIncome: 6800
  }
];

export const mockTenants = [
  {
    id: 1,
    name: "Alexandra Thompson",
    unit: "A-301",
    rent: 2100,
    leaseEnd: "2024-05-31",
    status: "active"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    unit: "B-205",
    rent: 1800,
    leaseEnd: "2024-07-31",
    status: "active"
  },
  {
    id: 3,
    name: "Robert Chen",
    unit: "C-105",
    rent: 2200,
    leaseEnd: "2024-03-31",
    status: "active"
  }
];

export const mockMaintenanceRequests = [
  {
    id: 1,
    tenant: "John Smith",
    unit: "A101",
    issue: "Leaky faucet in kitchen",
    priority: "medium",
    status: "in-progress",
    dateSubmitted: "2024-01-10",
    assignedTo: "Mike Johnson"
  },
  {
    id: 2,
    tenant: "Sarah Johnson",
    unit: "A102",
    issue: "Air conditioning not working",
    priority: "high",
    status: "pending",
    dateSubmitted: "2024-01-12",
    assignedTo: null
  }
];

export const mockMessages = [
  {
    id: 1,
    from: "John Smith",
    subject: "Lease Renewal Question",
    preview: "Hi, I wanted to ask about the lease renewal process...",
    timestamp: "2024-01-15 10:30 AM",
    unread: true
  },
  {
    id: 2,
    from: "Sarah Johnson",
    subject: "Maintenance Update",
    preview: "Thank you for the quick response on the AC repair...",
    timestamp: "2024-01-14 3:45 PM",
    unread: false
  }
];

export const mockReviews = [
  {
    id: 1,
    tenant: "Emily Davis",
    property: "Austin Prime Residences",
    rating: 5,
    comment: "Excellent management and quick response to maintenance requests.",
    date: "2024-01-10"
  },
  {
    id: 2,
    tenant: "Michael Chen",
    property: "Garden View Estates",
    rating: 4,
    comment: "Great location and well-maintained facilities.",
    date: "2024-01-08"
  }
];

export const mockStats = {
  totalProperties: 12,
  totalUnits: 324,
  occupancyRate: 89.2,
  monthlyRevenue: 486750,
  pendingApplications: 8,
  maintenanceRequests: 15,
  newMessages: 3
};