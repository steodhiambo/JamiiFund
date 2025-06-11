# JamiiFund - Anonymous Donation Platform

A SvelteKit-based web application that allows well-wishers to anonymously donate to various social projects. The platform includes an administrative interface for tracking donations and managing projects, with integrated Mpesa payment processing.

## Features

### Public Interface
- **Project Browsing**: View all active social projects with descriptions and funding goals
- **Anonymous Donations**: Make donations without requiring user registration
- **Mpesa Integration**: Secure payment processing through Mpesa STK Push
- **Real-time Progress**: Live updates on project funding progress
- **Responsive Design**: Mobile-friendly interface

### Admin Interface
- **Dashboard**: Overview of platform statistics and performance
- **Project Management**: Add, edit, and manage social projects
- **Donation Tracking**: Monitor all donations with detailed analytics
- **Secure Authentication**: Password-protected admin access

## Technology Stack

- **Frontend**: SvelteKit with TypeScript
- **Database**: SQLite with better-sqlite3
- **Payments**: Mpesa API integration
- **Styling**: Custom CSS with responsive design
- **Authentication**: Cookie-based session management

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Mpesa API credentials (for payment processing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd donation-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your Mpesa API credentials:
```env
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=your_callback_url
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### For Donors
1. Browse available projects on the homepage
2. Click on a project to view details
3. Enter donation amount and phone number
4. Complete payment via Mpesa prompt on your phone
5. Receive confirmation of successful donation

### For Administrators
1. Navigate to `/admin/login`
2. Enter admin password (default: `admin123`)
3. Access dashboard to view statistics
4. Manage projects and monitor donations

## Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable Svelte components
│   ├── database.ts         # Database setup and queries
│   ├── mpesa.ts           # Mpesa API integration
│   └── types.ts           # TypeScript type definitions
├── routes/
│   ├── admin/             # Admin interface routes
│   ├── api/               # API endpoints
│   ├── donation/          # Donation-related pages
│   └── project/           # Project detail pages
└── app.html               # Main HTML template
```

## API Endpoints

- `POST /api/donate` - Initiate donation
- `POST /api/mpesa/callback` - Mpesa payment callback
- `GET /api/donation/status` - Check donation status

## Database Schema

### Projects Table
- `id` - Primary key
- `title` - Project title
- `description` - Project description
- `goal_amount` - Funding goal (in cents)
- `current_amount` - Current funding (in cents)
- `image_url` - Project image URL
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Donations Table
- `id` - Primary key
- `project_id` - Foreign key to projects
- `amount` - Donation amount (in cents)
- `mpesa_transaction_id` - Mpesa transaction reference
- `phone_number` - Donor phone number
- `status` - Payment status (pending/completed/failed)
- `created_at` - Creation timestamp

## Deployment

### Building for Production
```bash
npm run build
```

### Environment Setup
- Set up production database
- Configure Mpesa production credentials
- Set secure admin password
- Enable HTTPS for secure cookies

### Security Considerations
- Change default admin password
- Use environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting for API endpoints
- Validate and sanitize all user inputs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please contact [support@jamiifund.org]
