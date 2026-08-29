# Sales & RevOps — Reference Materials

Consolidated reference documentation for the sales & revops skills.
Source: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)

---

## revops — Automation Playbooks

<!-- Source: skills/revops/references/automation-playbooks.md -->

# Automation Playbooks

Platform-specific workflow recipes for HubSpot, Salesforce, scheduling tools, and cross-tool automation.

## HubSpot Workflow Recipes

### 1. MQL Alert and Assignment

**Name:** MQL Notification and Task Creation
**Trigger:** Contact property "Lifecycle Stage" is changed to "Marketing Qualified Lead"
**Actions:**
1. Rotate contact owner among sales team (round-robin)
2. Send internal email notification to contact owner with lead context
3. Create task: "Follow up with [Contact Name]" — due in 4 hours
4. Send Slack notification to #sales-alerts channel
5. Enroll in "MQL Follow-Up" sequence (if using HubSpot Sequences)
**Outcome:** Every MQL gets assigned instantly with a clear SLA
**Notes:** Set enrollment criteria to exclude leads already owned by a rep

---

### 2. MQL SLA Escalation

**Name:** MQL SLA Breach Alert
**Trigger:** Contact property "Lifecycle Stage" equals "MQL" AND "Days since last contacted" is greater than 0.5 (12 hours)
**Actions:**
1. Send internal email to contact owner: "SLA warning: [Contact Name] has not been contacted"
2. If still no activity after 24 hours → send alert to sales manager
3. If still no activity after 48 hours → reassign contact owner via rotation
4. Create task for new owner: "Urgent: Contact [Contact Name] — reassigned due to SLA breach"
**Outcome:** No MQL goes unworked for more than 48 hours
**Notes:** Exclude contacts where last activity type is "Call" or "Meeting" (already engaged)

---

### 3. Lead Scoring Update and MQL Promotion

