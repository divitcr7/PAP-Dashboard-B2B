import { useState } from "react";
import {
  ArrowLeft,
  User,
  Calendar,
  DollarSign,
  FileText,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router";

const PreviousTenantsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const previousTenants = [
    {
      id: 1,
      name: "Sarah Johnson",
      unit: "A-101",
      property: "Sunset Apartments",
      leaseStart: "2021-01-15",
      leaseEnd: "2023-12-31",
      monthlyRent: 1200,
      reason: "Lease Expired",
      status: "Good Standing",
    },
    {
      id: 2,
      name: "Mike Chen",
      unit: "B-205",
      property: "Downtown Lofts",
      leaseStart: "2020-06-01",
      leaseEnd: "2023-05-31",
      monthlyRent: 1800,
      reason: "Relocated",
      status: "Good Standing",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      unit: "C-302",
      property: "Garden View Complex",
      leaseStart: "2019-03-01",
      leaseEnd: "2023-02-28",
      monthlyRent: 1500,
      reason: "Purchased Home",
      status: "Good Standing",
    },
  ];

  const PreviousTenantCard = ({ tenant }: { tenant: any }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
          <p className="text-sm text-gray-600">
            {tenant.property} - Unit {tenant.unit}
          </p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            tenant.status === "Good Standing"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {tenant.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center text-gray-600 mb-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">Lease Period</span>
          </div>
          <p className="font-semibold text-gray-900 text-sm">
            {tenant.leaseStart} to {tenant.leaseEnd}
          </p>
        </div>
        <div>
          <div className="flex items-center text-gray-600 mb-1">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="text-sm">Monthly Rent</span>
          </div>
          <p className="font-semibold text-gray-900">
            ${tenant.monthlyRent.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Reason for leaving:</span>{" "}
          {tenant.reason}
        </p>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-xl hover:bg-blue-100 transition-colors duration-200">
          <FileText className="h-4 w-4 inline mr-1" />
          View Records
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors duration-200">
          Contact Info
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard/tenants"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        {/* <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search previous tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
            <div className="flex space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                <option value="all">All Status</option>
                <option value="good">Good Standing</option>
                <option value="issues">Had Issues</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div> */}

        {/* Previous Tenants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previousTenants.map((tenant) => (
            <PreviousTenantCard key={tenant.id} tenant={tenant} />
          ))}
        </div>

        {/* Empty State */}
        {previousTenants.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No previous tenants found
            </h3>
            <p className="text-gray-600">
              Previous tenant records will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousTenantsPage;
