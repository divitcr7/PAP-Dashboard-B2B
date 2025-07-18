"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Building,
  Users,
  Calendar,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { Link } from "react-router";

const UnitsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const units = [
    {
      id: 1,
      unitNumber: "A-101",
      property: "Sunset Apartments",
      type: "1 Bedroom",
      sqft: 750,
      rent: 1200,
      status: "occupied",
      tenant: "John Smith",
      leaseEnd: "2024-12-31",
    },
    {
      id: 2,
      unitNumber: "A-102",
      property: "Sunset Apartments",
      type: "2 Bedroom",
      sqft: 950,
      rent: 1500,
      status: "vacant",
      tenant: null,
      leaseEnd: null,
    },
    {
      id: 3,
      unitNumber: "B-201",
      property: "Downtown Lofts",
      type: "Studio",
      sqft: 500,
      rent: 1000,
      status: "maintenance",
      tenant: null,
      leaseEnd: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-green-100 text-green-800";
      case "vacant":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const UnitCard = ({ unit }: { unit: any }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Unit {unit.unitNumber}
          </h3>
          <p className="text-sm text-gray-600">{unit.property}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
            unit.status
          )}`}
        >
          {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Type</p>
          <p className="font-semibold text-gray-900">{unit.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Size</p>
          <p className="font-semibold text-gray-900">{unit.sqft} sq ft</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Monthly Rent</p>
          <p className="font-semibold text-gray-900">
            ${unit.rent.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <p className="font-semibold text-gray-900">
            {unit.status === "occupied"
              ? "Occupied"
              : unit.status === "vacant"
              ? "Available"
              : "Maintenance"}
          </p>
        </div>
      </div>

      {unit.tenant && (
        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">
              {unit.tenant}
            </span>
          </div>
          {unit.leaseEnd && (
            <div className="flex items-center space-x-2 mt-1">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                Lease ends {unit.leaseEnd}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex space-x-2">
        <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-xl hover:bg-blue-100 transition-colors duration-200">
          View Details
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors duration-200">
          Edit Unit
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
              to="/dashboard/properties"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
            <Plus className="h-4 w-4" />
            <span>Add Unit</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-gray-900">
                  {units.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Building className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-green-600">
                  {units.filter((u) => u.status === "occupied").length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Users className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vacant</p>
                <p className="text-2xl font-bold text-blue-600">
                  {units.filter((u) => u.status === "vacant").length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Building className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {units.filter((u) => u.status === "maintenance").length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Building className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search units..."
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
                <option value="occupied">Occupied</option>
                <option value="vacant">Vacant</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitsPage;
