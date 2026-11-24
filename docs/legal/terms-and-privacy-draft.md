# Terms of Service and Privacy Policy: draft updates

> **Status: draft for review, not published.** Written to cover the features shipping at launch (bookings, deposits, pay on arrival, digital products, courses, coaching, memberships, AutoDM, email). Have it reviewed by a lawyer before publishing. Replace every `[PLACEHOLDER]`.

**Gaps in the current pages**
- "Last updated" uses `new Date()`, so it always shows today's date. Use a fixed date.
- Nothing says that Nelsy is a tool and that the **pro is the seller** to their own clients.
- No reference to the **Stripe Connected Account Agreement**, which Stripe requires platforms to show to connected accounts.
- No terms for the free trial, automatic renewal, cancellation and refunds of the Nelsy subscription.
- Nothing on digital products, courses, memberships, refunds or the EU withdrawal right.
- Privacy policy doesn't list the services that process data (Stripe, Supabase, Resend, PostHog, Vercel) or the cookie banner.

---

## Terms of Service (proposed structure and wording)

**Company:** [COMPANY LEGAL NAME], [LEGAL FORM], registered at [ADDRESS], [REGISTRATION NUMBER]. Contact: support@getnelsy.com.

### 1. What Nelsy is
Nelsy provides software that lets beauty professionals and creators ("Pros") publish a page, take bookings and sell services, digital products, courses, coaching and memberships to their own clients ("Clients"). Nelsy is not a party to the contract between a Pro and a Client. The Pro is the seller and is responsible for what they sell, its description, its delivery and its after-sale service.

### 2. Accounts
You must be at least 18 and provide accurate information. You are responsible for your login details and for activity on your account. One person or business per account.

### 3. Nelsy subscription, free trial and renewal
- Plans and prices are shown on the pricing page. Prices exclude applicable taxes.
- New accounts get a 14-day free trial. A payment card is required to start it. You are not charged during the trial.
- At the end of the trial, your plan starts and your card is charged automatically, then every month or year depending on the billing period you chose, until you cancel.
- We will email you before your trial ends. You can cancel at any time from your dashboard; cancellation takes effect at the end of the current billing period.
- [REFUND POLICY FOR THE NELSY SUBSCRIPTION, e.g. no refunds for partial periods, except where required by law.]
- We may change prices with at least [30] days' notice by email; the new price applies from your next billing period.

### 4. Payments between Pros and Clients
- Payments are processed by Stripe. To accept online payments, a Pro must open a Stripe connected account and accept the [Stripe Connected Account Agreement](https://stripe.com/connect-account/legal), which includes the [Stripe Services Agreement](https://stripe.com/legal). Nelsy may share information about the Pro with Stripe to provide the service.
- Nelsy charges **0% commission** on Pros' bookings and sales. Stripe's payment processing fees apply and are deducted by Stripe.
- Pros choose, for each offer, whether Clients pay on arrival, pay a deposit or pay in full online. Payments taken outside Nelsy (cash, card at the studio) are the Pro's responsibility; recording them in Nelsy is for the Pro's own records.
- Refunds, cancellations and no-show fees between a Pro and a Client follow the Pro's own policy, which the Pro must show to Clients before they book or buy.

### 5. Pros' responsibilities
Pros are responsible for: holding any licence or insurance their activity requires; the accuracy of their prices and descriptions; the rights to everything they upload and sell (photos, courses, files, music); complying with consumer law in the countries where they sell, including withdrawal rights; and **collecting and paying any taxes** (VAT, sales tax) due on their sales. Nelsy does not give tax or legal advice.

### 6. Digital products, courses and memberships
- Digital content is delivered by the Pro through Nelsy after payment.
- **Clients in the EU** have a 14-day right of withdrawal, which ends for digital content once delivery starts, but only if the Client expressly consented to immediate delivery and acknowledged losing that right before paying. Nelsy's checkout collects this consent for EU Clients; Pros must not remove it.
- Memberships renew automatically each period until the member cancels. Members can cancel at any time; access continues until the end of the paid period.

### 7. Acceptable use
No illegal content or services, no medical claims or treatments a Pro is not qualified to provide, no misleading offers or fake reviews, no content that infringes others' rights, no spam (including through AutoDM and email), no attempts to break or overload the service. We may remove content or suspend accounts that break these rules.

### 8. Your content
You keep ownership of what you upload. You give Nelsy a licence to host, display and process it only to run the service, including showing your public page. You can delete your content at any time.

### 9. Availability and changes
We work to keep Nelsy available but don't guarantee uninterrupted service. We may change or discontinue features; we'll give reasonable notice for significant changes that affect paid features.

### 10. Liability
[LIMITATION OF LIABILITY CLAUSE, reviewed by counsel; consumer protections cannot be excluded.]

### 11. Termination
You can close your account at any time. We may suspend or close an account that breaches these terms, with notice where possible. Sections that by nature survive (payments due, liability, content licence for already-delivered content) continue after termination.

### 12. Governing law
[GOVERNING LAW AND COURTS, e.g. French law, courts of [CITY], without depriving consumers of the protection of the law of their country of residence.]

### 13. Changes to these terms
We'll notify you by email at least [15] days before material changes take effect. **Last updated: [FIXED DATE].**

---

## Privacy Policy: additions

### Who processes data, and in which role
- For **Pros' accounts**, Nelsy is the data controller.
- For **Clients' data collected by a Pro** (bookings, purchases, contact details), the Pro is the controller and Nelsy processes it on the Pro's behalf. [Offer a Data Processing Agreement to Pros.]

### Service providers (sub-processors)
| Provider | Purpose | Location |
|---|---|---|
| Stripe | Payments, payouts, fraud prevention | [CHECK] |
| Supabase | Database, authentication, file storage | [REGION OF YOUR PROJECT] |
| Vercel | Website hosting | [CHECK] |
| Resend | Transactional emails | [CHECK] |
| PostHog | Product analytics and error tracking | EU (eu.i.posthog.com) |

### Cookies and analytics
Visitors in Europe are asked for consent before analytics cookies are used. Until they accept, analytics run without storing anything on the device. Visitors can change their choice by clearing site data. [Add a "Cookie settings" link in the footer to reopen the banner.]

### Data retention
[Retention periods for accounts, bookings, payment records (accounting obligations), analytics.]

### Rights
Access, correction, deletion, portability, objection, and complaint to the supervisory authority ([CNIL in France]). Contact privacy@getnelsy.com.

**Last updated: [FIXED DATE].**
