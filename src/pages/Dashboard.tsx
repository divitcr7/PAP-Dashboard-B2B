"use client"

import React, { useState } from "react"
import { Routes, Route, Link, useLocation, useNavigate } from "react-router"
import {
  Home,
  Building,
  Users,
  FileText,
  MessageSquare,
  Star,
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
  UserCheck,
  ChevronRight,
  ChevronDown,
  X,
  Search,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Import page components
import OverviewPage from "./dashboard/OverviewPage"
import PropertiesPage from "./dashboard/PropertiesPage"
import TenantsPage from "./dashboard/TenantsPage"
import MaintenancePage from "./dashboard/MaintenancePage"
import MessagesPage from "./dashboard/MessagesPage"
import SettingsPage from "./dashboard/SettingsPage"
import AccountPage from "./dashboard/AccountPage"
import PreviousTenantsPage from "./dashboard/PreviousTenantsPage"
import UnitsPage from "./dashboard/UnitsPage"

const Dashboard: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const getCurrentSection = () => {
    const path = location.pathname.split("/").pop()
    switch (path) {
      case "properties":
        return "Properties"
      case "tenants":
        return "Tenants"
      case "maintenance":
        return "Maintenance"
      case "messages":
        return "Messages"
      case "reviews":
        return "Reviews"
      case "account":
        return "Account"
      case "settings":
        return "Settings"
      case "previous-tenants":
        return "Previous Tenants"
      case "units":
        return "Units"
      default:
        return "Overview"
    }
  }

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter((segment) => segment)
    const breadcrumbs = []
    if (pathSegments.length > 1) {
      if (pathSegments[1] === "previous-tenants") {
        breadcrumbs.push({ label: "Tenants", path: "/dashboard/tenants" })
        breadcrumbs.push({
          label: "Previous Tenants",
          path: "/dashboard/previous-tenants",
        })
      } else if (pathSegments[1] === "units") {
        breadcrumbs.push({
          label: "Properties",
          path: "/dashboard/properties",
        })
        breadcrumbs.push({ label: "Units", path: "/dashboard/units" })
      }
    }
    return breadcrumbs
  }

  const navigationItems = [
    { path: "/dashboard", icon: Home, label: "Overview", badge: null },
    { path: "/dashboard/properties", icon: Building, label: "Properties", badge: "12" },
    { path: "/dashboard/tenants", icon: Users, label: "Tenants", badge: "24" },
    { path: "/dashboard/maintenance", icon: FileText, label: "Maintenance", badge: "3" },
    { path: "/dashboard/messages", icon: MessageSquare, label: "Messages", badge: "5" },
    { path: "/dashboard/reviews", icon: Star, label: "Reviews", badge: null },
    { path: "/dashboard/account", icon: UserCheck, label: "Account", badge: null },
  ]

  const isActiveRoute = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-gray-200">
            {/* Mobile sidebar content */}
            <div className="flex flex-col h-full">
              {/* Mobile Logo */}
              <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Pick-A-Pad</h1>
                    <p className="text-xs text-gray-500">AI Property Management</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = isActiveRoute(item.path)
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile Settings */}
              <div className="border-t border-gray-200 p-4">
                <Link
                  to="/dashboard/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 ${
                    isActiveRoute("/dashboard/settings")
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings
                    className={`h-5 w-5 ${isActiveRoute("/dashboard/settings") ? "text-blue-600" : "text-gray-500"}`}
                  />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72 bg-white border-r border-gray-200 shadow-sm">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Pick-A-Pad</h1>
                <p className="text-xs text-gray-500">AI Property Management</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-200">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveRoute(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Settings */}
          <div className="border-t border-gray-200 p-4">
            <Link
              to="/dashboard/settings"
              className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 ${
                isActiveRoute("/dashboard/settings")
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Settings
                className={`h-5 w-5 ${isActiveRoute("/dashboard/settings") ? "text-blue-600" : "text-gray-500"}`}
              />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {getCurrentSection()}
                  </h1>
                  {getCurrentSection() === "Overview" && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Live</Badge>
                  )}
                </div>
                {getBreadcrumbs().length > 0 && (
                  <div className="flex items-center space-x-2 text-sm">
                    {getBreadcrumbs().map((crumb, index) => (
                      <React.Fragment key={crumb.path}>
                        <Link
                          to={crumb.path}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                        >
                          {crumb.label}
                        </Link>
                        {index < getBreadcrumbs().length - 1 && <ChevronRight className="h-4 w-4 text-gray-400" />}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg animate-pulse"></span>
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-3 px-4 py-2 h-auto hover:bg-gray-100 transition-all duration-200 rounded-xl"
                  >
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-semibold text-gray-900">Property Manager</p>
                      <p className="text-xs text-gray-500">admin@pickapad.com</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard/account")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/login")} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-white">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/units" element={<UnitsPage />} />
            <Route path="/tenants" element={<TenantsPage />} />
            <Route path="/previous-tenants" element={<PreviousTenantsPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
