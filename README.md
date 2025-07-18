# PAP Dashboard B2B - Property Management System

A comprehensive property management dashboard application built with React, TypeScript, and Tailwind CSS, specifically designed for property agents and administrators in Texas.

## 🏢 Overview

PAP Dashboard is a modern, AI-powered property management system that enables property owners, agents, and administrators to efficiently manage their rental properties, tenants, and lease agreements. The platform focuses exclusively on property leasing (not sales) and provides a complete solution for property management operations.

## ✨ Features

### 🔐 Authentication System

- **Secure Login/Signup**: Modern authentication with email and password
- **Role-based Access**: Support for Property Agents and Administrators
- **Password Recovery**: Forgot password functionality with email verification
- **Company Registration**: Multi-tenant support with company-specific accounts

### 📊 Dashboard Overview

- **Real-time Analytics**: Key metrics and performance indicators
- **Property Portfolio**: Total properties, units, and occupancy rates
- **Revenue Tracking**: Monthly revenue and financial performance
- **Activity Feed**: Recent activities and important notifications
- **Quick Actions**: Fast access to common tasks

### 🏠 Property Management

- **Property Portfolio**: Complete view of all properties
- **Property Details**: Comprehensive property information including:
  - Address and location details
  - Property type and year built
  - Unit count and occupancy status
  - Monthly revenue and financial metrics
  - Amenities and features
- **Unit Management**: Individual unit tracking with:
  - Unit specifications (bedrooms, bathrooms, square footage)
  - Rent amounts and security deposits
  - Tenant assignments and lease details
  - Maintenance history and upcoming inspections
  - Unit-specific amenities

### 👥 Tenant Management

- **Application Processing**:
  - Pending rental applications review
  - Applicant screening and background checks
  - Credit score and income verification
  - Document management and verification
  - Application approval/rejection workflow
- **Active Lease Management**:
  - Current tenant information and contact details
  - Lease terms and renewal dates
  - Rent collection and payment tracking
  - Lease modification and renewal options
- **Lease Renewal System**:
  - Automated renewal reminders
  - Lease expiration tracking
  - Renewal negotiation tools
  - Rent increase requests

### 🔧 Maintenance Management

- **Request Tracking**: Organized by priority levels (High, Medium, Low)
- **Status Management**: Pending, In Progress, Completed requests
- **Contractor Assignment**: Assign maintenance tasks to contractors
- **Tenant Communication**: Direct communication regarding maintenance issues
- **Maintenance History**: Complete maintenance records per unit

### 💬 Communication System

- **Tenant Messaging**: Direct communication with tenants
- **Priority-based Messages**: High, Medium, Low priority classification
- **Message Threading**: Organized conversation history
- **Automated Notifications**: System-generated alerts and updates
- **Bulk Messaging**: Send messages to multiple tenants

### ⭐ Review & Rating System

- **Tenant Reviews**: Collect and manage tenant feedback
- **Overall Rating**: Property-wide rating aggregation
- **Review Analytics**: Rating distribution and trends
- **Response Management**: Respond to tenant reviews
- **Public Review Display**: Showcase positive reviews

### 📱 Additional Features

- **Responsive Design**: Mobile-friendly interface
- **Dark/Light Mode**: Theme customization options
- **Export/Import**: Data export capabilities
- **Search & Filter**: Advanced search and filtering options
- **Notification System**: Real-time alerts and updates

## 🛠 Technical Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v4 with custom components
- **Routing**: React Router DOM v6
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Code Quality**: ESLint for code linting and standards

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd PAP-Dashboard-B2B
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
PAP-Dashboard-B2B/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ForgotPassword.tsx
│   ├── pages/              # Main application pages
│   │   ├── Dashboard.tsx   # Main dashboard with all features
│   │   ├── Login.tsx       # Login authentication
│   │   └── Signup.tsx      # User registration
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and Tailwind imports
├── public/                 # Static assets
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## 🎨 Design System

### Color Palette

- **Primary Blue**: #3b82f6 (Blue-500)
- **Secondary Blue**: #1e40af (Blue-700)
- **Success Green**: #16a34a (Green-600)
- **Warning Yellow**: #ca8a04 (Yellow-600)
- **Error Red**: #dc2626 (Red-600)
- **Neutral Gray**: #6b7280 (Gray-500)

### Typography

- **Primary Font**: System font stack for optimal performance
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Components

- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, success, danger)
- **Forms**: Consistent input styling with focus states
- **Navigation**: Clean sidebar with active states

## 🔒 Security Features

- **Authentication**: Secure login/logout functionality
- **Route Protection**: Protected routes for authenticated users
- **Role-based Access**: Different access levels for agents and admins
- **Data Validation**: Client-side form validation
- **Secure State Management**: Proper state handling for user sessions

## 📊 Mock Data

The application includes comprehensive mock data for demonstration:

- **3 Properties** with realistic Texas locations (Austin, Houston, Dallas)
- **Multiple Units** with varying specifications and tenant assignments
- **Rental Applications** with complete applicant information
- **Maintenance Requests** with different priority levels
- **Tenant Communications** with realistic message threads
- **Review Data** with ratings and tenant feedback

## 🌟 Key Features for Property Management

### For Property Agents

- Manage assigned properties and units
- Process rental applications
- Handle tenant communications
- Track maintenance requests
- Monitor lease renewals

### For Administrators

- Oversee all properties in the portfolio
- Manage agent accounts and permissions
- Generate reports and analytics
- Handle advanced system configurations
- Monitor overall portfolio performance

## 🔄 Future Enhancements

- **Payment Integration**: Stripe/PayPal for rent collection
- **Document Management**: Digital lease agreements and contracts
- **Advanced Analytics**: Detailed financial reporting and insights
- **Mobile App**: Native mobile application for on-the-go management
- **AI-powered Features**: Predictive maintenance and tenant screening
- **Integration APIs**: Connect with accounting and property management software

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- Email: <support@pick-a-pad.com>
- Website: <https://partners.pick-a-pad.com>
- Consumer Site: <https://www.pick-a-pad.com>

---

**PAP Dashboard B2B** - Revolutionizing property management in Texas, one lease at a time.
