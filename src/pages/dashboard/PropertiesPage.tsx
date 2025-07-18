"use client"

import { Link } from "react-router"
import {
  Building,
  MapPin,
  Users,
  Grid,
  Plus,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockProperties } from "../../data/mockData"

const PropertyCard = ({ property }: { property: any }) => (
  <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-white overflow-hidden">
    <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20"></div>
      <Building className="h-16 w-16 text-blue-500 relative z-10" />
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="bg-white/80 backdrop-blur-sm hover:bg-white">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit Property
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{property.name}</h3>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Active</Badge>
      </div>

      <div className="flex items-center text-gray-600 mb-6">
        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
        <span className="text-sm font-medium">{property.address}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">Occupancy</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mb-1">
            {property.occupiedUnits}/{property.totalUnits}
          </p>
          <Progress value={property.occupancyRate} className="h-2" />
          <p className="text-xs text-blue-600 mt-1">{property.occupancyRate}%</p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-700">Revenue</span>
          </div>
          <p className="text-2xl font-bold text-green-900">${property.monthlyRevenue.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-1">per month</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent hover:bg-gray-50">
          <Edit className="h-4 w-4 mr-2" />
          Manage
        </Button>
      </div>
    </CardContent>
  </Card>
)

const PropertiesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Portfolio</h1>
              <p className="text-gray-600">Manage and monitor all your properties in one place</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild className="bg-white">
                <Link to="/dashboard/units">
                  <Grid className="h-4 w-4 mr-2" />
                  View Units
                </Link>
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Properties</p>
                  <p className="text-3xl font-bold text-gray-900">{mockProperties.length}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">+2 this month</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <Building className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Units</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mockProperties.reduce((sum, p) => sum + p.totalUnits, 0)}
                  </p>
                  <p className="text-sm text-green-600 font-medium mt-1">+8 this month</p>
                </div>
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                  <Users className="h-7 w-7 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Avg Occupancy</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.round(mockProperties.reduce((sum, p) => sum + p.occupancyRate, 0) / mockProperties.length)}%
                  </p>
                  <p className="text-sm text-green-600 font-medium mt-1">+2.1% this month</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                  <TrendingUp className="h-7 w-7 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${mockProperties.reduce((sum, p) => sum + p.monthlyRevenue, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 font-medium mt-1">+12.5% this month</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <DollarSign className="h-7 w-7 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search properties..." className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" />
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Sort by
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">All Properties</h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {mockProperties.length} properties
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {mockProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by adding your first property to begin managing your portfolio.
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Property
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertiesPage
