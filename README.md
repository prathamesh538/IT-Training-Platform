# IT Training Platform

A comprehensive web application for IT training institutes, academies, and providers to post and manage webinars, seminars, and courses. Students can browse events and contact providers directly.

##  working link
https://it-training-platform.netlify.app/

## 🚀 Features

### For Training Providers
- **Event Management**: Create, edit, and manage training events
- **Auto-expiration**: Events automatically expire after their scheduled date
- **Real-time Statistics**: Track participants, revenue, and event performance
- **Provider Dashboard**: Comprehensive dashboard with analytics and insights

### For Students
- **Event Discovery**: Browse and search for training events
- **Direct Contact**: Contact providers directly through the platform
- **Category Filtering**: Filter events by type (webinar, seminar, course) and category
- **Provider Profiles**: View detailed information about training providers

### For Administrators
- **Event Approval System**: Review and approve/reject submitted events
- **Platform Management**: Monitor all events, providers, and platform statistics
- **Quality Control**: Ensure high-quality training content
- **Analytics Dashboard**: Comprehensive platform analytics and insights

## 🛠️ Technology Stack

- **Frontend**: React 18 with Material-UI
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Date Handling**: date-fns
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Styling**: Material-UI with custom CSS

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/prathamesh538/IT-Training-Platform.git
   cd IT-Training-Platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 👥 Demo Accounts

### Admin Account
- **Email**: admin@itplatform.com
- **Password**: admin123
- **Role**: Platform administrator with full access

### Provider Account
- **Email**: contact@techacademypro.com
- **Password**: provider123
- **Role**: Training provider with event management capabilities

### Student Account
- **Email**: student@example.com
- **Password**: student123
- **Role**: Student with browsing and enrollment capabilities

## 📱 Key Features

### Auto-Expiring Events
Events automatically expire after their scheduled date, ensuring the platform only shows relevant and current training opportunities.

### Direct Provider Contact
Students can contact training providers directly through the platform, facilitating seamless communication and enrollment.

### Admin Approval System
All events require admin approval before being published, ensuring quality control and maintaining platform standards.

### Real-time Analytics
Comprehensive dashboards provide real-time insights into event performance, participant engagement, and platform usage.

### Responsive Design
Fully responsive design that works seamlessly across desktop, tablet, and mobile devices.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation component
│   └── EventCard.js    # Event display component
├── context/            # React Context for state management
│   └── DataContext.js  # Main data context
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── Login.js        # Authentication page
│   ├── AdminDashboard.js    # Admin dashboard
│   ├── ProviderDashboard.js # Provider dashboard
│   ├── StudentDashboard.js  # Student dashboard
│   ├── EventForm.js    # Event creation/editing form
│   └── EventDetail.js  # Event detail page
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface using Material-UI
- **Intuitive Navigation**: Role-based navigation and dashboard access
- **Visual Feedback**: Toast notifications and status indicators
- **Accessibility**: WCAG compliant design with proper contrast and keyboard navigation
- **Mobile-First**: Responsive design optimized for all screen sizes

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 📊 Platform Statistics

The platform tracks various metrics including:
- Total events and active events
- Number of training providers
- Participant enrollment rates
- Event approval rates
- Revenue tracking for providers

## 🔒 Security Features

- Role-based access control
- Protected routes for different user types
- Input validation and sanitization
- Secure authentication system

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your preferred hosting service:
   - Netlify
   - Vercel
   - AWS S3
   - GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for the IT training community** 
