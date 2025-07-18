"use client"

import {
  Building,
  Users,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Wrench,
  Plus,
  Calendar,
  Bell,
  Star,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockStats, mockProperties, mockMaintenanceRequests, mockMessages } from "../../data/mockData"

const StatsCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType,
  color = "blue",
  progress,
}: {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: "positive" | "negative"
  color?: string
  progress?: number
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
  }

  return (
    <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <p
                className={`text-sm mt-2 flex items-center font-medium ${
                  changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}
              >
                <ArrowUpRight className="h-4 w-4 mr-1" />
                {change}
              </p>
            )}
          </div>
          <div
            className={`p-4 rounded-2xl border transition-all duration-300 group-hover:scale-110 ${
              colorClasses[color as keyof typeof colorClasses]
            }`}
          >
            <Icon className="h-7 w-7" />
          </div>
        </div>
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
}: {
  title: string
  description: string
  icon: LucideIcon
  color: string
  onClick: () => void
}) => (
  <Card
    className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group"
    onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className={`p-4 rounded-2xl ${color} transition-all duration-300 group-hover:scale-110`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </div>
    </CardContent>
  </Card>
)

const ActivityItem = ({ activity }: { activity: any }) => (
  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-sm transition-all duration-200">
    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-900">{activity.issue}</p>
      <p className="text-xs text-gray-500 mt-1">
        {activity.unit} • {activity.dateSubmitted}
      </p>
    </div>
    <Badge variant="secondary" className="text-xs">
      {activity.status}
    </Badge>
  </div>
)

const PropertyCard = ({ property }: { property: any }) => (
  <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300 group">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{property.name}</h3>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      </div>
      <p className="text-sm text-gray-600 mb-6 font-medium">{property.address}</p>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Occupancy Rate</p>
          <p className="text-2xl font-bold text-gray-900">{property.occupancyRate}%</p>
          <Progress value={property.occupancyRate} className="h-2 mt-2" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${property.monthlyRevenue.toLocaleString()}</p>
        </div>
      </div>
      <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 bg-transparent">
        View Details
      </Button>
    </CardContent>
  </Card>
)

const OverviewPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Property Manager! 👋</h1>
              <p className="text-gray-600">Here's what's happening with your properties today.</p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
              <Button variant="outline" className="bg-white">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Tour
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Properties"
            value={mockStats.totalProperties}
            icon={Building}
            change="+2 this month"
            changeType="positive"
            color="blue"
            progress={85}
          />
          <StatsCard
            title="Total Units"
            value={mockStats.totalUnits}
            icon={Users}
            change="+8 this month"
            changeType="positive"
            color="green"
            progress={92}
          />
          <StatsCard
            title="Occupancy Rate"
            value={`${mockStats.occupancyRate}%`}
            icon={TrendingUp}
            change="+2.1% from last month"
            changeType="positive"
            color="purple"
            progress={mockStats.occupancyRate}
          />
          <StatsCard
            title="Monthly Revenue"
            value={`$${mockStats.monthlyRevenue.toLocaleString()}`}
            icon={DollarSign}
            change="+12.5% from last month"
            changeType="positive"
            color="orange"
            progress={78}
          />
        </div>

        {/* Quick Actions and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <Badge variant="secondary">6 available</Badge>
            </div>
            <div className="space-y-4">
              <QuickActionCard
                title="View Properties"
                description="Manage your property portfolio"
                icon={Building}
                color="bg-blue-50 text-blue-600"
                onClick={() => {}}
              />
              <QuickActionCard
                title="Manage Tenants"
                description="Review applications and leases"
                icon={Users}
                color="bg-green-50 text-green-600"
                onClick={() => {}}
              />
              <QuickActionCard
                title="Maintenance Requests"
                description="Handle property maintenance"
                icon={Wrench}
                color="bg-orange-50 text-orange-600"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {mockMaintenanceRequests.slice(0, 4).map((request) => (
                <ActivityItem key={request.id} activity={request} />
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Messages</h2>
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-gray-400" />
                <Badge variant="secondary">{mockMessages.filter((m) => m.unread).length}</Badge>
              </div>
            </div>
            <div className="space-y-4">
              {mockMessages.slice(0, 4).map((message) => (
                <div
                  key={message.id}
                  className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900">{message.from}</p>
                    {message.unread && (
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{message.subject}</p>
                  <p className="text-xs text-gray-500">{message.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Overview */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Properties</h2>
              <p className="text-gray-600 mt-1">Manage and monitor your property portfolio</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Star className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                View All Properties
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
