import {
  Mail,
  MailOpen,
  Reply,
  Archive,
  Trash2,
  User,
  Clock,
  Search,
  Filter,
  Plus,
  Send,
  Star,
  Eye,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockMessages } from "../../data/mockData";

const MessageCard = ({ message }: { message: any }) => (
  <Card
    className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-white ${
      message.unread ? "border-l-4 border-l-blue-600" : ""
    }`}
  >
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3
              className={`font-bold group-hover:text-blue-600 transition-colors ${
                message.unread ? "text-gray-900" : "text-gray-700"
              }`}
            >
              {message.from}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{message.timestamp}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {message.unread ? (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
              <Mail className="h-3 w-3 mr-1" />
              New
            </Badge>
          ) : (
            <MailOpen className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      <div className="mb-4">
        <h4
          className={`font-semibold mb-2 ${
            message.unread ? "text-gray-900" : "text-gray-700"
          }`}
        >
          {message.subject}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {message.preview}
        </p>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-transparent hover:bg-blue-50 hover:border-blue-200"
        >
          <Reply className="h-3 w-3 mr-2" />
          Reply
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-gray-50">
          <Archive className="h-3 w-3 mr-1" />
          Archive
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Delete
        </Button>
      </div>
    </CardContent>
  </Card>
);

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
}: {
  title: string;
  description: string;
  icon: any;
  color: string;
  onClick: () => void;
}) => (
  <Card
    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-sm bg-white"
    onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div
          className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const MessagesPage = () => {
  const unreadMessages = mockMessages.filter((msg) => msg.unread);
  const readMessages = mockMessages.filter((msg) => !msg.unread);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Messages
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mockMessages.length}
                  </p>
                  <p className="text-sm text-blue-600 font-medium mt-1">
                    +12 this week
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <Mail className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Unread
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {unreadMessages.length}
                  </p>
                  <p className="text-sm text-yellow-600 font-medium mt-1">
                    Needs attention
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <Mail className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Response Rate
                  </p>
                  <p className="text-3xl font-bold text-green-600">98.7%</p>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    +2.3% this month
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                  <MessageSquare className="h-7 w-7 text-green-600" />
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
                  placeholder="Search messages..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <Star className="h-4 w-4 mr-2" />
                  Starred
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Sort by
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages Sections */}
        <div className="space-y-8">
          {/* Unread Messages */}
          {unreadMessages.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Unread Messages
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Messages requiring your attention
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-200"
                >
                  {unreadMessages.length} unread
                </Badge>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {unreadMessages.map((message) => (
                  <MessageCard key={message.id} message={message} />
                ))}
              </div>
            </div>
          )}

          {/* Read Messages */}
          {readMessages.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Messages
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Previously read conversations
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-800"
                >
                  {readMessages.length} read
                </Badge>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {readMessages.map((message) => (
                  <MessageCard key={message.id} message={message} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {mockMessages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No messages
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You're all caught up! No new messages to display.
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Send First Message
              </Button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <p className="text-gray-600 text-sm mt-1">
                Common communication tasks
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickActionCard
              title="Send Announcement"
              description="Broadcast message to all tenants"
              icon={Send}
              color="bg-blue-50 text-blue-600"
              onClick={() => {}}
            />
            <QuickActionCard
              title="Auto-Reply Settings"
              description="Configure automatic responses"
              icon={Reply}
              color="bg-green-50 text-green-600"
              onClick={() => {}}
            />
            <QuickActionCard
              title="Message Templates"
              description="Create reusable message templates"
              icon={Archive}
              color="bg-purple-50 text-purple-600"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
