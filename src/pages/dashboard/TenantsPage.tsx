import {
  User,
  Calendar,
  DollarSign,
  MapPin,
  Building,
  Users,
  Clock,
  Filter,
  Eye,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockTenants, mockApplications } from "../../data/mockData"

const TenantCard = ({ tenant }: { tenant: any }) => (
  <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-white">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {tenant.name}
            </h3>
            <p className="text-sm text-gray-600 font-medium flex items-center">
              <Building className="h-4 w-4 mr-1" />
              Unit {tenant.unit}
            </p>
          </div>
        </div>
        <Badge
          variant={tenant.status === "active" ? "default" : "secondary"}
          className={
            tenant.status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
              : "bg-gray-100 text-gray-800"
          }
        >
          {tenant.status === "active" ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="flex items-center text-green-700 text-sm mb-2">
            <DollarSign className="h-4 w-4 mr-2" />
            Monthly Rent
          </div>
          <p className="text-2xl font-bold text-green-900">${tenant.rent.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className="flex items-center text-blue-700 text-sm mb-2">
            <Calendar className="h-4 w-4 mr-2" />
            Lease Ends
          </div>
          <p className="text-2xl font-bold text-blue-900">{tenant.leaseEnd}</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent hover:bg-blue-50 hover:border-blue-200">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button
          size="sm"
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </div>
    </CardContent>
  </Card>
)

const ApplicationCard = ({ application }: { application: any }) => (
  <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-white">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {application.applicantName}
        </h4>
        <Badge
          variant={application.status === "pending" ? "secondary" : "default"}
          className={
            application.status === "pending"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
              : "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
          }
        >
          {application.status === "pending" ? "Pending Review" : "Approved"}
        </Badge>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-3 text-gray-400" />
          <span className="font-medium text-gray-700">Property:</span>
          <span className="ml-2 text-gray-900">{application.propertyName}</span>
        </div>
        <div className="flex items-center text-sm">
          <Building className="h-4 w-4 mr-3 text-gray-400" />
          <span className="font-medium text-gray-700">Unit Type:</span>
          <span className="ml-2 text-gray-900">{application.unitType}</span>
        </div>
        <div className="flex items-center text-sm">
          <DollarSign className="h-4 w-4 mr-3 text-gray-400" />
          <span className="font-medium text-gray-700">Monthly Income:</span>
          <span className="ml-2 text-gray-900 font-semibold">${application.monthlyIncome.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-3 text-gray-400" />
          <span className="font-medium text-gray-700">Applied:</span>
          <span className="ml-2 text-gray-900">{application.applicationDate}</span>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          size="sm"
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Approve
        </Button>
        <Button variant="destructive" size="sm" className="flex-1">
          <AlertCircle className="h-4 w-4 mr-2" />
          Reject
        </Button>
      </div>
    </CardContent>
  </Card>
)

const TenantsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-8 space-y-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{mockApplications.length}</p>
                  <p className="text-sm text-blue-600 font-medium mt-1">+3 this week</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <User className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Tenants</p>
                  <p className="text-3xl font-bold text-gray-900">{mockTenants.length}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">98% occupancy</p>
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
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending Reviews</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mockApplications.filter((app) => app.status === "pending").length}
                  </p>
                  <p className="text-sm text-yellow-600 font-medium mt-1">Needs attention</p>
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
                  <p className="text-sm font-medium text-gray-600 mb-1">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${mockTenants.reduce((sum, tenant) => sum + tenant.rent, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 font-medium mt-1">+8.2% this month</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                  <DollarSign className="h-7 w-7 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Applications Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Pending Applications</h2>
              <p className="text-gray-600 text-sm mt-1">Review and approve new tenant applications</p>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
              {mockApplications.filter((app) => app.status === "pending").length} pending
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </div>

        {/* Active Tenants Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Active Tenants</h2>
              <p className="text-gray-600 text-sm mt-1">Manage your current tenant relationships</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex space-x-3">
                <Button variant="outline" className="bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Sort by
                </Button>
              </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              {mockTenants.length} active
            </Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTenants.map((tenant) => (
              <TenantCard key={tenant.id} tenant={tenant} />
            ))}
          </div>
        </div>

        {/* Lease Renewals Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upcoming Lease Renewals</h2>
              <p className="text-gray-600 text-sm mt-1">Tenants with leases expiring in the next 90 days</p>
            </div>
            <Button variant="outline" className="bg-transparent">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-8">
              <div className="space-y-6">
                {mockTenants
                  .filter((tenant) => {
                    const leaseEnd = new Date(tenant.leaseEnd)
                    const today = new Date()
                    const diffTime = leaseEnd.getTime() - today.getTime()
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                    return diffDays <= 90 && diffDays > 0
                  })
                  .map((tenant) => {
                    const leaseEnd = new Date(tenant.leaseEnd)
                    const today = new Date()
                    const diffTime = leaseEnd.getTime() - today.getTime()
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                    return (
                      <div
                        key={tenant.id}
                        className="flex items-center justify-between p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200/50 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center">
                            <Calendar className="h-7 w-7 text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{tenant.name}</h4>
                            <p className="text-sm text-gray-600">
                              Unit {tenant.unit} • Lease expires in{" "}
                              <span className="font-semibold text-yellow-700">{diffDays} days</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Current rent: ${tenant.rent.toLocaleString()}/month
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                            Send Renewal
                          </Button>
                          <Button variant="outline" className="bg-white">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TenantsPage
