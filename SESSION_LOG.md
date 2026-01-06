# Bulldog Lacrosse Camp - Session Log

## Project Overview
Built a complete camp registration website to replace Teamworks Camps platform.
**Savings**: ~$10,000/year (eliminated $20/registration platform fees)

## Live URLs
- **Public Site**: https://bulldog-lacrosse-camp.vercel.app
- **Admin Portal**: https://bulldog-lacrosse-camp.vercel.app/admin
- **Admin Password**: `BLC-Admin-2026!Secure`

## Tech Stack
| Component | Service | Cost |
|-----------|---------|------|
| Hosting | Vercel | Free |
| Payments | Stripe | 2.9% + $0.30 per transaction |
| Database | Google Sheets | Free |
| Emails | Gmail SMTP | Free (500/day limit) |
| Auth | JWT cookies | Free |

## Google Sheets Structure
**Spreadsheet ID**: `1cS6KGoTZGUouvx8z-nwoqptiyn3qvK7Y7FqzlmraM1I`

| Sheet Tab | Purpose |
|-----------|---------|
| Test | Test registrations ($1) |
| BLC26 | Summer Camp 2026 |
| B12026 | Bulldog 120 2026 |
| BEx26 | Bulldog Experience 2026 |
| BClash26 | Bulldog Clash 2026 |
| EmailLog | Email send tracking |

**Columns**: Date, Camp ID, Amount, Camper Name, Camper Email, Position, Grad Year, School, Parent Name, Parent Email, Parent Phone, Status, Payment ID

## Environment Variables (Vercel)
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=https://bulldog-lacrosse-camp.vercel.app
GOOGLE_SERVICE_EMAIL=bulldog-lacrosse-camp@...
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
GOOGLE_SHEET_ID=1cS6KGoTZGUouvx8z-nwoqptiyn3qvK7Y7FqzlmraM1I
ADMIN_PASSWORD=BLC-Admin-2026!Secure
JWT_SECRET=k8x2mP9qL4vR7nW3jH6tY1cB5fA0sD8e
GMAIL_APP_PASSWORD=usqqggopcwnrpxbu
```

## Camp Pricing
| Camp | Price | Age Group |
|------|-------|-----------|
| Summer Camp | $350 | Ages 7-17 |
| Bulldog 120 | $125 | High School |
| Bulldog Experience | $135 | High School |
| Bulldog Clash | $350 | Elite Prospects |
| Test | $1 | Staff testing |

## Key Features Built

### Public Site
- Homepage with parallax hero
- Camp detail pages (Summer, Bulldog 120, Experience, Clash)
- Multi-step registration form
- Stripe checkout integration
- FAQ page with chatbot
- Contact page
- Mobile responsive
- Custom fonts (Aldo for headlines)

### Admin Portal (`/admin`)
- Password-protected login
- View all registrations from Google Sheets
- Filter by camp type
- Search by name, email, school
- Select individual or all recipients
- Send email blasts via Gmail
- Email counter (daily/monthly stats)
- Auto-confirmation emails after payment

### Registration Flow
1. User selects camp → fills form → Stripe checkout
2. Stripe webhook fires on successful payment
3. Registration added to Google Sheets
4. Confirmation email sent to parent
5. Appears in admin portal immediately

## File Structure
```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx (auth wrapper)
│   │   └── page.tsx (dashboard)
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   ├── registrations/route.ts
│   │   │   ├── send-email/route.ts
│   │   │   └── email-stats/route.ts
│   │   ├── checkout/route.ts
│   │   └── webhook/route.ts
│   ├── camps/ (summer, bulldog-120, experience)
│   ├── prospects/clash/
│   ├── login/page.tsx
│   ├── register/
│   │   ├── page.tsx
│   │   └── success/page.tsx
│   ├── faq/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── Chatbot.tsx
└── lib/
    ├── auth.ts
    ├── email.ts
    ├── emailStats.ts
    └── sheets.ts
```

## Gmail Setup
- Account: blclacrossecamps@gmail.com
- 2-Step Verification: Enabled
- App Password: Created for "Bulldog Site"
- Daily Limit: 500 emails

## Replicating for Future Clients
1. Clone this project structure
2. Update camp names, pricing, content
3. Create new Stripe account
4. Create new Google Sheet with same tab structure
5. Create Google Cloud service account
6. Set up Gmail app password
7. Deploy to Vercel with environment variables
8. Configure Stripe webhook to point to new URL

## Contact
- Camp Email: blclacrossecamps@gmail.com
- Location: Yale University, Reese Stadium, New Haven, CT

---
*Session Date: December 29, 2025*
