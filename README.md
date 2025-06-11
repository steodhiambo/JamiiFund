# JamiiFund 🌍

## Project Overview

JamiiFund is a modern, secure donation platform that connects generous donors with impactful community projects. Built with SvelteKit and integrated with Mpesa, it enables anonymous donations to verified social initiatives focused on clean water, education, and food security.

## ✨ Key Features

### 🎯 For Donors
- **Anonymous Donations** - No registration required, complete privacy protection
- **Secure Payments** - Integrated Mpesa STK Push for seamless transactions
- **Real-time Impact** - Live progress tracking and transparent fund usage
- **Mobile-First Design** - Optimized for all devices and screen sizes

### 🛡️ For Administrators
- **Comprehensive Dashboard** - Real-time analytics and donation insights
- **Project Management** - Easy creation and management of social initiatives
- **Secure Access** - Password-protected admin interface with session management
- **Donation Tracking** - Detailed transaction monitoring and reporting

### 🎨 User Experience
- **Professional Design** - Clean, trustworthy interface with professional color scheme
- **Responsive Layout** - Seamless experience across desktop, tablet, and mobile
- **Intuitive Navigation** - Easy-to-use interface for all user types
- **Fast Performance** - Optimized loading and smooth interactions

## 🚀 Technology Stack

- **Framework**: SvelteKit with TypeScript
- **Database**: SQLite with better-sqlite3
- **Payments**: Mpesa API integration
- **Styling**: Custom CSS with responsive design
- **Security**: Cookie-based authentication and rate limiting

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+
- **npm** or yarn
- **Mpesa API** credentials (for payment processing)

### Installation

```bash
# Clone the repository
git clone https://github.com/steodhiambo/JamiiFund.git
cd JamiiFund

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Mpesa credentials

# Start development server
npm run dev
```

### Environment Configuration
```env
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=your_callback_url
```

**🌐 Access the application at:** `http://localhost:5173`

## 📖 How It Works

### 💝 For Donors
1. **Browse Projects** - Explore verified social initiatives on the homepage
2. **Select & Donate** - Choose a project and enter your donation amount
3. **Secure Payment** - Complete payment via Mpesa STK Push
4. **Track Impact** - See real-time progress and impact of your contribution

### 🛡️ For Administrators
1. **Access Admin Panel** - Navigate to `/admin/login`
2. **Secure Login** - Enter admin credentials (default: `admin123`)
3. **Monitor Dashboard** - View real-time analytics and donation insights
4. **Manage Projects** - Create, edit, and track social initiatives

## 📁 Project Structure

```
JamiiFund/
├── src/
│   ├── lib/
│   │   ├── components/      # Reusable UI components
│   │   ├── database.ts      # SQLite database setup
│   │   ├── mpesa.ts         # Mpesa payment integration
│   │   └── types.ts         # TypeScript definitions
│   ├── routes/
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page
│   │   ├── admin/           # Admin dashboard
│   │   ├── api/             # API endpoints
│   │   └── project/         # Project pages
│   └── app.html             # Main template
├── static/
│   └── images/              # Project images
└── README.md                # Documentation
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/donate` | Initiate donation process |
| `POST` | `/api/mpesa/callback` | Mpesa payment callback |
| `GET` | `/api/donation/status` | Check donation status |

## 🗄️ Database Schema

### Projects
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary key |
| `title` | TEXT | Project title |
| `description` | TEXT | Project description |
| `goal_amount` | INTEGER | Funding goal (in cents) |
| `current_amount` | INTEGER | Current funding (in cents) |
| `image_url` | TEXT | Project image URL |
| `created_at` | DATETIME | Creation timestamp |
| `updated_at` | DATETIME | Last update timestamp |

### Donations
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary key |
| `project_id` | INTEGER | Foreign key to projects |
| `amount` | INTEGER | Donation amount (in cents) |
| `mpesa_transaction_id` | TEXT | Mpesa transaction reference |
| `phone_number` | TEXT | Donor phone number |
| `status` | TEXT | Payment status (pending/completed/failed) |
| `created_at` | DATETIME | Creation timestamp |

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run preview  # Test production build locally
```

### 🔒 Security Checklist
- ✅ Change default admin password
- ✅ Use environment variables for sensitive data
- ✅ Enable HTTPS in production
- ✅ Implement rate limiting for API endpoints
- ✅ Validate and sanitize all user inputs
- ✅ Configure secure Mpesa production credentials

### 🌐 Environment Setup
- Configure production database
- Set up secure admin credentials
- Enable HTTPS for secure cookies
- Configure production Mpesa endpoints

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## 💬 Support

For support, questions, or partnership opportunities:

- **Email**: [info@jamiifund.org](mailto:info@jamiifund.org)
- **Phone**: +254 700 000 000
- **Website**: [jamiifund.org](https://jamiifund.org)

---

**Made with ❤️ for social impact** | **JamiiFund - Empowering Communities Through Anonymous Donations**
