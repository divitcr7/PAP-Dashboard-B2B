import {
  Plus,
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Search,
  Filter,
  Building,
  Eye,
  TrendingUp,
  DollarSign,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { mockMaintenanceRequests } from "../../data/mockData"

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    case "in-progress":
      return <Wrench className="h-4 w-4" />
    case "pending":
      return <Clock className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const MaintenanceCard = ({ request }: { request: any }) => (
  <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-white">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {request.issue}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium">{request.tenant}</span>
            </div>
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-2 text-gray-400" />
              <span>Unit {request.unit}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>{request.dateSubmitted}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <Badge className={`border ${getPriorityColor(request.priority)}`}>
            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
          </Badge>
          <Badge className={`border ${getStatusColor(request.status)}`}>
            <span className="flex items-center space-x-1">
              {getStatusIcon(request.status)}
              <span>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
            </span>
          </Badge>
        </div>
      </div>

      {request.assignedTo && (
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Assigned to:</span> {request.assignedTo}
          </p>
        </div>
      )}

      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1 bg-transparent hover:bg-blue-50 hover:border-blue-200">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
        {request.status === "pending" && (
          <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
            <User className="h-4 w-4 mr-2" />
            Assign
          </Button>
        )}
        {request.status === "in-progress" && (
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
)

const MaintenancePage = () => {
  const pendingRequests = mockMaintenanceRequests.filter((req) => req.status === "pending")
  const inProgressRequests = mockMaintenanceRequests.filter((req) => req.status === "in-progress")
  const completedRequests = mockMaintenanceRequests.filter((req) => req.status === "completed")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Maintenance Management</h1>
              <p className="text-gray-600">Track and manage all property maintenance requests</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="bg-white">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                New Request
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
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Requests</p>
                  <p className="text-3xl font-bold text-gray-900">{mockMaintenanceRequests.length}</p>
                  <p className="text-sm text-blue-600 font-medium mt-1">+5 this week</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <Wrench className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingRequests.length}</p>
                  <Progress
                    value={(pendingRequests.length / mockMaintenanceRequests.length) * 100}
                    className="h-2 mt-2"
                  />
                </div>
                <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                  <Clock className="h-7 w-7 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600">{inProgressRequests.length}</p>
                  <Progress
                    value={(inProgressRequests.length / mockMaintenanceRequests.length) * 100}
                    className="h-2 mt-2"
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <Wrench className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{completedRequests.length}</p>
                  <Progress
                    value={(completedRequests.length / mockMaintenanceRequests.length) * 100}
                    className="h-2 mt-2"
                  />
                </div>
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                  <CheckCircle className="h-7 w-7 text-green-600" />
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
                <Input
                  placeholder="Search maintenance requests..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Priority
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Requests Sections */}
        <div className="space-y-8">
          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pending Requests</h2>
                  <p className="text-gray-600 text-sm mt-1">Requests awaiting assignment</p>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  {pendingRequests.length} pending
                </Badge>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pendingRequests.map((request) => (
                  <MaintenanceCard key={request.id} request={request} />
                ))}
              </div>
            </div>
          )}

          {/* In Progress Requests */}
          {inProgressRequests.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">In Progress</h2>
                  <p className="text-gray-600 text-sm mt-1">Currently being worked on</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  {inProgressRequests.length} active
                </Badge>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {inProgressRequests.map((request) => (
                  <MaintenanceCard key={request.id} request={request} />
                ))}
              </div>
            </div>
          )}

          {/* All Requests */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">All Requests</h2>
                <p className="text-gray-600 text-sm mt-1">Complete maintenance history</p>
              </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                {mockMaintenanceRequests.length} total
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockMaintenanceRequests.map((request) => (
                <MaintenanceCard key={request.id} request={request} />
              ))}
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
                <p className="text-gray-600 text-sm mt-1">Maintenance metrics and insights</p>
              </div>
              <Button variant="outline" className="bg-transparent">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Full Report
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-green-800">Avg Response Time</h3>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-900 mb-2">2.3 hours</p>
                <p className="text-sm text-green-700">15% faster than last month</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-blue-800">Completion Rate</h3>
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-900 mb-2">94.2%</p>
                <p className="text-sm text-blue-700">+3.1% from last month</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-purple-800">Avg Cost</h3>
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-900 mb-2">$247</p>
                <p className="text-sm text-purple-700">8% lower than average</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MaintenancePage
