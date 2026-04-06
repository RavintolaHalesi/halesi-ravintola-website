# Halesi Ravintola Website

Modern Next.js restaurant website with:

- English and Finnish language switch
- online reservation form
- reservation email delivery through Resend
- deployable structure for Vercel or another Node host

## Local development

1. Copy `.env.example` to `.env.local`
2. Add your real values:
   - `RESEND_API_KEY`
   - `RESERVATION_EMAIL`
   - `RESEND_FROM_EMAIL`
3. Install dependencies if needed:

```bash
npm install
```

4. Start development:

```bash
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Deployment notes

- Best fit: Vercel deployment for the Next.js app
- Reservation emails depend on `RESEND_API_KEY`
- This version sends reservation emails directly and does not rely on local file storage, which makes it a better fit for real hosting
- Update the displayed contact details later if the public restaurant email should be different from `diwanshgiri@gmail.com`