**Name:** Auto-MQL on Score Threshold
**Trigger:** Contact property "HubSpot Score" is greater than or equal to 65
**Actions:**
1. Set lifecycle stage to "Marketing Qualified Lead"
2. Set "MQL Date" to current date
3. Suppress from marketing nurture workflows
4. Trigger MQL Alert workflow (recipe #1)
**Outcome:** Leads automatically promote to MQL when they hit the scoring threshold
**Notes:** Add suppression list for existing customers and competitors

---

### 4. Meeting Booked Notification

**Name:** Meeting Booked Alert to AE
**Trigger:** Meeting activity is logged for contact (via Calendly/HubSpot meetings)
**Actions:**
1. Send internal email to contact owner with meeting details
2. Update contact property "Last Meeting Booked" to current date
3. If lifecycle stage is "Lead" → update to "MQL"
4. Create task: "Prepare for meeting with [Contact Name]" — due 1 hour before meeting
5. Send Slack notification to #meetings channel
**Outcome:** AEs are prepared for every meeting with full context
**Notes:** Include recent page views and content downloads in notification email

---

### 5. Closed-Won Handoff to CS

**Name:** Customer Onboarding Trigger
**Trigger:** Deal stage is changed to "Closed Won"
**Actions:**
1. Update associated contact lifecycle stage to "Customer"
2. Set "Customer Since" date to current date
3. Assign contact owner to CS team member (based on segment/territory)
4. Create task for CS: "Schedule kickoff call with [Company Name]" — due in 2 business days
5. Enroll contact in "Customer Onboarding" email sequence
6. Send internal notification to CS manager
7. Remove from all sales sequences
**Outcome:** Seamless handoff from sales to customer success
**Notes:** Include deal notes, contract value, and key stakeholders in CS notification

---

### 6. Stale Deal Alert

**Name:** Pipeline Hygiene — Stale Deal Detection
**Trigger:** Deal property "Days in current stage" is greater than [2x average for that stage]
**Actions:**
1. Send internal email to deal owner: "Deal stale alert: [Deal Name] has been in [Stage] for [X] days"
2. Create task: "Update or close [Deal Name]" — due in 3 business days
3. If no update after 7 days → alert sales manager
4. Add to "Stale Deals" dashboard list
**Outcome:** Pipeline stays clean and forecast stays accurate
**Notes:** Customize thresholds per stage (Discovery: 14 days, Proposal: 10 days, Negotiation: 21 days)

---

### 7. Recycled Lead Nurture Re-Entry

**Name:** MQL Recycling to Nurture
**Trigger:** Contact property "Sales Rejection Reason" is known (any value)
**Actions:**
1. Update lifecycle stage to "Recycled"
2. Reset engagement score to baseline (keep fit score)
3. Enroll in "Recycled Lead Nurture" sequence (lower frequency)
4. Set "Recycle Date" to current date
5. Set re-enrollment trigger: if HubSpot Score exceeds threshold again, re-trigger MQL workflow
**Outcome:** Rejected leads get a second chance without clogging the pipeline
**Notes:** Track recycled-to-MQL conversion rate as a separate metric

---

### 8. Lead Activity Digest

**Name:** Daily Lead Activity Summary
**Trigger:** Scheduled — daily at 8:00 AM local time
**Actions:**
1. Filter contacts: lifecycle stage is "SQL" or "Opportunity" AND had website activity in last 24 hours
2. Send digest email to each contact owner with their leads' activity
3. Include: pages visited, content downloaded, emails opened/clicked
**Outcome:** Sales reps start each day knowing which leads are active
**Notes:** Only include leads with meaningful activity (exclude single homepage visits)

---

## Salesforce Flow Equivalents

### 1. MQL Alert and Assignment (Salesforce Flow)

**Type:** Record-Triggered Flow
**Object:** Lead
**Trigger:** Lead field "Status" is changed to "MQL"
**Flow steps:**
1. Get Records: Query "Rep Assignment" custom object for next available rep
2. Update Records: Set Lead Owner to assigned rep
3. Create Records: Create Task — "Contact MQL: {Lead.Name}" with due date = NOW + 4 hours
4. Action: Send email alert to new lead owner
5. Update Records: Update "Rep Assignment" last-assigned timestamp
**Notes:** Use a custom "Rep Assignment" object to manage round-robin state

### 2. SLA Escalation (Salesforce Flow)

**Type:** Scheduled-Triggered Flow
**Schedule:** Every 4 hours during business hours
**Flow steps:**
1. Get Records: Leads where Status = "MQL" AND LastActivityDate < TODAY - 1
2. Decision: Is lead older than 48 hours with no activity?
   - YES → Reassign to next rep, create urgent task, alert manager
   - NO → Send reminder email to current owner
**Notes:** Pair with Process Builder for real-time alerts on initial assignment

### 3. Pipeline Stage Automation (Salesforce Flow)

**Type:** Record-Triggered Flow
**Object:** Opportunity
**Trigger:** Stage field is updated
**Flow steps:**
1. Decision: Which stage was it changed to?
2. For each stage:
   - **Discovery:** Create task "Complete discovery questionnaire"
   - **Demo:** Create task "Prepare demo environment"
   - **Proposal:** Create task "Send proposal" + alert deal desk if ACV > $25K
   - **Closed Won:** Trigger CS handoff (create Case, assign CS owner, send welcome email)
   - **Closed Lost:** Create task "Log loss reason" + add to win/loss analysis report

### 4. Stale Deal Detection (Salesforce Flow)

**Type:** Scheduled-Triggered Flow
**Schedule:** Daily at 7:00 AM
**Flow steps:**
1. Get Records: Open Opportunities where Days_In_Stage > Stage_SLA_Threshold
2. Loop through results:
   - Create Task: "Update stale deal: {Opportunity.Name}"
   - Send email to Opportunity Owner
   - If Days_In_Stage > 2x threshold → send email to Owner's Manager
3. Update custom field "Stale Flag" = true for dashboard visibility

---

## Calendly / SavvyCal Integration Patterns

### Round-Robin Meeting Scheduling

**Calendly setup:**
1. Create a team event type with all eligible reps
2. Distribution: "Optimize for equal distribution"
3. Availability: Each rep manages their own calendar
4. Buffer: 15 min before and after meetings
5. Minimum notice: 4 hours (avoid last-minute bookings)

**CRM integration:**
1. Calendly webhook fires on booking
2. Match invitee email to CRM contact
3. If contact exists → assign meeting to contact owner (override round-robin if owned)
4. If new contact → create lead, assign via routing rules, log meeting
5. Set lifecycle stage to MQL (meeting = high intent)

### SavvyCal Setup

**Advantages over Calendly:**
- Priority-based scheduling (prefer certain time slots)
- Overlay calendars (show team availability in one view)
- Personalized booking links per rep

**Integration pattern:**
1. Create team scheduling link with priority rules
2. Webhook on booking → Zapier/Make → CRM
3. Match or create contact, assign owner, create task
4. Send confirmation with meeting prep materials

### Meeting Routing by Criteria

```
Booking form submitted
├─ Company size > 500? (form field)
│  ├─ YES → Route to enterprise AE calendar
│  └─ NO ↓
├─ Existing customer? (CRM lookup)
│  ├─ YES → Route to account owner's calendar
│  └─ NO ↓
└─ Round-robin across SDR team
```

### No-Show Workflow

**Trigger:** Meeting time passes + no meeting notes logged within 30 minutes
**Actions:**
1. Wait 30 minutes after scheduled meeting time
2. Check: Was a call or meeting logged?
   - YES → No action
   - NO → Send "Sorry we missed you" email to prospect
3. Create task: "Reschedule with [Contact Name]" — due next business day
4. If second no-show → flag contact and alert manager

---

## Zapier Cross-Tool Patterns

### 1. New Lead → CRM + Slack + Task

**Trigger:** New form submission (Typeform, HubSpot, Webflow)
**Actions:**
1. Create/update contact in CRM
2. Enrich with Clearbit (if available)
3. Post to Slack #new-leads with enriched data
4. Create task in project management tool (Asana, Linear)

### 2. Meeting Booked → CRM + Prep Email

**Trigger:** New Calendly/SavvyCal booking
**Actions:**
1. Find or create CRM contact
2. Update lifecycle stage to MQL
3. Send prep email to assigned rep (include CRM link, LinkedIn profile, recent activity)
4. Create pre-meeting task

### 3. Deal Closed → Onboarding Stack

**Trigger:** CRM deal stage changed to "Closed Won"
**Actions:**
1. Create customer record in CS tool (Vitally, Gainsight, ChurnZero)
2. Add to onboarding project template
3. Send welcome email via email tool
4. Create Slack channel: #customer-[company-name]
5. Notify CS team in Slack

### 4. Lead Scoring → Cross-Tool Sync

**Trigger:** CRM lead score crosses MQL threshold
**Actions:**
1. Update marketing automation platform status
2. Add to retargeting audience (Facebook, Google Ads)
3. Trigger SDR outreach sequence
4. Log event in analytics (Mixpanel, Amplitude)

### 5. SLA Breach → Multi-Channel Alert

**Trigger:** CRM task overdue (MQL follow-up task)
**Actions:**
1. Send Slack DM to rep
2. Send email to rep
3. If 2+ hours overdue → Slack DM to manager
4. If 4+ hours overdue → reassign in CRM (via webhook back to CRM)

### 6. Weekly Pipeline Digest

**Trigger:** Schedule — every Monday at 8:00 AM
**Actions:**
1. Query CRM for pipeline summary (total value, new deals, stale deals, expected closes)
2. Format as summary
3. Post to Slack #sales-team
4. Send email digest to sales leadership

---

## revops — Lifecycle Definitions

<!-- Source: skills/revops/references/lifecycle-definitions.md -->

# Lifecycle Stage Definitions

Complete templates for lead lifecycle stages, MQL criteria by business type, SLAs, and rejection/recycling workflows.

## Stage Templates

### Subscriber

**Entry criteria:**
- Opted in to blog, newsletter, or content updates
- No company information required

**Exit criteria:**
- Provides company information via form or enrichment
- Visits 3+ pages in a session
- Downloads gated content

**Owner:** Marketing (automated)

**Actions on entry:**
- Add to newsletter nurture
- Begin tracking engagement score

---

### Lead

**Entry criteria:**
- Identified contact with name + email + company
- May come from form fill, enrichment, or import

**Exit criteria:**
- Reaches MQL threshold (fit + engagement)
- Manually qualified by marketing/SDR

**Owner:** Marketing

**Actions on entry:**
- Enrich contact data (company size, industry, role)
- Begin scoring
- Add to relevant nurture sequence

---

### MQL (Marketing Qualified Lead)

**Entry criteria:**
- Meets fit score threshold AND engagement score threshold
- OR triggers high-intent action (demo request, pricing page + form fill)

**Exit criteria:**
- Sales accepts (becomes SQL)
- Sales rejects (recycled to nurture with reason code)
- No response within SLA (escalated to manager)

**Owner:** Marketing → Sales (handoff)

**Actions on entry:**
- Instant alert to assigned sales rep
- Create follow-up task with 4-hour SLA
- Pause marketing nurture sequences
- Log all recent activity for sales context

---

### SQL (Sales Qualified Lead)

**Entry criteria:**
- Sales rep has had qualifying conversation
- Confirmed: budget, authority, need, or timeline (at least 2 of 4)

**Exit criteria:**
- Opportunity created with projected value
- Disqualified (recycled with reason code)

**Owner:** Sales (SDR or AE)

**Actions on entry:**
- Update lifecycle stage in CRM
- Notify AE if SDR-qualified
- Begin sales sequence if not already in conversation

---

### Opportunity

**Entry criteria:**
- Formal opportunity created in CRM
- Deal value, close date, and stage assigned

**Exit criteria:**
- Closed-won or closed-lost

**Owner:** Sales (AE)

**Actions on entry:**
- Add to pipeline reporting
- Create deal tasks (proposal, demo, etc.)
- Notify CS if deal is likely to close

---

### Customer

**Entry criteria:**
- Closed-won deal
- Contract signed and payment terms set

**Exit criteria:**
- Churns, expands, or renews

**Owner:** Customer Success / Account Management

**Actions on entry:**
- Trigger onboarding sequence
- Assign CS manager
- Schedule kickoff call
- Remove from all sales sequences

---

### Evangelist

**Entry criteria:**
- NPS score 9-10, or active referral behavior
- Agreed to case study, testimonial, or referral program

**Exit criteria:**
- Ongoing program participation

**Owner:** Customer Success + Marketing

**Actions on entry:**
- Add to advocacy program
- Request case study or testimonial
- Invite to referral program
- Feature in marketing campaigns (with permission)

---

## MQL Criteria Templates by Business Type

### PLG (Product-Led Growth)

**Fit score (40% weight):**

| Attribute | Points |
|-----------|--------|
| Company size 10-500 | +15 |
| Company size 500-5000 | +20 |
| Target industry | +10 |
| Decision-maker role | +15 |
| Uses complementary tool | +10 |

**Engagement score (60% weight) — weight product usage heavily:**

| Signal | Points |
|--------|--------|
| Created free account | +15 |
| Completed onboarding | +20 |
| Used core feature 3+ times | +25 |
| Invited team member | +20 |
| Hit usage limit | +15 |
| Visited pricing page | +10 |

**MQL threshold:** 65 points

---

### Sales-Led (Enterprise)

**Fit score (60% weight) — weight fit heavily:**

| Attribute | Points |
|-----------|--------|
| Company size 500+ | +20 |
| Target industry | +15 |
| VP+ title | +20 |
| Budget authority confirmed | +15 |
| Uses competitor product | +10 |

**Engagement score (40% weight):**

| Signal | Points |
|--------|--------|
| Requested demo | +25 |
| Attended webinar | +10 |
| Downloaded whitepaper | +10 |
| Visited pricing page 2+ times | +15 |
| Engaged with sales email | +10 |

**MQL threshold:** 70 points

---

### Mid-Market (Balanced)

**Fit score (50% weight):**

| Attribute | Points |
|-----------|--------|
| Company size 50-1000 | +15 |
| Target industry | +10 |
| Manager+ title | +15 |
| Target geography | +10 |

**Engagement score (50% weight):**

| Signal | Points |
|--------|--------|
| Demo request | +25 |
| Free trial signup | +20 |
| Pricing page visit | +10 |
| Content download (2+) | +10 |
| Email click (3+) | +10 |
| Webinar attendance | +10 |

**MQL threshold:** 60 points

---

## SLA Templates

### MQL-to-SQL SLA

| Metric | Target | Escalation |
|--------|--------|------------|
| First contact attempt | Within 4 business hours | Alert to sales manager at 4 hours |
| Qualification decision | Within 48 hours | Auto-escalate at 48 hours |
| Meeting scheduled (if qualified) | Within 5 business days | Weekly pipeline review flag |

### SQL-to-Opportunity SLA

| Metric | Target | Escalation |
|--------|--------|------------|
| Discovery call completed | Within 3 business days of SQL | Alert to AE manager |
| Opportunity created | Within 5 business days of SQL | Pipeline review flag |

### Opportunity-to-Close SLA

| Metric | Target | Escalation |
|--------|--------|------------|
| Proposal delivered | Within 5 business days of demo | AE manager alert |
| Deal stale in stage | 2x average days for that stage | Pipeline review flag |
| Close date pushed 2+ times | Immediate | Forecast review required |

---

## Lead Rejection and Recycling

### Rejection Reason Codes

| Code | Reason | Recycle Action |
|------|--------|----------------|
| **FIT-01** | Company too small | Nurture; re-score if company grows |
| **FIT-02** | Wrong industry | Archive; do not recycle |
| **FIT-03** | Wrong role / no authority | Nurture; monitor for org changes |
| **ENG-01** | No response after 3 attempts | Recycle to nurture in 90 days |
| **ENG-02** | Interested but bad timing | Recycle to nurture; re-engage in 60 days |
| **QUAL-01** | No budget | Recycle to nurture in 90 days |
| **QUAL-02** | Using competitor, locked in | Recycle; trigger before contract renewal |
| **QUAL-03** | Not a real project | Archive; do not recycle |

### Recycling Workflow

1. Sales rejects MQL with reason code
2. CRM updates lifecycle stage to "Recycled"
3. Lead enters recycling nurture sequence (different from original nurture)
4. Engagement score resets to baseline (keep fit score)
5. If lead re-engages and crosses MQL threshold, re-route to sales with "Recycled MQL" flag
6. Track recycled MQL conversion rate separately

### Recycling Nurture Sequence

- **Frequency:** Bi-weekly or monthly (lower frequency than initial nurture)
- **Content:** Industry insights, case studies, product updates
- **Duration:** 6 months, then archive if no engagement
- **Re-MQL trigger:** High-intent action (demo request, pricing page revisit)

---

## revops — Routing Rules

<!-- Source: skills/revops/references/routing-rules.md -->

# Lead Routing Rules

Decision trees, platform-specific configurations, territory routing, ABM routing, and speed-to-lead benchmarks.

## Routing Decision Tree

Use this template to map your routing logic:

```
New Lead Arrives
│
├─ Is this a named/target account?
│  ├─ YES → Route to assigned account owner
│  └─ NO ↓
│
├─ Is ACV likely > $50K? (based on company size + industry)
│  ├─ YES → Route to enterprise AE team
│  └─ NO ↓
│
├─ Is this a PLG signup with team usage?
│  ├─ YES → Route to PLG sales specialist
│  └─ NO ↓
│
├─ Does lead match a territory?
│  ├─ YES → Route to territory owner
│  └─ NO ↓
│
└─ Default: Round-robin across available reps
   └─ If no rep available: Assign to team queue with 1-hour SLA
```

Customize this tree for your business. The key principle: **route to the most specific match first, fall back to general.**

---

## Round-Robin Configuration

### Basic Round-Robin Rules

1. Distribute leads evenly across eligible reps
2. Skip reps who are on PTO, at capacity, or have a full pipeline
3. Weight by quota attainment (reps below quota get slight priority)
4. Reset distribution count weekly or monthly
5. Log every assignment for auditing

### HubSpot Round-Robin Setup

**Using HubSpot's rotation tool:**
- Navigate to Automation → Workflows
- Trigger: Contact property "Lifecycle Stage" equals "MQL"
- Action: Rotate contact owner among selected users
- Options: Even distribution, skip unavailable owners
- Add delay + task creation after assignment

**Custom rotation with workflows:**
1. Create a custom property "Rotation Counter" (number)
2. Workflow trigger: New MQL created
3. Branch by rotation counter value (0, 1, 2... for each rep)
4. Set contact owner to corresponding rep
5. Increment counter (reset at max)
6. Create follow-up task with SLA deadline

### Salesforce Round-Robin Setup

**Using Lead Assignment Rules:**
1. Setup → Feature Settings → Marketing → Lead Assignment Rules
2. Create rule entries in priority order (most specific first)
3. For round-robin: Use assignment rule + custom logic

**Using Flow for advanced routing:**
1. Create a Record-Triggered Flow on Lead creation
2. Get Records: Query a custom "Rep Queue" object for next available rep
3. Decision element: Check rep availability, capacity, territory
4. Update Records: Assign lead owner
5. Create Task: Follow-up task with SLA
6. Update "Rep Queue" to track last assignment

---

## Territory Routing

### By Geography

| Territory | Regions | Assigned Team |
|-----------|---------|---------------|
| West | CA, WA, OR, NV, AZ, UT, CO, HI | Team West |
| Central | TX, IL, MN, MO, OH, MI, WI, IN | Team Central |
| East | NY, MA, PA, NJ, CT, VA, FL, GA | Team East |
| International | All non-US | International team |

### By Company Size

| Segment | Company Size | Team |
|---------|-------------|------|
| SMB | 1-50 employees | Inside sales |
| Mid-market | 51-500 employees | Mid-market AEs |
| Enterprise | 501-5000 employees | Enterprise AEs |
| Strategic | 5000+ employees | Strategic account team |

### By Industry

| Vertical | Industries | Specialist |
|----------|-----------|------------|
| Tech | SaaS, IT services, hardware | Tech vertical rep |
| Financial | Banking, insurance, fintech | Financial vertical rep |
| Healthcare | Hospitals, pharma, healthtech | Healthcare vertical rep |
| General | All others | General pool (round-robin) |

### Hybrid Territory Model

Combine multiple dimensions for precision:

```
Lead arrives
├─ Company size > 1000?
│  ├─ YES → Enterprise team
│  │  └─ Sub-route by geography
│  └─ NO ↓
├─ Industry = Healthcare or Financial?
│  ├─ YES → Vertical specialist
│  └─ NO ↓
└─ Round-robin across general pool
   └─ Weighted by geography preference
```

---

## Named Account / ABM Routing

### Setup

1. **Define target account list** (typically 50-500 accounts)
2. **Assign account owners** in CRM (1 rep per account)
3. **Match logic:** Any lead from a target account domain routes to account owner
4. **Matching rules:**
   - Email domain match (primary)
   - Company name fuzzy match (secondary, requires manual review)
   - IP-to-company resolution (tertiary, for anonymous visitors)

### ABM Routing Rules

| Tier | Account Type | Routing | Response SLA |
|------|-------------|---------|--------------|
| Tier 1 | Top 20 strategic accounts | Named owner, instant alert | 1 hour |
| Tier 2 | Top 100 target accounts | Named owner, standard alert | 4 hours |
| Tier 3 | Target industry / size match | Territory or round-robin | Same business day |

### Multi-Contact Handling

When multiple contacts from the same account engage:
- Route all contacts to the **same account owner**
- Notify the owner of new contacts entering
- Track account-level engagement score (sum of all contacts)
- Trigger "buying committee" alert when 3+ contacts from one account engage

---

## Speed-to-Lead Data

### Response Time Impact on Conversion

| Response Time | Relative Qualification Rate | Notes |
|---------------|---------------------------|-------|
| Under 5 minutes | **21x** more likely to qualify | Gold standard |
| 5-10 minutes | 10x more likely | Still strong |
| 10-30 minutes | 4x more likely | Acceptable for most |
| 30 min - 1 hour | 2x more likely | Below best practice |
| 1-24 hours | Baseline | Industry average |
| 24+ hours | 60% lower than baseline | Lead is effectively cold |

Source: Lead Connect, InsideSales.com

### Implementing Speed-to-Lead

1. **Instant notification** — Push notification + email to rep on MQL creation
2. **Auto-task with timer** — Create task with 5-minute SLA countdown
3. **Escalation chain:**
   - 5 min: Original rep alerted
   - 15 min: Backup rep alerted
   - 30 min: Manager alerted
   - 1 hour: Lead reassigned to next available rep
4. **Measure and report** — Track actual response times weekly; recognize fast responders

### Speed-to-Lead Automation

**Trigger:** New MQL created
**Actions:**
1. Assign to rep via routing rules (instant)
2. Send push notification + email to rep
3. Create task: "Contact [Lead Name] — 5 min SLA"
4. Start SLA timer
5. If no activity logged in 15 min → alert backup rep
6. If no activity in 30 min → alert manager
7. If no activity in 60 min → reassign via round-robin

### Measuring Speed-to-Lead

Track these metrics weekly:
- **Average time to first contact** (from MQL creation to first call/email)
- **Median time to first contact** (less skewed by outliers)
- **% of leads contacted within SLA** (target: 90%+)
- **Contact rate by time of day** (identify coverage gaps)
- **Conversion rate by response time** (prove the ROI of speed)

---

## revops — Scoring Models

<!-- Source: skills/revops/references/scoring-models.md -->

# Lead Scoring Models

Detailed scoring templates, example models by business type, and calibration guidance.

## Explicit Scoring Template (Fit)

### Company Attributes

| Attribute | Criteria | Points |
|-----------|----------|--------|
| **Company size** | 1-10 employees | +5 |
| | 11-50 employees | +10 |
| | 51-200 employees | +15 |
| | 201-1000 employees | +20 |
| | 1000+ employees | +15 (unless enterprise-focused, then +25) |
| **Industry** | Primary target industry | +20 |
| | Secondary target industry | +10 |
| | Non-target industry | 0 |
| **Revenue** | Under $1M | +5 |
| | $1M-$10M | +10 |
| | $10M-$100M | +15 |
| | $100M+ | +20 |
| **Geography** | Primary market | +10 |
| | Secondary market | +5 |
| | Non-target market | 0 |

### Contact Attributes

| Attribute | Criteria | Points |
|-----------|----------|--------|
| **Job title** | C-suite (CEO, CTO, CMO) | +25 |
| | VP level | +20 |
| | Director level | +15 |
| | Manager level | +10 |
| | Individual contributor | +5 |
| **Department** | Primary buying department | +15 |
| | Adjacent department | +5 |
| | Unrelated department | 0 |
| **Seniority** | Decision maker | +20 |
| | Influencer | +10 |
| | End user | +5 |

### Technology Attributes

| Attribute | Criteria | Points |
|-----------|----------|--------|
| **Tech stack** | Uses complementary tool | +15 |
| | Uses competitor | +10 (they understand the category) |
| | Uses tool you replace | +20 |
| **Tech maturity** | Modern stack (cloud, SaaS-forward) | +10 |
| | Legacy stack | +5 |

---

## Implicit Scoring Template (Engagement)

### High-Intent Signals

| Signal | Points | Decay |
|--------|--------|-------|
| **Demo request** | +30 | None |
| **Pricing page visit** | +20 | -5 per week |
| **Free trial signup** | +25 | None |
| **Contact sales form** | +30 | None |
| **Case study page (2+)** | +15 | -5 per 2 weeks |
| **Comparison page visit** | +15 | -5 per week |
| **ROI calculator used** | +20 | -5 per 2 weeks |

### Medium-Intent Signals

| Signal | Points | Decay |
|--------|--------|-------|
| **Webinar registration** | +10 | -5 per month |
| **Webinar attendance** | +15 | -5 per month |
| **Whitepaper download** | +10 | -5 per month |
| **Blog visit (3+ in a week)** | +10 | -5 per 2 weeks |
| **Email click** | +5 per click | -2 per month |
| **Email open (3+)** | +5 | -2 per month |
| **Social media engagement** | +5 | -2 per month |

### Low-Intent Signals

| Signal | Points | Decay |
|--------|--------|-------|
| **Single blog visit** | +2 | -2 per month |
| **Newsletter open** | +2 | -1 per month |
| **Single email open** | +1 | -1 per month |
| **Visited homepage only** | +1 | -1 per week |

### Product Usage Signals (PLG)

| Signal | Points | Decay |
|--------|--------|-------|
| **Created account** | +15 | None |
| **Completed onboarding** | +20 | None |
| **Used core feature (3+ times)** | +25 | -5 per month inactive |
| **Invited team member** | +25 | None |
| **Hit usage limit** | +20 | -10 per month |
| **Exported data** | +10 | -5 per month |
| **Connected integration** | +15 | None |
| **Daily active for 5+ days** | +20 | -10 per 2 weeks inactive |

---

## Negative Scoring Signals

| Signal | Points | Notes |
|--------|--------|-------|
| **Competitor email domain** | -50 | Auto-flag for review |
| **Student email (.edu)** | -30 | May still be valid in some cases |
| **Personal email (gmail, yahoo)** | -10 | Less relevant for B2B; adjust for SMB |
| **Unsubscribe from emails** | -20 | Reduce engagement score |
| **Bounce (hard)** | -50 | Remove from scoring |
| **Spam complaint** | -100 | Remove from all sequences |
| **Job title: Student/Intern** | -25 | Low buying authority |
| **Job title: Consultant** | -10 | May be evaluating for client |
| **No website visit in 90 days** | -15 | Score decay |
| **Invalid phone number** | -10 | Data quality signal |
| **Careers page visitor only** | -30 | Likely a job seeker |

---

## Example Scoring Models

### Model 1: PLG SaaS (ACV $500-$5K)

**Weight: 30% fit / 70% engagement (heavily favor product usage)**

**Fit criteria:**
- Company size 10-500: +15
- Target industry: +10
- Manager+ role: +10
- Uses complementary tool: +10

**Engagement criteria:**
- Created free account: +15
- Completed onboarding: +20
- Used core feature 3+ times: +25
- Invited team member: +25
- Hit usage limit: +20
- Pricing page visit: +15

**Negative:**
- Personal email: -10
- No login in 14 days: -15
- Competitor domain: -50

**MQL threshold: 60 points**
**Recalibration: Monthly** (fast feedback loop with high volume)

---

### Model 2: Enterprise Sales-Led (ACV $50K+)

**Weight: 60% fit / 40% engagement (fit is critical at this ACV)**

**Fit criteria:**
- Company size 500+: +20
- Revenue $50M+: +15
- Target industry: +15
- VP+ title: +20
- Decision maker confirmed: +15
- Uses competitor: +10

**Engagement criteria:**
- Demo request: +30
- Multiple stakeholders engaged: +20
- Attended executive webinar: +15
- Downloaded ROI guide: +10
- Visited pricing page 2+: +15

**Negative:**
- Company too small (<100): -30
- Individual contributor only: -15
- Competitor domain: -50

**MQL threshold: 75 points**
**Recalibration: Quarterly** (longer sales cycles, smaller sample size)

---

### Model 3: Mid-Market Hybrid (ACV $5K-$25K)

**Weight: 50% fit / 50% engagement (balanced approach)**

**Fit criteria:**
- Company size 50-1000: +15
- Target industry: +10
- Manager-VP title: +15
- Target geography: +10
- Uses complementary tool: +10

**Engagement criteria:**
- Demo request or trial signup: +25
- Pricing page visit: +15
- Case study download: +10
- Webinar attendance: +10
- Email engagement (3+ clicks): +10
- Blog visits (5+ pages): +10

**Negative:**
- Personal email: -10
- No engagement in 30 days: -10
- Competitor domain: -50
- Student/intern title: -25

**MQL threshold: 65 points**
**Recalibration: Quarterly**

---

## Threshold Calibration

### Setting the Initial Threshold

1. **Pull closed-won data** from the last 6-12 months
2. **Retroactively score** each deal using your new model
3. **Find the natural breakpoint** — what score separated wins from losses?
4. **Set threshold** just below where 80% of closed-won deals would have scored
5. **Validate** against closed-lost — if many closed-lost score above threshold, tighten criteria

### Calibration Cadence

| Business Type | Recalibration Frequency | Why |
|---------------|------------------------|-----|
| PLG / High volume | Monthly | Fast feedback loop, lots of data |
| Mid-market | Quarterly | Moderate cycle length |
| Enterprise | Quarterly to semi-annually | Long cycles, small sample size |

### Calibration Steps

1. **Pull MQL-to-closed data** for the calibration period
2. **Compare scored MQLs vs. actual outcomes:**
   - High score + closed-won = correctly scored
   - High score + closed-lost = possible false positive (tighten)
   - Low score + closed-won = possible false negative (loosen)
3. **Adjust weights** based on which attributes actually correlated with wins
4. **Adjust threshold** if MQL volume is too high (raise) or too low (lower)
5. **Document changes** and communicate to sales team

### Warning Signs Your Model Needs Recalibration

- MQL-to-SQL acceptance rate drops below 30%
- Sales consistently rejects MQLs as "not ready"
- High-scoring leads don't convert; low-scoring leads do
- MQL volume spikes without corresponding revenue
- New product/market changes since last calibration

---

## sales-enablement — Deck Frameworks

<!-- Source: skills/sales-enablement/references/deck-frameworks.md -->

# Sales Deck Frameworks

Detailed slide-by-slide guidance for building sales decks that tell a story and close deals.

## The Storytelling Arc

Every great deck follows a narrative structure: **Situation → Complication → Resolution.**

- **Situation** (Slides 1-3): The world your buyer lives in. Establish shared understanding.
- **Complication** (Slides 2-3): Why the status quo is no longer sustainable. Create urgency.
- **Resolution** (Slides 4-11): Your approach, proof, and path forward.

The goal is not to present features. The goal is to make the buyer feel understood, then show them a better way.

---

## Slide-by-Slide Template

### Slide 1: Current World Problem

**What to include:**
- The challenge your buyer faces daily
- A stat or data point that quantifies the problem
- Visual: simple graphic or striking number

**What to avoid:**
- Starting with your company or product
- Generic industry trends that don't connect to pain
- More than one core problem

**Copy prompt:** "What is the one problem that, if you could describe it perfectly, would make your buyer say 'that's exactly my situation'?"

---

### Slide 2: Cost of the Problem

**What to include:**
- Financial impact (revenue lost, costs incurred)
- Time impact (hours wasted, delays)
- Risk impact (what happens if they do nothing)
- Specific numbers wherever possible

**What to avoid:**
- Vague claims without data
- Fear-mongering without substance
- Too many metrics (pick 2-3 that hit hardest)

**Copy prompt:** "If your buyer does nothing for the next 12 months, what does it cost them?"

---

### Slide 3: The Shift Happening

**What to include:**
- Market trend or technology change creating a new opportunity
- Why "the old way" no longer works
- Why now is the right time to act

**What to avoid:**
- Hype-driven trends without substance
- Making it about your product yet
- Overly technical explanations

**Copy prompt:** "What has changed in the market that makes the old approach unsustainable?"

---

### Slide 4: Your Approach

**What to include:**
- Your philosophy or unique point of view
- How your approach differs from conventional solutions
- The "aha" insight that led to your product

**What to avoid:**
- Feature lists (too early)
- Jargon or acronyms
- Claiming to be "the only" or "the first" unless provably true

**Copy prompt:** "What do you believe about solving this problem that most people get wrong?"

---

### Slide 5: Product Walkthrough

**What to include:**
- 3-4 key workflows that map to the pain from Slide 1
- Screenshots or product visuals
- Brief description of what each workflow accomplishes

**What to avoid:**
- Showing every feature
- Dense UI screenshots without callouts
- Talking about technology instead of outcomes

**Copy prompt:** "Walk through 3 things the buyer would do in your product in their first week."

---

### Slide 6: Proof Points

**What to include:**
- Customer logos (aim for recognizable names in their industry)
- Key metrics: "X% improvement," "Y hours saved," "Z% increase"
- Analyst recognition, awards, or certifications if relevant

**What to avoid:**
- Unsubstantiated claims
- Too many logos without context
- Vanity metrics that don't relate to the buyer's pain

**Copy prompt:** "What are 3 numbers that prove your product works?"

---

### Slide 7: Case Study

**What to include:**
- One customer story told well: challenge, solution, results
- Specific metrics (before and after)
- Customer quote if available
- Choose a customer similar to the prospect

**What to avoid:**
- Multiple case studies crammed into one slide
- Generic outcomes without specifics
- Customers from irrelevant industries

**Copy prompt:** "Tell the story of one customer who went from struggling to succeeding with your product."

---

### Slide 8: Implementation / Timeline

**What to include:**
- Clear phases with timeline (e.g., Week 1: Setup, Week 2-3: Integration, Week 4: Live)
- What's required from their side vs. yours
- Support resources available

**What to avoid:**
- Overcomplicating the process
- Hiding time requirements
- Skipping the "what do I need to do?" question

**Copy prompt:** "How does a customer get from signing to live? What does each week look like?"

---

### Slide 9: ROI / Value

**What to include:**
- Expected return based on their inputs or industry benchmarks
- Payback period
- Total value over 1-3 years
- Comparison to cost of inaction

**What to avoid:**
- Unrealistic projections
- ROI without showing your math
- Generic numbers not tied to their situation

**Copy prompt:** "If they buy today, what does the next 12 months look like in dollars and hours?"

---

### Slide 10: Pricing Overview

**What to include:**
- Pricing tiers or structure
- What's included at each level
- Recommended plan for their situation

**What to avoid:**
- Burying the price or being cagey
- Too many options (3 tiers max)
- Surprising them with hidden costs

**Copy prompt:** "What does it cost, what do they get, and which plan is right for them?"

---

### Slide 11: Next Steps / CTA

**What to include:**
- Specific next action with timeline ("Start a pilot next week")
- What happens after they say yes
- Your contact information

**What to avoid:**
- Vague CTAs ("Let's stay in touch")
- Multiple competing next steps
- Ending without energy

**Copy prompt:** "What is the one thing you want them to do after this meeting?"

---

## Persona Customization Guide

### Technical Buyer Deck

**Add:**
- Architecture diagram slide after Product Walkthrough
- Security and compliance details
- Integration ecosystem and API capabilities
- Technical implementation requirements

**Remove or minimize:**
- ROI calculations (they care about capability, not cost)
- High-level market trends (they want specifics)

**Adjust tone:** Precise, no fluff, respect their expertise. Avoid marketing superlatives.

### Economic Buyer Deck

**Add:**
- Detailed ROI slide with calculations shown
- Total cost of ownership comparison
- Risk mitigation and compliance
- Executive summary slide up front

**Remove or minimize:**
- Technical details and architecture
- Feature-level walkthroughs
- Implementation specifics (they'll delegate)

**Adjust tone:** Business-focused, outcome-driven. Speak in dollars and percentages.

### Champion Deck

**Add:**
- "Internal selling" slide — key points for them to present to their team
- Quick-win slide — what success looks like in 30 days
- Peer proof — companies like theirs who succeeded
- Objection pre-handling — common pushback they'll face internally

**Remove or minimize:**
- Deep technical or financial detail
- Anything that requires context they can't relay

**Adjust tone:** Empowering, equipping. Make them look smart to their boss.

---

## Anti-Patterns

### The Feature Dump
Every slide is a feature with a screenshot. No story, no "so what," no connection to the buyer's world. Reps click through it; prospects tune out.

### The Wall of Text
Slides with 200+ words. Nobody reads them during a presentation. If the slide requires reading, it belongs in a leave-behind.

### The Missing Story Arc
Slides exist in isolation — no narrative flow from problem to solution to proof. The deck feels like a brochure, not a conversation.

### The Generic Screenshot
Product screenshots without callouts, annotations, or context. The prospect can't tell what they're looking at or why it matters.

### The Premature Demo
Jumping to product features before establishing the problem. The buyer has no frame of reference for why your features matter.

### The Kitchen Sink
Trying to address every persona, every use case, every feature in one deck. The result is a 40-slide monster that nobody wants to sit through.

---

## sales-enablement — Demo Scripts

<!-- Source: skills/sales-enablement/references/demo-scripts.md -->

# Demo Script Templates

Scene-by-scene templates for different call types, with timing, talk tracks, and interaction guidance.

## Discovery Call Script

**Duration:** 30 minutes
**Goal:** Qualify the opportunity, understand pain, map the buying process.

### Scene 1: Opening (3 min)

**Talk track:**
> "Thanks for taking the time, [Name]. I've done some research on [Company] but I'd love to hear from you directly. My goal for today is to understand what you're working on and see if there's a fit — and if there's not, I'll tell you that too. Sound good?"

**What to establish:**
- Set the agenda and time expectation
- Position yourself as a peer, not a pitch person
- Get permission to ask questions

---

### Scene 2: Situation Questions (7 min)

**Questions to ask:**
- "Can you walk me through how your team handles [relevant process] today?"
- "What tools are you currently using for this?"
- "How many people are involved in this workflow?"
- "How long has this been in place?"

**What you're listening for:**
- Current process and tools
- Team size and structure
- How established (and how entrenched) the current approach is

---

### Scene 3: Pain Identification (10 min)

**Questions to ask:**
- "What's the biggest challenge with that process today?"
- "When that breaks down, what happens?"
- "How much time does your team spend on [specific task] per week?"
- "What have you tried to fix this?"
- "If you could wave a magic wand, what would change?"

**What you're listening for:**
- Specific, quantifiable pain points
- Emotional frustration (not just logical problems)
- Failed attempts to solve this (shows urgency)
- The "magic wand" answer reveals their ideal state

**Interaction tip:** Take notes visibly. Repeat back what you hear: "So if I understand correctly, the biggest issue is [X], which costs you about [Y] per month. Is that right?"

---

### Scene 4: Impact & Priority (5 min)

**Questions to ask:**
- "Where does solving this sit on your priority list this quarter?"
- "What happens if you don't solve this in the next 6 months?"
- "Who else is affected by this problem?"
- "Is there budget allocated for solving this?"

**What you're listening for:**
- Priority level (nice-to-have vs. must-solve)
- Urgency and consequences of inaction
- Organizational breadth of the problem
- Budget signals

---

### Scene 5: Buying Process (3 min)

**Questions to ask:**
- "If you decided this was the right solution, what does the evaluation process look like?"
- "Who else would be involved in the decision?"
- "Have you evaluated solutions for this before?"
- "What's your timeline for making a decision?"

**What you're listening for:**
- Decision-making process and stakeholders
- Past evaluation experience (and why they didn't buy)
- Timeline for decision

---

### Scene 6: Close (2 min)

**Talk track:**
> "Based on what you've shared, I think there's a strong fit — specifically around [pain point 1] and [pain point 2]. What I'd suggest as a next step is a 30-minute demo where I can show you exactly how we'd address those. I'll customize it to your workflow. Does [specific date/time] work?"

**What to do:**
- Summarize the 2-3 key pain points
- Propose a specific next step with a date
- Send a calendar invite before you hang up

---

## First Demo Script

**Duration:** 30-45 minutes
**Goal:** Show how your product solves their specific pain. Advance to evaluation/pilot.

### Scene 1: Opening & Recap (5 min)

**Talk track:**
> "Last time we spoke, you mentioned [pain point 1], [pain point 2], and [goal]. I've put together a demo focused on those three areas. If I've missed anything, flag it and we'll adjust. Sound good?"

**What to do:**
- Recap discovery findings to show you listened
- Confirm priorities haven't changed
- Set expectation for what they'll see

---

### Scene 2: Workflow 1 — Primary Pain Point (10 min)

**Structure:**
1. Restate the pain: "You mentioned [specific problem]..."
2. Show the solution: Walk through the workflow step by step
3. Highlight the outcome: "This means [specific benefit]..."

**Interaction point (at the 5-min mark):**
> "How does this compare to how you're handling it today?"

**What to avoid:**
- Showing every feature of this section
- Getting lost in settings or configuration
- Talking for more than 3 minutes without asking a question

---

### Scene 3: Workflow 2 — Secondary Pain Point (8 min)

**Structure:**
Same as Workflow 1 — restate pain, show solution, highlight outcome.

**Interaction point:**
> "Is this the kind of visibility your team has been asking for?"

---

### Scene 4: Workflow 3 — Differentiator (7 min)

**Structure:**
Show something they can't do today and can't get from competitors.

**Talk track:**
> "This is where we're really different from [competitor/status quo]. [Explain the unique capability]. For example, [Customer] uses this to [specific outcome]."

**Interaction point:**
> "How would your team use this?"

---

### Scene 5: Proof Point (3 min)

**Talk track:**
> "Let me share a quick example. [Customer similar to them] was in a similar situation — [brief challenge]. After implementing, they saw [specific metrics]. Their [role] said [quote]."

**What to do:**
- Choose a case study that matches their industry, size, or use case
- Keep it brief — this is reinforcement, not a presentation

---

### Scene 6: Close (5 min)

**Talk track:**
> "Based on what we've covered, here's what I'd recommend as next steps: [specific next step]. This typically takes [timeline]. Who else on your team should be involved? I can set up a [follow-up meeting type] for [date]."

**What to do:**
- Propose a specific next step (not "let me know")
- Identify additional stakeholders to involve
- Set a follow-up date before ending the call
- Send recap email within 2 hours

---

## Technical Deep-Dive Script

**Duration:** 45-60 minutes
**Goal:** Satisfy technical evaluation criteria. Address architecture, security, and integration concerns.

### Scene 1: Opening (3 min)

**Talk track:**
> "I know your goal today is to understand the technical details — architecture, security, integrations, and how this fits your stack. I'll walk through each area and leave plenty of time for questions. What's your top priority for this session?"

**Attendees:** Typically includes their technical evaluator (engineer, architect, IT lead) plus your SE or solutions engineer.

---

### Scene 2: Architecture Overview (10 min)

**Cover:**
- High-level architecture diagram
- Infrastructure and hosting (cloud provider, regions)
- Data flow and storage
- Scalability approach
- Uptime SLA and reliability track record

**Interaction point:**
> "How does this compare to your current infrastructure requirements?"

---

### Scene 3: Security & Compliance (10 min)

**Cover:**
- Certifications (SOC 2, ISO 27001, HIPAA, etc.)
- Data encryption (at rest, in transit)
- Access controls and authentication (SSO, RBAC)
- Audit logging
- Data residency and privacy (GDPR, CCPA)
- Penetration testing cadence

**Interaction point:**
> "What are your must-have security requirements? I want to make sure we address them specifically."

---

### Scene 4: Integrations & API (15 min)

**Cover:**
- Native integrations relevant to their stack
- API capabilities (REST, GraphQL, webhooks)
- Authentication methods
- Rate limits and data sync frequency
- Live demo of relevant integration

**Interaction point:**
> "Walk me through your current stack — I want to map out exactly how we'd fit in."

---

### Scene 5: Implementation & Migration (5 min)

**Cover:**
- Implementation timeline and phases
- Data migration process
- Configuration requirements
- Training and onboarding
- Ongoing support model

**Interaction point:**
> "What does your team's capacity look like for implementation? That helps me scope the right timeline."

---

### Scene 6: Q&A and Close (10 min)

**Talk track:**
> "What questions do I need to answer for you to feel confident about the technical fit?"

**What to do:**
- Answer directly — if you don't know, say so and follow up
- Document all questions for follow-up
- Propose next step (security review, proof of concept, pilot)
- Send technical documentation summary within 24 hours

---

## Executive Overview Script

**Duration:** 20-30 minutes
**Goal:** Get executive buy-in on the business case. Advance to budget approval or decision.

### Scene 1: Opening (2 min)

**Talk track:**
> "Thanks for your time, [Name]. [Champion] has been evaluating [your product] and the results look strong. I'll keep this focused on the business impact and what a partnership looks like. I know your time is valuable so I'll aim to leave 10 minutes for questions."

**What to do:**
- Be concise — executives punish rambling
- Reference the champion and work done so far
- Set a clear agenda

---

### Scene 2: The Problem & Cost (5 min)

**Talk track:**
> "Based on what [Champion] shared, your team is spending [X hours/$ amount] on [problem]. That's [annual cost]. It's also creating [secondary impact: risk, delays, churn]. This isn't unique to you — it's an industry-wide challenge, and the companies solving it are seeing [outcome]."

**What to do:**
- Use their numbers, not generic benchmarks
- Connect to metrics they care about (revenue, cost, risk)
- Keep it to 2-3 key points

---

### Scene 3: The Solution & Differentiation (5 min)

**Talk track:**
> "Here's what we do differently. [One-sentence explanation]. For your team specifically, this means [specific benefit 1] and [specific benefit 2]. [Champion]'s team has already seen [early result or reaction from evaluation]."

**What to do:**
- High-level, not feature-level
- Tie to their strategic priorities
- Reference the champion's evaluation

---

### Scene 4: ROI & Business Case (5 min)

**Talk track:**
> "Here's the business case. Based on your team's numbers: [walk through ROI calculation]. Expected payback period is [X months]. Over 3 years, the total value is [$ amount]. [Customer similar to them] saw [specific result] within [timeframe]."

**What to do:**
- Show the math, not just the conclusion
- Use conservative estimates (executives discount inflated numbers)
- One strong case study, not three weak ones

---

### Scene 5: Q&A and Decision (5-10 min)

**Talk track:**
> "What questions do you have? And — assuming the business case holds up, what does the decision process look like from here?"

**What to do:**
- Listen more than talk
- Answer concisely
- Get a clear next step and timeline
- Thank the champion in front of the executive

---

## Interaction Point Guidance

### When to Ask Questions During Demos

- **After showing each workflow** — "How does this compare to your current process?"
- **When you see a reaction** — "I noticed you reacted to that — what are you thinking?"
- **Before moving to the next section** — "Any questions on this before we move on?"
- **When showing a differentiator** — "How would your team use this?"
- **At the midpoint** — "Are we covering the right things, or should we adjust?"

### Questions NOT to Ask During Demos

- "Does that make sense?" (patronizing)
- "Are you still with me?" (implies they're lost)
- "Isn't that cool?" (salesy)
- Rhetorical questions that don't invite real dialogue

### How to Handle "Can You Show Me X?"

When a prospect asks to see something during the demo:

1. **If it's quick** — show it now, then return to your flow
2. **If it's a tangent** — "Great question. Let me note that and show you after the main flow so we stay on track."
3. **If it's not possible** — "We don't do that today. Here's how customers handle it: [alternative]."

Never say "I'll get back to you" without writing it down and following up within 24 hours.

---

## sales-enablement — Objection Library

<!-- Source: skills/sales-enablement/references/objection-library.md -->

# Objection Library

Common B2B SaaS objections with response frameworks. Organized by category for quick reference.

## Quick-Reference Table

For live calls. Find the objection, scan the response, reference the proof.

| Objection | Response (1-line) | Proof Point |
|-----------|--------------------|-------------|
| "Too expensive" | "Compared to what? Let's look at what the problem costs you today." | ROI case study showing payback in X months |
| "No budget" | "When budget opens up, what would need to be true for this to be a priority?" | Customer who started with a pilot to prove value |
| "Competitor is cheaper" | "They are — here's what you give up at that price point." | Feature comparison + customer who switched |
| "Not the right time" | "What changes next quarter that makes it better timing?" | Cost-of-delay calculation |
| "Maybe next quarter" | "Happy to reconnect. What would a pilot look like before then?" | Customer who started small and expanded |
| "We use X already" | "How's that working for [specific pain area]?" | Customer who switched from X |
| "What makes you different?" | "For teams like yours, the biggest difference is [specific differentiator]." | Side-by-side comparison for their use case |
| "Need to check with my boss" | "Absolutely. What would help you make the case? I can send materials." | Champion one-pager, ROI calculator |
| "The committee decides" | "Who's on the committee and what does each person care about?" | Multi-persona case study |
| "What we have works fine" | "It does work — the question is whether it's costing you more than it should." | Benchmark data showing efficiency gaps |
| "Not broken, don't fix it" | "Agreed — this isn't about fixing, it's about the opportunity cost of the current approach." | Customer who didn't know what they were missing |
| "Does it integrate with X?" | "Yes / Let me check and get you specifics by end of day." | Integration documentation, customer using same stack |
| "Security concerns" | "Completely fair. Here's our security overview — happy to loop in our team." | SOC 2 report, security whitepaper |
| "Can it scale?" | "We serve companies from [small] to [large]. Here's an example at your scale." | Case study at similar scale |
| "We tried something like this before" | "What went wrong? Understanding that helps me show how we're different." | Customer with same failed experience who succeeded with you |

---

## Detailed Objection Responses

### Price Objections

#### "It's too expensive"

**Why they say it:** May be genuine budget constraint, sticker shock, or negotiation tactic. Often means they don't yet see enough value to justify the cost.

**Response approach:**
1. Don't defend the price immediately. Ask "Compared to what?"
2. Reframe from cost to investment — what does the problem cost them today?
3. Walk through the ROI calculation together
4. If budget is real, explore smaller starting points

**Talk track:**
> "I hear that. Let me ask — what's the cost of the problem we discussed? You mentioned your team spends [X hours] on [task] every week. At your team's loaded cost, that's roughly [$ amount] per year. Our solution runs [$ price] — so the question is whether eliminating that problem is worth the investment."

**Proof point:** ROI calculator or case study showing payback period.

**Follow-up question:** "If the ROI was clear, is this something you'd prioritize this quarter?"

---

#### "We don't have budget for this"

**Why they say it:** Budget may genuinely be allocated. Or they haven't identified budget because priority isn't established.

**Response approach:**
1. Validate — budget constraints are real
2. Understand timing — when does budget cycle reset?
3. Explore alternatives — pilot, smaller scope, different budget line
4. Help them build the business case to create budget

**Talk track:**
> "Totally understand. Two questions: When does your next budget cycle open? And — if we could show clear ROI with a limited pilot, is that something you could fund from a different line item? Sometimes teams fund this from the efficiency savings it creates."

**Proof point:** Customer who started with a small pilot and expanded after proving ROI.

**Follow-up question:** "Would it help if I put together an ROI brief you could share with your finance team?"

---

#### "Competitor X is cheaper"

**Why they say it:** They're comparing prices, possibly without comparing capabilities. May be using competitor price as leverage.

**Response approach:**
1. Acknowledge the price difference — don't pretend it doesn't exist
2. Shift to total cost of ownership and value delivered
3. Highlight what they lose at the lower price point
4. Share proof from customers who evaluated both

**Talk track:**
> "You're right, [Competitor] is less expensive. Here's what I've seen from teams who evaluated both: [Competitor] works well for [their strength]. Where it falls short is [specific gap]. Customers like [name] actually switched to us after starting with [Competitor] because [specific reason]. The question is whether [specific capability] is worth the difference for your team."

**Proof point:** Customer who switched from the competitor, with specific reasons.

**Follow-up question:** "What's most important to your team — the lowest price or the best fit for [their specific need]?"

---

### Timing Objections

#### "Not the right time"

**Why they say it:** Competing priorities, organizational change, genuine capacity constraint, or lack of urgency.

**Response approach:**
1. Understand what's competing for their attention
2. Quantify the cost of waiting
3. Explore low-commitment next steps that keep momentum
4. Set a concrete follow-up date

**Talk track:**
> "I get it — timing matters. Can I ask what's taking priority right now? The reason I bring up timing is that every month of [problem], based on our earlier conversation, costs your team roughly [$ amount]. A 3-month delay is [$ amount]. What if we mapped out a start date that works with your calendar so you're not losing that value?"

**Proof point:** Cost-of-delay calculation based on their specific numbers.

**Follow-up question:** "What would need to change for this to move up in priority?"

---

#### "Maybe next quarter"

**Why they say it:** Genuine scheduling, or a polite way of saying "not interested enough right now."

**Response approach:**
1. Accept the timeline gracefully
2. Propose a small action now that maintains momentum
3. Get a specific date for follow-up
4. Send value in the meantime (content, benchmarks, insights)

**Talk track:**
> "Next quarter works. To make sure we hit the ground running, would it make sense to do [small next step] now? That way when Q[X] starts, you're not starting from scratch. I'll also send over [relevant content] in the meantime. Can we lock in [specific date] to reconnect?"

**Proof point:** Customer who started the evaluation process early and was live by their target date.

**Follow-up question:** "Is there anything I can send between now and then that would be helpful?"

---

### Competition Objections

#### "We already use X"

**Why they say it:** They have an existing solution and switching has real costs. May be satisfied, or may have frustrations they haven't voiced.

**Response approach:**
1. Don't trash the competitor — ask how it's working
2. Probe for specific pain points with their current solution
3. Position as complementary if possible, replacement if not
4. Offer a side-by-side comparison or trial

**Talk track:**
> "How's that working for you? Specifically, when it comes to [area where you're stronger] — is that meeting your needs? The reason I ask is that most teams who come to us from [Competitor] tell us [specific pain point] was the tipping point. Not saying that's you, but worth exploring."

**Proof point:** Customer who switched from that specific competitor.

**Follow-up question:** "If you could change one thing about your current setup, what would it be?"

---

#### "What makes you different?"

**Why they say it:** They're evaluating options and want a clear differentiator. Sometimes a genuine question, sometimes a test.

**Response approach:**
1. Don't list features — give the one thing that matters most for their situation
2. Tie the differentiator to their specific pain
3. Back it up with proof
4. Offer to show, not just tell

**Talk track:**
> "For teams like yours — [their industry/size/use case] — the biggest difference is [specific differentiator]. That matters because [connection to their pain]. For example, [Customer] was evaluating us alongside [Competitor] and chose us because [specific reason]. Want me to walk you through how that works?"

**Proof point:** Case study of a customer who chose you over alternatives.

**Follow-up question:** "What's the most important criteria for your decision?"

---

### Authority Objections

#### "I need to check with my boss"

**Why they say it:** They may not be the decision maker, or they need internal buy-in to proceed. Could also be a stall tactic.

**Response approach:**
1. Support them, don't pressure them
2. Arm them with materials to sell internally
3. Offer to join a meeting with their boss
4. Understand what their boss cares about

**Talk track:**
> "Absolutely — what would help you make the case? I can put together a one-pager that covers the ROI and addresses the concerns your boss is likely to have. Also happy to jump on a quick call with them if that would be helpful. What does your boss typically prioritize — cost savings, risk reduction, or efficiency?"

**Proof point:** Champion enablement one-pager, ROI calculator.

**Follow-up question:** "What questions do you think your boss will ask?"

---

#### "A committee decides this"

**Why they say it:** Enterprise buying involves multiple stakeholders. Genuine process, not a brush-off.

**Response approach:**
1. Map the buying committee — who's involved and what each person cares about
2. Provide persona-specific materials
3. Offer to present to the committee
4. Help your champion navigate the internal process

**Talk track:**
> "That makes sense. Can you walk me through who's on the committee and what each person cares about? I can tailor materials for each stakeholder so you're not doing all the heavy lifting. I've also got a deck designed for executive presentations if that would be useful."

**Proof point:** Multi-stakeholder case study showing how different personas were addressed.

**Follow-up question:** "Who on the committee is most likely to push back, and what would their concern be?"

---

### Status Quo Objections

#### "What we have works fine"

**Why they say it:** Inertia is real. The current solution may be adequate, and change has real costs.

**Response approach:**
1. Agree — don't argue with their experience
2. Shift from "broken vs. fixed" to "good vs. great"
3. Introduce the concept of opportunity cost
4. Show what peers are achieving

**Talk track:**
> "It probably does work — and I wouldn't suggest changing something that's truly meeting your needs. The question I'd ask is: is 'works fine' the bar? Teams using [your product] are seeing [specific outcome]. If you're leaving [X% improvement] on the table, is that worth exploring?"

**Proof point:** Benchmark data showing what's possible vs. status quo.

**Follow-up question:** "If there were one area where your current approach could be better, what would it be?"

---

### Technical Objections

#### "Does it integrate with X?"

**Why they say it:** Integration is a real requirement. They need to know your product fits their stack.

**Response approach:**
1. Answer directly — yes, no, or "let me check"
2. If yes, provide specifics (native, API, Zapier, etc.)
3. If no, explain alternatives or workarounds
4. Never bluff — they'll find out during evaluation

**Talk track (if yes):**
> "Yes, we integrate with [X] natively. It takes about [time] to set up. [Customer] runs the same stack and here's how they have it configured."

**Talk track (if no):**
> "We don't have a native integration with [X] today. Here's what customers typically do: [alternative]. We also have an open API that [description]. Would it help to get our technical team on a call to explore options?"

**Proof point:** Customer using the same tech stack, integration documentation.

**Follow-up question:** "What other tools are in your stack that we'd need to work with?"

---

#### "We have security concerns"

**Why they say it:** Legitimate concern, especially in regulated industries or enterprise. Non-negotiable for many buyers.

**Response approach:**
1. Take it seriously — never dismiss security concerns
2. Provide documentation proactively (SOC 2, security whitepaper)
3. Offer to loop in your security team
4. Ask about their specific requirements

**Talk track:**
> "That's exactly the right question to ask. Here's our security overview — we're [SOC 2 Type II / ISO 27001 / etc.] certified, and I can share our full security documentation. We also have a security team that's happy to do a review call with your infosec team. What are your specific requirements?"

**Proof point:** Security certifications, compliance documentation, customers in regulated industries.

**Follow-up question:** "Do you have a security questionnaire you'd like us to fill out?"

---

## sales-enablement — One Pager Templates

<!-- Source: skills/sales-enablement/references/one-pager-templates.md -->

# One-Pager Templates

Templates for different one-pager use cases, with layout guidance and copy prompts.

## Product Overview One-Pager

The default one-pager. Introduces your product to someone who knows nothing about you.

### Structure

```
[Logo]                                              [Tagline]

HEADLINE: One sentence describing what you do and who it's for.

THE PROBLEM
2-3 sentences describing the pain your buyer faces.

THE SOLUTION
2-3 sentences describing how your product solves it.

WHY [YOUR PRODUCT]
• Differentiator 1 — One sentence explaining the benefit
• Differentiator 2 — One sentence explaining the benefit
• Differentiator 3 — One sentence explaining the benefit

PROOF
"Customer quote with specific result." — Name, Title, Company
[Optional: 2-3 metric callouts: "X% improvement", "Y hours saved"]

[CTA Button/Link]                    [Contact: name@company.com]
```

### Copy Prompts

- Headline: "What do you do, in one sentence, that makes someone say 'tell me more'?"
- Problem: "What is your buyer struggling with before they find you?"
- Differentiators: "If you could only tell them 3 things, what would make them choose you?"

---

## Use-Case Specific One-Pager

Tailored to a specific workflow, vertical, or problem. More targeted than the product overview.

### Structure

```
[Logo]                                    [Use Case: e.g., "For Sales Teams"]

HEADLINE: How [your product] helps [persona] [achieve outcome].

THE CHALLENGE
When [persona] needs to [task], they face [specific pain].
This leads to [consequence]: [time wasted / money lost / risk].

HOW IT WORKS
1. [Step 1] — What happens and why it matters
2. [Step 2] — What happens and why it matters
3. [Step 3] — What happens and why it matters

RESULTS
• [Metric 1]: Before → After
• [Metric 2]: Before → After
• [Metric 3]: Before → After

CUSTOMER SPOTLIGHT
"Quote about this specific use case." — Name, Title, Company

[CTA: "See it in action" or "Start a pilot"]       [Contact info]
```

### When to Use

- Different buyer personas need different one-pagers
- Industry-specific versions (healthcare, fintech, e-commerce)
- Use-case versions (reporting, onboarding, security)

---

## Post-Meeting Leave-Behind

Designed to reinforce a conversation that already happened. Summarizes what you discussed and proposes next steps.

### Structure

```
[Logo]                                            [Date of Meeting]

MEETING RECAP: [Company Name]

WHAT WE DISCUSSED
• [Pain point 1 they mentioned]
• [Pain point 2 they mentioned]
• [Goal they're trying to achieve]

HOW [YOUR PRODUCT] HELPS
• [Solution to pain 1] — [Specific capability or workflow]
• [Solution to pain 2] — [Specific capability or workflow]
• [How you help them reach their goal]

RELEVANT PROOF
"Quote from a similar customer." — Name, Title, Company
[1-2 metrics from a similar customer]

PROPOSED NEXT STEPS
1. [Next step with date]
2. [Follow-up action]
3. [Decision timeline]

[Your name]  |  [Your title]  |  [Email]  |  [Phone]
```

### Tips

- Send within 24 hours of the meeting
- Reference specific things they said (shows you listened)
- Keep proposed next steps concrete and time-bound
- This is the asset your champion forwards to their boss

---

## Champion Enablement One-Pager

Designed specifically for your internal champion to share with their team and leadership. Written to make them look smart.

### Structure

```
[Logo]

WHY WE'RE EVALUATING [YOUR PRODUCT]

THE SITUATION
[2-3 sentences about the internal challenge, written as if the champion
is explaining it to their team. Use "we" and "our" language.]

WHAT [YOUR PRODUCT] DOES
[1-2 sentences. Plain language, no jargon.]

WHY THIS SOLUTION
• [Reason 1] — How it solves our specific problem
• [Reason 2] — How it compares to what we do today
• [Reason 3] — How it compares to alternatives we evaluated

EXPECTED IMPACT
• [Metric]: Current state → Expected state
• [Metric]: Current state → Expected state
• [Time to value]: Live within [X weeks]

WHO ELSE USES IT
[2-3 recognizable company names in their industry]
"Relevant customer quote." — Name, Title, Company

NEXT STEPS
• [What we're doing next]
• [What we need from the team]
• [Decision timeline]

Questions? Talk to [Champion name] or [Your name at email].
```

### Why This Works

- Written in the champion's voice, not yours
- Answers the questions their boss will ask
- Includes peer proof from companies they respect
- Clear ask and timeline to drive internal momentum

---

## Layout Guidance

### Visual Hierarchy

1. **Headline** — Largest text, top of page, immediately communicates value
2. **Section headers** — Bold, clear, act as scannable anchors
3. **Body text** — Short sentences, bullet points preferred over paragraphs
4. **Proof elements** — Metrics and quotes should visually stand out (larger font, color, or callout box)
5. **CTA** — Prominent placement, bottom of page or bottom-right

### Whitespace

- Margins: at least 0.75" on all sides
- Space between sections: enough to visually separate (don't cram)
- If it feels crowded, cut content. Never shrink font below 9pt.

### Font Sizing

| Element | Suggested Size |
|---------|---------------|
| Headline | 18-24pt |
| Section headers | 12-14pt bold |
| Body text | 10-11pt |
| Fine print / footer | 8-9pt |

### Color

- Use brand colors for headers and accents
- Keep body text dark (black or near-black) on white
- Limit accent colors to 1-2 for visual consistency
- Use color to draw attention to metrics and CTAs

### File Format

- **PDF** for email attachments and leave-behinds
- **Google Slides / PowerPoint** for editable versions reps can customize
- Always include both — reps will customize, prospects want clean PDFs
