# Retention & Growth — Reference Materials

Consolidated reference documentation for the retention & growth skills.
Source: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)

---

## churn-prevention — Cancel Flow Patterns

<!-- Source: skills/churn-prevention/references/cancel-flow-patterns.md -->

# Cancel Flow Patterns

Detailed cancel flow patterns by business type, billing provider, and industry.

---

## Cancel Flow by Business Type

### B2C / Self-Serve SaaS

High volume, low touch. The flow must work without human intervention.

**Flow structure:**
```
Cancel button → Exit survey (1 question) → Dynamic offer → Confirm → Post-cancel
```

**Characteristics:**
- Fully automated, no human in the loop
- Quick — 2-3 screens maximum
- One offer + one fallback, not a menu of options
- Mobile-optimized (significant cancellations on mobile)
- Clear "continue cancelling" at every step

**Typical save rate:** 20-30%

**Example flow for a $29/mo productivity app:**
1. "What's the main reason?" → 6 options
2. Selected "Too expensive" → "Get 25% off for 3 months (save $21.75)"
3. Declined → "Or switch to our Starter plan at $12/mo"
4. Declined → "We're sorry to see you go. Your access continues until [date]."

---

### B2B / Team Plans

Lower volume, higher stakes. Personal outreach is worth the cost.

**Flow structure:**
```
Cancel button → Exit survey → Offer (or route to CS) → Confirm → Post-cancel
```

**Characteristics:**
- Route accounts above MRR threshold to customer success
- Show team impact ("Your 8 team members will lose access")
- Offer admin-to-admin call for enterprise accounts
- Longer consideration — allow "schedule a call" as a save option
- Require admin/owner role to cancel (not any team member)

**Typical save rate:** 30-45% (higher because of personal touch)

**MRR-based routing:**

| Account MRR | Cancel Flow |
|-------------|-------------|
| <$100/mo | Automated flow with offers |
| $100-$500/mo | Automated + flag for CS follow-up |
| $500-$2,000/mo | Route to CS before cancel completes |
| $2,000+/mo | Block self-serve cancel, require CS call |

---

### Freemium / Free-to-Paid

Users cancelling paid to return to free tier. Different psychology — they're not leaving, they're downgrading.

**Flow structure:**
```
Cancel button → "Switch to Free?" prompt → Exit survey (if still cancelling) → Offer → Confirm
```

**Characteristics:**
- Lead with the free tier as the first option (not a save offer)
- Show what they keep on free vs. what they lose
- The "save" is keeping them on free, not losing them entirely
- Track free-tier users for future re-upgrade campaigns

---

## Cancel Flow by Billing Interval

### Monthly Subscribers

- More price-sensitive, shorter commitment
- Discount offers work well (20-30% for 2-3 months)
- Pause is effective (1-2 months)
- Suggest annual plan at a discount as an alternative

**Offer priority:**
1. Discount (if reason = price)
2. Pause (if reason = not using / temporary)
3. Annual plan switch (if engaged but price-sensitive)

### Annual Subscribers

