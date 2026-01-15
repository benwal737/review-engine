# ReviewEngine

A SaaS platform for local businesses to manage Google reviews and generate new reviews through smart feedback collection.

## Features

- **QR Code Feedback Collection**: Generate QR codes for customers to scan and leave feedback
- **Smart Filtering**: Happy customers are directed to Google reviews, unhappy ones send feedback privately
- **AI-Powered Responses**: Generate professional, personalized replies to reviews using OpenAI
- **Dashboard Analytics**: Track your review performance, response rates, and customer sentiment
- **Multi-Platform Support**: Monitor reviews from Google (more platforms coming soon)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **AI**: OpenAI API
- **QR Generation**: qrcode package

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Prisma Accelerate)
- Clerk account
- OpenAI API key (optional - mock responses work without it)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd review-engine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual values.

4. Set up the database:
   ```bash
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `OPENAI_API_KEY` | OpenAI API key (optional) |
| `NEXT_PUBLIC_APP_URL` | Your application URL |

## Project Structure

```
review-engine/
├── app/
│   ├── api/
│   │   ├── feedback/          # Feedback submission endpoint
│   │   └── generate-reply/    # AI reply generation endpoint
│   ├── dashboard/             # Protected dashboard pages
│   │   ├── page.tsx           # Main dashboard
│   │   └── qr-code/           # QR code management
│   ├── feedback/[slug]/       # Public feedback landing page
│   ├── sign-in/               # Clerk sign-in page
│   ├── sign-up/               # Clerk sign-up page
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── FeedbackForm.tsx       # Customer feedback form
│   ├── QRCodeDisplay.tsx      # QR code display & download
│   ├── ReviewCard.tsx         # Review display with AI reply
│   └── StatCard.tsx           # Dashboard stat cards
├── lib/
│   ├── db.ts                  # Prisma client instance
│   └── mockData.ts            # Development mock data
├── prisma/
│   └── schema.prisma          # Database schema
└── middleware.ts              # Clerk auth middleware
```

## Usage

### For Business Owners

1. **Sign up** and create your business profile
2. **Generate a QR code** from the dashboard
3. **Print and display** the QR code at your business
4. **Monitor feedback** from the dashboard
5. **Respond to reviews** using AI-generated suggestions

### Customer Flow

1. Customer scans QR code
2. Asked "How was your experience?"
3. **Happy customers**: Directed to leave a Google review
4. **Unhappy customers**: Submit private feedback to the business

## Development

### Database Management

```bash
# Push schema changes to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Running Tests

```bash
npm run lint
```

## Roadmap

- [ ] Google Business Profile OAuth integration
- [ ] Email notifications for new reviews
- [ ] Review analytics and trends
- [ ] Multi-location support
- [ ] Team member access
- [ ] Custom branding for feedback pages

## License

MIT