- Higher commitment, often cancelling for stronger reasons
- Prorate refund expectations matter
- Longer save window (they've already paid)
- Personal outreach more justified (higher LTV at stake)

**Offer priority:**
1. Pause remainder of term (if temporary)
2. Plan adjustment + credit for next renewal
3. Personal outreach from CS
4. Partial refund + downgrade (better than full refund + cancel)

**Refund handling:**
- Offer prorated refund if significant time remaining
- "Pause until renewal" if less than 3 months left
- Be generous — bad refund experiences create vocal detractors

---

## Save Offer Patterns

### The Discount Ladder

Don't lead with your biggest discount. Escalate:

```
Cancel click → 15% off → Still cancelling → 25% off → Still cancelling → Let them go
```

**Rules:**
- Maximum 2 discount offers per cancel session
- Never exceed 30% (higher trains cancel-for-discount behavior)
- Time-limit discounts (2-3 months, then full price resumes)
- Track discount accepters — if they cancel again at full price, don't re-offer

### The Pause Playbook

Pause is often better than a discount because it doesn't devalue your product.

**Implementation:**

| Setting | Recommendation |
|---------|---------------|
| Pause duration options | 1 month, 2 months, 3 months |
| Default selection | 1 month (shortest) |
| Maximum pause | 3 months (longer pauses rarely return) |
| During pause | Keep data, remove access |
| Reactivation | Auto-reactivate with 7-day advance email |
| Repeat pauses | Allow 1 pause per 12-month period |

**Pause reactivation sequence:**
- Day -7: "Your pause ends in 7 days. We've been busy — here's what's new."
- Day -1: "Welcome back tomorrow! Here's what's waiting for you."
- Day 0: "You're back! Here's a quick tour of what's new."

### The Downgrade Path

For multi-plan products, downgrade is the strongest save:

```
┌─────────────────────────────────────────┐
│  Before you go, what about right-sizing │
│  your plan?                             │
│                                         │
│  Current: Pro ($49/mo)                  │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Switch to Starter ($19/mo)      │    │
│  │                                 │    │
│  │ ✓ Keep: Projects, integrations  │    │
│  │ ✗ Lose: Advanced analytics,     │    │
│  │         team features           │    │
│  │                                 │    │
│  │ [Switch to Starter]             │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [No thanks, continue cancelling]       │
└─────────────────────────────────────────┘
```

**Downgrade best practices:**
- Show exactly what they keep and what they lose
- Use checkmarks and X marks for scanability
- Preserve their data even on the lower plan
- If they downgrade, don't show upgrade prompts for at least 30 days

### The Competitor Switch Handler

When the cancel reason is "switching to competitor":

1. **Ask which competitor** (optional, don't force it)
2. **Show a comparison** if you have one (see competitor-alternatives skill)
3. **Offer a migration credit** ("We'll match their price for 3 months")
4. **Request a feedback call** ("15 minutes to understand what we're missing")

This data is gold for product and marketing teams.

---

## Post-Cancel Experience

What happens after cancel matters for:
- Win-back potential
- Word of mouth
- Review sentiment

### Confirmation Page

```
Your subscription has been cancelled.

What happens next:
• Your access continues until [billing period end date]
• Your data will be preserved for 90 days
• You can reactivate anytime from your account settings

[Reactivate My Account]

We'd love to have you back. We'll keep improving based on feedback
from customers like you.
```

### Post-Cancel Sequence

| Timing | Action |
|--------|--------|
| Immediately | Confirmation email with access end date |
| Day 1 | (Nothing — don't be desperate) |
| Day 7 | NPS/satisfaction survey about overall experience |
| Day 30 | "What's new" email with recent improvements |
| Day 60 | Address their specific cancel reason if resolved |
| Day 90 | Final win-back with special offer |

**For detailed win-back email sequences**: See the email-sequence skill.

---

## Segmentation Rules

The most effective cancel flows use segmentation to show different offers to different customers.

### Segmentation Dimensions

| Dimension | Why It Matters |
|-----------|---------------|
| Plan / MRR | Higher-value customers get personal outreach |
| Tenure | Long-term customers get more generous offers |
| Usage level | High-usage customers get different messaging than dormant ones |
| Billing interval | Monthly vs. annual need different approaches |
| Previous saves | Don't re-offer the same discount to a repeat canceller |
| Cancel reason | Drives which offer to show (core mapping) |

### Segment-Specific Flows

**New customer (< 30 days):**
- They haven't activated. The save is onboarding, not discounts.
- Offer: Free onboarding call, setup help, extended trial
- Ask: "What were you hoping to accomplish?" (learn what's missing)

**Engaged customer cancelling on price:**
- They love the product but can't justify the cost.
- Offer: Discount, annual plan switch, downgrade
- High save potential

**Dormant customer (no login 30+ days):**
- They forgot about you. A discount won't bring them back.
- Offer: Pause subscription, "what changed?" conversation
- Low save potential — focus on learning why

**Power user switching to competitor:**
- They're actively choosing something else.
- Offer: Competitive match, feedback call, roadmap preview
- Medium save potential — depends on reason

---

## Implementation Checklist

### Phase 1: Foundation (Week 1)
- [ ] Add cancel flow (survey + 1 offer + confirmation)
- [ ] Set up exit survey with 5-7 reason categories
- [ ] Map one offer per reason (simple 1:1 mapping)
- [ ] Track cancel reasons and save rate in analytics
- [ ] Enable pre-dunning card expiry emails

### Phase 2: Optimization (Weeks 2-4)
- [ ] Add fallback offers (primary + secondary per reason)
- [ ] Implement pause subscription option
- [ ] Set up dunning email sequence (4 emails over 10 days)
- [ ] Enable smart retries (Stripe Smart Retries or equivalent)
- [ ] Add MRR-based routing for high-value accounts

### Phase 3: Advanced (Month 2+)
- [ ] Build health score from usage signals
- [ ] Set up proactive intervention triggers
- [ ] A/B test discount amounts and offer types
- [ ] Segment flows by plan, tenure, and usage
- [ ] Post-cancel win-back sequence (coordinate with email-sequence skill)
- [ ] Cohort analysis: churn by channel, plan, tenure

---

## Compliance Notes

### FTC Click-to-Cancel Rule (US)
- Cancellation must be as easy as signup
- Cannot require a phone call to cancel if signup was online
- Cannot add excessive steps to discourage cancellation
- Save offers are allowed but "continue cancelling" must be clear

### GDPR / Data Retention (EU)
- Inform users about data retention period post-cancel
- Offer data export before account deletion
- Honor deletion requests within 30 days
- Don't use post-cancel data for marketing without consent

### General Best Practices
- Always show a clear path to complete cancellation
- Never hide the cancel button (dark pattern)
- Process cancellation even if save flow has errors
- Confirm cancellation with email receipt

---

## churn-prevention — Dunning Playbook

<!-- Source: skills/churn-prevention/references/dunning-playbook.md -->

# Dunning Playbook

Complete guide to recovering failed payments and reducing involuntary churn.

---

## Why Dunning Matters

- Failed payments cause 30-50% of all subscription churn
- Most failed payments are recoverable with the right strategy
- Subscription businesses lose an estimated $129 billion annually to involuntary churn
- Effective dunning recovers 50-60% of failed payments

---

## The Dunning Timeline

```
Day -30 to -7: Pre-dunning (prevent failures)
Day 0:         Payment fails → Smart retry #1 + Email #1
Day 1-3:       Smart retry #2 + Email #2
Day 3-5:       Smart retry #3
Day 5-7:       Smart retry #4 + Email #3
Day 7-10:      Final retry + Email #4 (final warning)
Day 10-14:     Grace period ends → Account paused/cancelled
Day 14+:       Win-back sequence begins
```

---

## Pre-Dunning: Prevent Failures Before They Happen

### Card Expiry Management

| Timing | Action |
|--------|--------|
| 30 days before expiry | Email: "Your card ending in 4242 expires next month" |
| 15 days before expiry | Email: "Update your payment method to avoid interruption" |
| 7 days before expiry | Email: "Your card expires in 7 days — update now" |
| 3 days before expiry | In-app banner: "Payment method expiring soon" |

**Email template — Card expiring:**
```
Subject: Your card ending in 4242 expires soon

Hi [Name],

The card on file for your [Product] subscription expires on [date].

Update your payment method now to avoid any interruption:

[Update Payment Method →]

This takes less than 30 seconds.

— [Product] Team
```

### Card Updater Services

Major card networks offer automatic card update programs:

| Service | Network | What It Does |
|---------|---------|--------------|
| Visa Account Updater (VAU) | Visa | Auto-updates stored card numbers and expiry dates |
| Mastercard Automatic Billing Updater (ABU) | Mastercard | Same for Mastercard |
| Amex Cardrefresher | American Express | Same for Amex |

**Impact:** Reduces hard declines from expired/replaced cards by 30-50%.

**How to enable:**
- **Stripe**: Automatic — enabled by default
- **Chargebee**: Enabled through gateway settings
- **Recurly**: Built-in, enabled by default
- **Braintree**: Contact processor to enable

### Backup Payment Methods

Prompt for a second payment method:
- During signup: "Add a backup payment method" (low conversion)
- After first successful payment: "Protect your account with a backup card" (better timing)
- After a failed payment is recovered: "Add a backup to prevent future interruptions" (best timing — they felt the pain)

### Pre-Billing Notifications

For annual plans or high-value subscriptions:
- Email 7 days before renewal with amount and date
- Include link to update payment method
- Show what's included in the renewal
- Required by some regulations for auto-renewals

---

## Smart Retry Strategy

### Decline Type Classification

| Code | Type | Meaning | Retry? |
|------|------|---------|--------|
| `insufficient_funds` | Soft | Temporarily low balance | Yes — retry in 2-3 days |
| `card_declined` (generic) | Soft | Various temporary reasons | Yes — retry 3-4 times |
| `processing_error` | Soft | Gateway/network issue | Yes — retry within 24h |
| `expired_card` | Hard | Card is expired | No — request new card |
| `stolen_card` | Hard | Card reported stolen | No — request new card |
| `do_not_honor` | Soft/Hard | Bank refused (ambiguous) | Try once more, then ask for new card |
| `authentication_required` | Auth | SCA/3DS needed | Send customer to authenticate |

### Retry Schedule by Provider

**Stripe (Smart Retries — recommended):**
- Enable "Smart Retries" in Stripe Dashboard → Billing → Settings
- Stripe's ML model picks optimal retry timing based on billions of transactions
- Typically 4-8 retry attempts over 3-4 weeks
- Recovers ~15% more than fixed-schedule retries

**Manual retry schedule (if no smart retries):**

| Retry | Timing | Best Day/Time |
|-------|--------|--------------|
| 1 | Day 1 (24h after failure) | Morning, same day of week as original |
| 2 | Day 3 | Try a different time of day |
| 3 | Day 5 | After typical payday (1st, 15th) |
| 4 | Day 7 | Morning of the next business day |
| 5 (final) | Day 10 | Last attempt before grace period ends |

**Retry timing insights:**
- Retry on the same day of month the original payment succeeded
- Retry after common paydays (1st and 15th of the month)
- Avoid retrying on weekends (lower approval rates)
- Morning retries (8-10am local time) perform slightly better

---

## Dunning Email Sequence

### Email 1: Payment Failed (Day 0)

**Tone:** Friendly, matter-of-fact. No alarm.

```
Subject: Action needed — your payment didn't go through

Hi [Name],

We tried to charge your [card type] ending in [last 4] for your
[Product] subscription ($[amount]), but it didn't go through.

This happens sometimes — usually a quick card update fixes it.

[Update Payment Method →]

Your access isn't affected yet. We'll retry automatically, but
updating your card is the fastest fix.

Need help? Just reply to this email.

— [Product] Team
```

### Email 2: Reminder (Day 3)

**Tone:** Helpful, slightly more urgent.

```
Subject: Quick reminder — update your payment for [Product]

Hi [Name],

Just a heads-up — we still haven't been able to process your
$[amount] payment for [Product].

[Update Payment Method →]

Takes less than 30 seconds. Your [data/projects/team access]
is safe, but we'll need a valid payment method to keep your
account active.

Questions? Reply here and we'll help.

— [Product] Team
```

### Email 3: Urgency (Day 7)

**Tone:** Direct, clear consequences.

```
Subject: Your [Product] account will be paused in 3 days

Hi [Name],

We've tried to process your payment several times, but your
[card type] ending in [last 4] keeps getting declined.

If we don't receive payment by [date], your account will be
paused and you'll lose access to:

• [Key feature/data they use]
• [Their projects/workspace]
• [Team access for X members]

[Update Payment Method Now →]

Your data won't be deleted — you can reactivate anytime by
updating your payment method.

— [Product] Team
```

### Email 4: Final Warning (Day 10)

**Tone:** Final, clear, no guilt.

```
Subject: Last chance to keep your [Product] account active

Hi [Name],

This is our last reminder. Your payment of $[amount] is past
due, and your account will be paused tomorrow ([date]).

[Update Payment Method →]

After pausing:
• Your data is saved for [90 days]
• You can reactivate anytime
• Just update your card to restore access

If you intended to cancel, no action needed — your account
will be paused automatically.

— [Product] Team
```

---

## Grace Period Management

### What Happens During Grace Period

| Setting | Recommendation |
|---------|---------------|
| Duration | 7-14 days after final retry |
| Access | Degraded (read-only) or full access |
| Visibility | In-app banner: "Payment past due — update to continue" |
| Retry | Continue background retries during grace |
| Communication | Dunning emails continue |

### Access Degradation Options

**Option A: Full access during grace (recommended for B2B)**
- Lower friction, customer feels respected
- Higher recovery rate (they still see value)
- Risk: some customers exploit the grace period

**Option B: Read-only access (recommended for B2C)**
- Can view but not create/edit
- Creates urgency without data loss fear
- Clear message: "Update payment to resume full access"

**Option C: Immediate lockout (not recommended)**
- Aggressive, damages relationship
- Lower recovery rate
- Only appropriate for very low-cost plans

### Post-Grace Period

| Timing | Action |
|--------|--------|
| Grace period ends | Pause account (not delete) |
| Day 1 post-pause | "Your account has been paused" email |
| Day 7 post-pause | "Your data is still here" reminder |
| Day 30 post-pause | Win-back attempt with new offer |
| Day 60 post-pause | Final win-back |
| Day 90 post-pause | Data deletion warning (if applicable) |

---

## Provider-Specific Setup

### Stripe

**Enable Smart Retries:**
1. Dashboard → Settings → Billing → Subscriptions and emails
2. Enable "Smart Retries" under retry rules
3. Set failed payment emails in Dashboard → Settings → Emails

**Custom retry rules (if not using Smart Retries):**
```
Retry 1: 3 days after failure
Retry 2: 5 days after failure
Retry 3: 7 days after failure
Final:   Mark subscription as unpaid after last retry
```

**Webhook events to handle:**
- `invoice.payment_failed` — trigger dunning
- `invoice.paid` — cancel dunning, restore access
- `customer.subscription.updated` — status changes
- `customer.subscription.deleted` — final cancellation

### Chargebee

**Built-in dunning:**
1. Settings → Configure Chargebee → Retry Settings
2. Configure retry attempts and intervals
3. Settings → Configure Chargebee → Email Notifications → Dunning

**Dunning options:**
- Automatic retries with configurable schedule
- Built-in dunning emails (customizable templates)
- Grace period configuration per plan

### Paddle

**Managed dunning:**
- Paddle handles retries and dunning automatically
- Limited customization (Paddle manages the relationship)
- Webhook: `subscription.payment_failed`, `subscription.cancelled`
- Best for hands-off approach

### Recurly

**Revenue Recovery:**
1. Configuration → Dunning Management
2. Set retry schedule per plan
3. Configure grace period and final action (pause vs cancel)

**Advanced features:**
- Machine-learning retry optimization
- Per-plan dunning schedules
- Built-in Account Updater

---

## In-App Dunning

Don't rely on email alone. Show payment failures in the app:

### Banner Pattern
```
┌──────────────────────────────────────────────────────┐
│ ⚠ Your payment of $29 failed. Update your card to    │
│ avoid losing access. [Update Payment →]  [Dismiss]   │
└──────────────────────────────────────────────────────┘
```

**Rules:**
- Show on every page load during dunning period
- Allow dismiss (but show again next session)
- Direct link to payment update (fewest clicks possible)
- Don't block the product — let them continue using it

### Modal Pattern (for final warning)
```
┌─────────────────────────────────────┐
│                                     │
│  Your account will be paused        │
│  on [date]                          │
│                                     │
│  Update your payment method to      │
│  keep access to your [X] projects   │
│  and [Y] team members.              │
│                                     │
│  [Update Payment Method]            │
│  [Remind Me Later]                  │
│                                     │
└─────────────────────────────────────┘
```

---

## Measuring Dunning Performance

### Key Metrics

| Metric | How to Calculate | Target |
|--------|-----------------|--------|
| Recovery rate | Recovered payments / Total failed | 50-60% |
| Recovery rate by decline type | Recovered / Failed per type | Soft: 70%+, Hard: 40%+ |
| Time to recovery | Days from failure to successful payment | <5 days |
| Pre-dunning prevention rate | Prevented failures / Expected failures | 20-30% |
| Dunning email open rate | Opens / Sent per email | 60%+ |
| Dunning email click rate | Clicks / Opens per email | 30%+ |
| Revenue recovered (monthly) | Sum of recovered payment amounts | Track trend |
| Revenue lost to involuntary churn | Sum of failed + unrecovered amounts | Track trend |

### Benchmarking

**By company stage:**

| Stage | Typical Involuntary Churn | Target After Optimization |
|-------|--------------------------|--------------------------|
| Early (< $1M ARR) | 3-5% of MRR/month | 1-2% |
| Growth ($1-10M ARR) | 2-4% of MRR/month | 0.5-1.5% |
| Scale ($10M+ ARR) | 1-3% of MRR/month | 0.3-0.8% |

### ROI Calculation

```
Monthly failed payment MRR:        $10,000
Current recovery rate:              30% ($3,000 recovered)
Target recovery rate:               60% ($6,000 recovered)
Monthly improvement:                $3,000/month
Annual improvement:                 $36,000/year
Cost of dunning optimization:       ~$200-500/month (tooling)
ROI:                                6-15x
```

---

## free-tool-strategy — Tool Types

<!-- Source: skills/free-tool-strategy/references/tool-types.md -->

# Free Tool Types Reference

Detailed guide to each type of marketing tool you can build.

## Contents
- Calculators
- Generators
- Analyzers/Auditors
- Testers/Validators
- Libraries/Resources
- Interactive Educational
- Tool Concept Examples by Industry (SaaS product, agency/services, e-commerce, developer tools, finance)

## Calculators

**Best for**: Decisions involving numbers, comparisons, estimates

**Examples**:
- ROI calculator
- Savings calculator
- Cost comparison tool
- Salary calculator
- Tax estimator
- Pricing estimator
- Compound interest calculator
- Break-even calculator

**Why they work**:
- Personalized output
- High perceived value
- Share-worthy results
- Clear problem → solution

**Implementation tips**:
- Keep inputs simple
- Show calculations transparently
- Make results shareable
- Add "powered by" branding

---

## Generators

**Best for**: Creating something useful quickly

**Examples**:
- Policy generator (privacy, terms)
- Template generator
- Name/tagline generator
- Email subject line generator
- Resume builder
- Color palette generator
- Logo maker
- Contract generator

**Why they work**:
- Tangible output
- Saves time
- Easily shared
- Repeat usage

**Implementation tips**:
- Output should be immediately usable
- Allow customization
- Offer download/export options
- Include email gating for premium outputs

---

## Analyzers/Auditors

**Best for**: Evaluating existing work or assets

**Examples**:
- Website grader
- SEO analyzer
- Email subject tester
- Headline analyzer
- Security checker
- Performance auditor
- Accessibility checker
- Code quality analyzer

**Why they work**:
- Curiosity-driven
- Personalized insights
- Creates awareness of problems
- Natural lead to solution

**Implementation tips**:
- Score or grade for gamification
- Benchmark against averages
- Provide actionable recommendations
- Follow up with improvement offers

---

## Testers/Validators

**Best for**: Checking if something works

**Examples**:
- Meta tag preview
- Email rendering test
- Mobile-friendly test
- Speed test
- DNS checker
- SSL certificate checker
- Redirect checker
- Broken link finder

**Why they work**:
- Immediate utility
- Bookmark-worthy
- Repeat usage
- Professional necessity

**Implementation tips**:
- Fast results are essential
- Show pass/fail clearly
- Provide fix instructions
- Integrate with your product where relevant

---

## Libraries/Resources

**Best for**: Reference material

**Examples**:
- Icon library
- Template library
- Code snippet library
- Example gallery
- Industry directory
- Resource list
- Swipe file collection
- Font pairing tool

**Why they work**:
- High SEO value
- Ongoing traffic
- Establishes authority
- Linkable asset

**Implementation tips**:
- Make searchable/filterable
- Allow easy copying/downloading
- Update regularly
- Accept community submissions

---

## Interactive Educational

**Best for**: Learning/understanding

**Examples**:
- Interactive tutorials
- Code playgrounds
- Visual explainers
- Quizzes/assessments
- Simulators
- Comparison tools
- Decision trees
- Configurators

**Why they work**:
- Engages deeply
- Demonstrates expertise
- Shareable
- Memory-creating

**Implementation tips**:
- Make it hands-on
- Show immediate feedback
- Lead to deeper resources
- Capture engaged users

---

## Tool Concept Examples by Industry

### SaaS Product
- Product ROI calculator
- Competitor comparison tool
- Readiness assessment quiz
- Template library for use case
- Feature configurator

### Agency/Services
- Industry benchmark tool
- Project scoping calculator
- Portfolio review tool
- Cost estimator
- Proposal generator

### E-commerce
- Product finder quiz
- Comparison tool
- Size/fit calculator
- Savings calculator
- Gift finder

### Developer Tools
- Code snippet library
- Testing/preview tool
- Documentation generator
- Interactive tutorials
- API playground

### Finance
- Financial calculators
- Investment comparison
- Budget planner
- Tax estimator
- Loan calculator

---

## referral-program — Affiliate Programs

<!-- Source: skills/referral-program/references/affiliate-programs.md -->

# Affiliate Program Design

Detailed guidance for building and managing affiliate programs.

## Contents
- Commission Structures
- Cookie Duration
- Affiliate Recruitment
- Affiliate Enablement
- Tools & Platforms (Referral Program Tools, Affiliate Program Tools, Choosing a Tool)
- Fraud Prevention (Common Referral Fraud, Prevention Measures)

## Commission Structures

**Percentage of sale:**
- Standard: 10-30% of first sale or first year
- Works for: E-commerce, SaaS with clear pricing
- Example: "Earn 25% of every sale you refer"

**Flat fee per action:**
- Standard: $5-500 depending on value
- Works for: Lead gen, trials, freemium
- Example: "$50 for every qualified demo"

**Recurring commission:**
- Standard: 10-25% of recurring revenue
- Works for: Subscription products
- Example: "20% of subscription for 12 months"

**Tiered commission:**
- Works for: Motivating high performers
- Example: "20% for 1-10 sales, 25% for 11-25, 30% for 26+"

---

## Cookie Duration

How long after click does affiliate get credit?

| Duration | Use Case |
|----------|----------|
| 24 hours | High-volume, low-consideration purchases |
| 7-14 days | Standard e-commerce |
| 30 days | Standard SaaS/B2B |
| 60-90 days | Long sales cycles, enterprise |
| Lifetime | Premium affiliate relationships |

---

## Affiliate Recruitment

### Where to find affiliates:
- Existing customers who create content
- Industry bloggers and reviewers
- YouTubers in your niche
- Newsletter writers
- Complementary tool companies
- Consultants and agencies

### Outreach template:
```
Subject: Partnership opportunity — [Your Product]

Hi [Name],

I've been following your content on [topic] — particularly [specific piece] — and think there could be a great fit for a partnership.

[Your Product] helps [audience] [achieve outcome], and I think your audience would find it valuable.

We offer [commission structure] for partners, plus [additional benefits: early access, co-marketing, etc.].

Would you be open to learning more?

[Your name]
```

---

## Affiliate Enablement

Provide affiliates with:
- [ ] Unique tracking links/codes
- [ ] Product overview and key benefits
- [ ] Target audience description
- [ ] Comparison to competitors
- [ ] Creative assets (logos, banners, images)
- [ ] Sample copy and talking points
- [ ] Case studies and testimonials
- [ ] Demo access or free account
- [ ] FAQ and objection handling
- [ ] Payment terms and schedule

---

## Tools & Platforms

### Referral Program Tools

**Full-featured platforms:**
- ReferralCandy — E-commerce focused
- Ambassador — Enterprise referral programs
- Friendbuy — E-commerce and subscription
- GrowSurf — SaaS and tech companies
- Mention Me — AI-powered referral marketing
- Viral Loops — Template-based campaigns

**Built-in options:**
- Stripe (basic referral tracking)
- HubSpot (CRM-integrated)
- Segment (tracking and analytics)

### Affiliate Program Tools

**Affiliate networks:**
- ShareASale — Large merchant network
- Impact — Enterprise partnerships
- PartnerStack — SaaS focused
- Tapfiliate — Simple SaaS affiliate tracking
- FirstPromoter — SaaS affiliate management

**Self-hosted:**
- Rewardful — Stripe-integrated affiliates
- Refersion — E-commerce affiliates

### Choosing a Tool

Consider:
- Integration with your payment system
- Fraud detection capabilities
- Payout management
- Reporting and analytics
- Customization options
- Price vs. program scale

---

## Fraud Prevention

### Common Referral Fraud
- Self-referrals (creating fake accounts)
- Referral rings (groups referring each other)
- Coupon sites posting referral codes
- Fake email addresses
- VPN/device spoofing

### Prevention Measures

**Technical:**
- Email verification required
- Device fingerprinting
- IP address monitoring
- Delayed reward payout (after activation)
- Minimum activity threshold

**Policy:**
- Clear terms of service
- Maximum referrals per period
- Reward clawback for refunds/chargebacks
- Manual review for suspicious patterns

**Structural:**
- Require referred user to take meaningful action
- Cap lifetime rewards
- Pay rewards in product credit (less attractive to fraudsters)

---

## referral-program — Program Examples

<!-- Source: skills/referral-program/references/program-examples.md -->

# Referral Program Examples

Real-world examples of successful referral programs.

## Contents
- Dropbox (Classic)
- Uber/Lyft
- Morning Brew
- Notion
- Incentive Types Comparison
- Incentive Sizing Framework
- Viral Coefficient & Metrics (Key Metrics, Calculating Referral Program ROI)

## Dropbox (Classic)

**Program:** Give 500MB storage, get 500MB storage

**Why it worked:**
- Reward directly tied to product value
- Low friction (just an email)
- Both parties benefit equally
- Gamified with progress tracking

---

## Uber/Lyft

**Program:** Give $10 ride credit, get $10 when they ride

**Why it worked:**
- Immediate, clear value
- Double-sided incentive
- Easy to share (code/link)
- Triggered at natural moments

---

## Morning Brew

**Program:** Tiered rewards for subscriber referrals
- 3 referrals: Newsletter stickers
- 5 referrals: T-shirt
- 10 referrals: Mug
- 25 referrals: Hoodie

**Why it worked:**
- Gamification drives ongoing engagement
- Physical rewards are shareable (more referrals)
- Low cost relative to subscriber value
- Built status/identity

---

## Notion

**Program:** $10 credit per referral (education)

**Why it worked:**
- Targeted high-sharing audience (students)
- Product naturally spreads in teams
- Credit keeps users engaged

---

## Incentive Types Comparison

| Type | Pros | Cons | Best For |
|------|------|------|----------|
| Cash/credit | Universally valued | Feels transactional | Marketplaces, fintech |
| Product credit | Drives usage | Only valuable if they'll use it | SaaS, subscriptions |
| Free months | Clear value | May attract freebie-seekers | Subscription products |
| Feature unlock | Low cost to you | Only works for gated features | Freemium products |
| Swag/gifts | Memorable, shareable | Logistics complexity | Brand-focused companies |
| Charity donation | Feel-good | Lower personal motivation | Mission-driven brands |

---

## Incentive Sizing Framework

**Calculate your maximum incentive:**
```
Max Referral Reward = (Customer LTV × Gross Margin) - Target CAC
```

**Example:**
- LTV: $1,200
- Gross margin: 70%
- Target CAC: $200
- Max reward: ($1,200 × 0.70) - $200 = $640

**Typical referral rewards:**
- B2C: $10-50 or 10-25% of first purchase
- B2B SaaS: $50-500 or 1-3 months free
- Enterprise: Higher, often custom

---

## Viral Coefficient & Metrics

### Key Metrics

**Viral coefficient (K-factor):**
```
K = Invitations × Conversion Rate

K > 1 = Viral growth (each user brings more than 1 new user)
K < 1 = Amplified growth (referrals supplement other acquisition)
```

**Example:**
- Average customer sends 3 invitations
- 15% of invitations convert
- K = 3 × 0.15 = 0.45

**Referral rate:**
```
Referral Rate = (Customers who refer) / (Total customers)
```

Benchmarks:
- Good: 10-25% of customers refer
- Great: 25-50%
- Exceptional: 50%+

**Referrals per referrer:**

Benchmarks:
- Average: 1-2 referrals per referrer
- Good: 2-5
- Exceptional: 5+

### Calculating Referral Program ROI

```
Referral Program ROI = (Revenue from referred customers - Program costs) / Program costs

Program costs = Rewards paid + Tool costs + Management time
```

**Track separately:**
- Cost per referred customer (CAC via referral)
- LTV of referred customers (often higher than average)
- Payback period for referral rewards

---

## lead-magnets — Benchmarks

<!-- Source: skills/lead-magnets/references/benchmarks.md -->

# Lead Magnet Benchmarks

Reference data for planning and evaluating lead magnet performance.

---

## Conversion Rate Benchmarks

### By Format Type

| Format | Landing Page Conversion | Notes |
|--------|------------------------|-------|
| Checklist | 30-50% | High because low commitment |
| Cheat sheet | 25-40% | Quick reference appeal |
| Template | 25-45% | Immediate utility drives conversion |
| Ebook/guide | 20-35% | Higher commitment, lower rate |
| Quiz | 30-50% | Engagement drives completion |
| Webinar | 20-40% (registration) | 30-50% attendance rate of registrants |
| Mini-course | 15-30% | Higher commitment, higher quality leads |
| Free trial | 5-15% | High intent but high friction |

### By Traffic Source

| Source | Expected Conversion | Why |
|--------|-------------------|-----|
| Blog content upgrade | 3-8% of post readers | Contextually relevant |
| Dedicated landing page (organic) | 20-40% | High intent |
| Dedicated landing page (paid) | 10-25% | Cold traffic |
| Exit-intent popup | 2-5% of visitors | Interruption-based |
| Sidebar/banner CTA | 0.5-2% | Low engagement |
| Social media link | 10-20% | Warm but browsing |

### By Industry (Landing Page)

| Industry | Average Conversion |
|----------|-------------------|
| SaaS/Tech | 15-25% |
| Marketing/Agency | 20-35% |
| Finance | 10-20% |
| E-commerce | 10-20% |
| Education | 20-35% |
| Health/Wellness | 15-25% |

---

## Lead Quality Indicators

### Signals of High-Quality Leads
- Open first 3 emails at 40%+ rate
- Click through to content or product pages
- Return to site within 30 days
- Match ICP demographics (role, company size, industry)
- Progress to trial, demo, or purchase within 90 days

### Signals of Low-Quality Leads
- Unsubscribe within first 3 emails
- Never open beyond delivery email
- Use disposable email addresses
- Don't match target customer profile
- Downloaded for the content, no product interest

### Quality vs. Quantity by Format

| Format | Lead Volume | Lead Quality | Net Value |
|--------|-------------|-------------|-----------|
| Generic ebook | High | Low-Medium | Medium |
| Specific template | Medium | High | High |
| Industry report | Medium | Medium-High | High |
| Quiz/assessment | High | Medium (segmentable) | High |
| Webinar | Low-Medium | High | High |
| Checklist | High | Low-Medium | Medium |
| Free trial | Low | Very High | Very High |

---

## Cost Benchmarks

### Cost Per Lead by Channel

| Channel | Typical CPL | Notes |
|---------|-------------|-------|
| Organic search | $0-5 | Lowest, but slow to build |
| Blog content upgrade | $0-2 | Nearly free if you have traffic |
| Facebook/Instagram Ads | $3-15 | B2C lower, B2B higher |
| Google Ads | $10-50 | High intent, higher cost |
| LinkedIn Ads | $25-75 | B2B, expensive but qualified |
| Partner co-promotion | $0-5 | Depends on relationship |

### Creation Cost by Format

| Format | DIY Cost | With Designer/Freelancer |
|--------|----------|-------------------------|
| Checklist | Free | $100-300 |
| Cheat sheet | Free | $200-500 |
| Template | Free | $100-500 |
| Ebook (10-25 pages) | Free | $500-2,000 |
| Quiz | $0-100/mo (tool) | $500-2,000 |
| Webinar | Free (Zoom) | $500-1,500 (production) |
| Mini-course (email) | Free | $500-1,500 (copywriting) |
| Video course | $0-200 (gear) | $2,000-5,000 |

---

## Timeline Expectations

### Time to Create

| Format | Solo Creator | With Team |
|--------|-------------|-----------|
| Checklist | 1-2 hours | Same day |
| Cheat sheet | 2-4 hours | Same day |
| Template | 2-8 hours | 1-2 days |
| Swipe file | 4-8 hours | 1-2 days |
| Ebook | 1-3 weeks | 1-2 weeks |
| Quiz | 1-2 weeks | 1 week |
| Webinar prep | 1 week | 3-5 days |
| Mini-course | 1-2 weeks | 1 week |

### Time to See Results

| Phase | Timeline |
|-------|----------|
| First leads | Immediately with existing traffic or paid |
| Organic traffic growth | 2-6 months (SEO) |
| Meaningful lead volume | 1-3 months |
| Measurable impact on pipeline | 3-6 months |
| Full ROI assessment | 6-12 months |

**Note**: These benchmarks are general guidelines. Your actual results depend on audience, niche, traffic volume, and offer quality. Start measuring from day one and build your own benchmarks.

---

## lead-magnets — Format Guide

<!-- Source: skills/lead-magnets/references/format-guide.md -->

# Lead Magnet Format Guide

Detailed creation guidance for each lead magnet format.

## Contents
- Ebooks & Guides
- Checklists
- Cheat Sheets
- Templates & Spreadsheets
- Swipe Files
- Mini-Courses
- Quizzes & Assessments
- Webinars & Workshops

---

## Ebooks & Guides

**Best for**: Building authority, deep education, awareness-stage leads

**Structure**:
1. Title page with professional design
2. Table of contents
3. Introduction — frame the problem, set expectations
4. 3-7 chapters — one key concept per chapter
5. Summary — recap key takeaways
6. CTA — next step toward your product

**Guidelines**:
- Ideal length: 10-25 pages (shorter is fine if valuable)
- Include visuals: charts, diagrams, screenshots
- Use callout boxes for key stats or quotes
- End each chapter with a quick takeaway
- Don't pad — density beats length

**Tools**: Canva, Google Docs → PDF, Notion export, Designrr, Beacon.by

---

## Checklists

**Best for**: Process-oriented tasks, quick wins, implementation help

**Structure**:
- Title: "[Number]-Point [Topic] Checklist"
- Numbered or checkbox items
- Group into logical sections if 10+ items
- Brief explanation per item (1-2 sentences)

**Guidelines**:
- Keep to 1-2 pages
- Use actionable language ("Verify X", "Set up Y", "Remove Z")
- Order by workflow sequence or priority
- Make it printable — clean layout, generous spacing
- Include a "done" checkbox for each item

**What works**: Step-by-step processes, audit criteria, launch checklists, setup guides

---

## Cheat Sheets

**Best for**: Reference material, shortcuts, quick-lookup information

**Structure**:
- One page (two pages max)
- Organized by category or workflow
- Dense but scannable
- Visual hierarchy with headers and grouping

**Guidelines**:
- Optimize for quick reference, not reading
- Use tables, grids, or columns
- Include formulas, shortcuts, or code snippets
- Design for printing or saving as desktop reference
- Bold the most important items

**What works**: Keyboard shortcuts, formula references, terminology glossaries, decision matrices

---

## Templates & Spreadsheets

**Best for**: Repeatable processes, planning, tracking

### Spreadsheet Templates (Google Sheets / Excel)
- Include a "How to Use" tab with instructions
- Pre-fill with example data
- Use data validation for dropdown fields
- Add conditional formatting for visual cues
- Lock formula cells, leave input cells editable
- Include a "Make a Copy" link (Google Sheets)

### Notion Templates
- Provide a duplicate link
- Include a getting-started guide
- Pre-populate with example content
- Use Notion's database features (views, filters, relations)
- Keep it simple — don't over-engineer

### Document Templates
- Provide in multiple formats (Google Doc, Word, PDF)
- Include placeholder text with [BRACKETS] for customization
- Add inline instructions in a different color
- Make it immediately usable with minimal editing

**Key principle**: Templates should be usable within 5 minutes of downloading.

---

## Swipe Files

**Best for**: Inspiration, examples, learning from others

**Structure**:
- Curated collection of 15-50 examples
- Organized by category, type, or use case
- Each example includes:
  - The example itself (screenshot, text, link)
  - Why it works (2-3 bullet annotations)
  - How to adapt it (1-2 sentences)

**Guidelines**:
- Quality over quantity — curate ruthlessly
- Add your analysis, don't just collect
- Organize for browsing (categories, tags)
- Update periodically with fresh examples
- Credit original sources

**What works**: Email subject lines, landing pages, ad copy, CTAs, onboarding flows, pricing pages

---

## Mini-Courses

### Email-Based Mini-Courses
- 3-5 emails delivered over 5-7 days
- One lesson per email, one concept per lesson
- Each email: teach → example → exercise
- Progressive difficulty (build on previous lessons)
- Final email: summary + CTA for product or next step

### Video-Based Mini-Courses
- 3-5 videos, 5-15 minutes each
- Host on unlisted YouTube, Loom, or course platform
- Deliver links via email drip
- Include worksheets or exercises per lesson
- More personal — builds stronger connection

**Cadence**: Every 1-2 days. Don't stretch too thin or compress too tight.

**Key principle**: Each lesson should deliver standalone value. If someone only watches lesson 2, they should still learn something useful.

---

## Quizzes & Assessments

**Best for**: Engagement, segmentation, personalized results

**Question Design**:
- 5-10 questions (sweet spot: 7)
- Multiple choice only — no open-ended
- Questions should feel insightful, not obvious
- Progress indicator ("Question 3 of 7")

**Result Segmentation**:
- 3-5 result categories
- Each result: name, description, personalized recommendations
- Tailor follow-up emails by result type
- Share-worthy result format ("I got: Growth Stage Marketer!")

**Implementation**: Gate results behind email capture. The quiz itself is ungated — the personalized results require an email.

**For building interactive quizzes**: See **free-tool-strategy** skill for technical implementation guidance.

---

## Webinars & Workshops

### Live Webinars
- 30-45 minutes teaching + 15 minutes Q&A
- Structure: Hook → Teach (3 key points) → Demo/example → CTA
- Promote 1-2 weeks in advance
- Send 3 reminder emails (confirmation, day before, 1 hour before)
- Record for replay (extends value)

### Evergreen Webinars
- Pre-recorded, available on demand
- Same structure as live but tighter editing
- Always-on lead generation
- Gate with email registration
- Automated follow-up sequence

**Follow-up**: Send replay link + summary + CTA within 24 hours. Continue with nurture sequence.

**Key principle**: Teach something genuinely useful. A webinar that's just a sales pitch will damage trust.
