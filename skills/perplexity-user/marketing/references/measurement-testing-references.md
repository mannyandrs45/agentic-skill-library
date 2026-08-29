# Measurement & Testing — Reference Materials

Consolidated reference documentation for the measurement & testing skills.
Source: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)

---

## analytics-tracking — Event Library

<!-- Source: skills/analytics-tracking/references/event-library.md -->

# Event Library Reference

Comprehensive list of events to track by business type and context.

## Contents
- Marketing Site Events (navigation & engagement, CTA & form interactions, conversion events)
- Product/App Events (onboarding, core usage, errors & support)
- Monetization Events (pricing & checkout, subscription management)
- E-commerce Events (browsing, cart, checkout, post-purchase)
- B2B / SaaS Specific Events (team & collaboration, integration events, account events)
- Event Properties (Parameters)
- Funnel Event Sequences

## Marketing Site Events

### Navigation & Engagement

| Event Name | Description | Properties |
|------------|-------------|------------|
| page_view | Page loaded (enhanced) | page_title, page_location, content_group |
| scroll_depth | User scrolled to threshold | depth (25, 50, 75, 100) |
| outbound_link_clicked | Click to external site | link_url, link_text |
| internal_link_clicked | Click within site | link_url, link_text, location |
| video_played | Video started | video_id, video_title, duration |
| video_completed | Video finished | video_id, video_title, duration |

### CTA & Form Interactions

| Event Name | Description | Properties |
|------------|-------------|------------|
| cta_clicked | Call to action clicked | button_text, cta_location, page |
| form_started | User began form | form_name, form_location |
| form_field_completed | Field filled | form_name, field_name |
| form_submitted | Form successfully sent | form_name, form_location |
| form_error | Form validation failed | form_name, error_type |
| resource_downloaded | Asset downloaded | resource_name, resource_type |

### Conversion Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| signup_started | Initiated signup | source, page |
| signup_completed | Finished signup | method, plan, source |
| demo_requested | Demo form submitted | company_size, industry |
| contact_submitted | Contact form sent | inquiry_type |
| newsletter_subscribed | Email list signup | source, list_name |
| trial_started | Free trial began | plan, source |

---

## Product/App Events

### Onboarding

| Event Name | Description | Properties |
|------------|-------------|------------|
| signup_completed | Account created | method, referral_source |
| onboarding_started | Began onboarding | - |
| onboarding_step_completed | Step finished | step_number, step_name |
| onboarding_completed | All steps done | steps_completed, time_to_complete |
| onboarding_skipped | User skipped onboarding | step_skipped_at |
| first_key_action_completed | Aha moment reached | action_type |

### Core Usage

| Event Name | Description | Properties |
|------------|-------------|------------|
| session_started | App session began | session_number |
| feature_used | Feature interaction | feature_name, feature_category |
| action_completed | Core action done | action_type, count |
| content_created | User created content | content_type |
| content_edited | User modified content | content_type |
| content_deleted | User removed content | content_type |
| search_performed | In-app search | query, results_count |
| settings_changed | Settings modified | setting_name, new_value |
| invite_sent | User invited others | invite_type, count |

### Errors & Support

| Event Name | Description | Properties |
|------------|-------------|------------|
| error_occurred | Error experienced | error_type, error_message, page |
| help_opened | Help accessed | help_type, page |
| support_contacted | Support request made | contact_method, issue_type |
| feedback_submitted | User feedback given | feedback_type, rating |

---

## Monetization Events

### Pricing & Checkout

| Event Name | Description | Properties |
|------------|-------------|------------|
| pricing_viewed | Pricing page seen | source |
| plan_selected | Plan chosen | plan_name, billing_cycle |
| checkout_started | Began checkout | plan, value |
| payment_info_entered | Payment submitted | payment_method |
| purchase_completed | Purchase successful | plan, value, currency, transaction_id |
| purchase_failed | Purchase failed | error_reason, plan |

### Subscription Management

| Event Name | Description | Properties |
|------------|-------------|------------|
| trial_started | Trial began | plan, trial_length |
| trial_ended | Trial expired | plan, converted (bool) |
| subscription_upgraded | Plan upgraded | from_plan, to_plan, value |
| subscription_downgraded | Plan downgraded | from_plan, to_plan |
| subscription_cancelled | Cancelled | plan, reason, tenure |
| subscription_renewed | Renewed | plan, value |
| billing_updated | Payment method changed | - |

---

## E-commerce Events

### Browsing

| Event Name | Description | Properties |
|------------|-------------|------------|
| product_viewed | Product page viewed | product_id, product_name, category, price |
| product_list_viewed | Category/list viewed | list_name, products[] |
| product_searched | Search performed | query, results_count |
| product_filtered | Filters applied | filter_type, filter_value |
| product_sorted | Sort applied | sort_by, sort_order |

### Cart

| Event Name | Description | Properties |
|------------|-------------|------------|
| product_added_to_cart | Item added | product_id, product_name, price, quantity |
| product_removed_from_cart | Item removed | product_id, product_name, price, quantity |
| cart_viewed | Cart page viewed | cart_value, items_count |

### Checkout

| Event Name | Description | Properties |
|------------|-------------|------------|
| checkout_started | Checkout began | cart_value, items_count |
| checkout_step_completed | Step finished | step_number, step_name |
| shipping_info_entered | Address entered | shipping_method |
| payment_info_entered | Payment entered | payment_method |
| coupon_applied | Coupon used | coupon_code, discount_value |
| purchase_completed | Order placed | transaction_id, value, currency, items[] |

### Post-Purchase

| Event Name | Description | Properties |
|------------|-------------|------------|
| order_confirmed | Confirmation viewed | transaction_id |
| refund_requested | Refund initiated | transaction_id, reason |
| refund_completed | Refund processed | transaction_id, value |
| review_submitted | Product reviewed | product_id, rating |

---

## B2B / SaaS Specific Events

### Team & Collaboration

| Event Name | Description | Properties |
|------------|-------------|------------|
| team_created | New team/org made | team_size, plan |
| team_member_invited | Invite sent | role, invite_method |
| team_member_joined | Member accepted | role |
| team_member_removed | Member removed | role |
| role_changed | Permissions updated | user_id, old_role, new_role |

### Integration Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| integration_viewed | Integration page seen | integration_name |
| integration_started | Setup began | integration_name |
| integration_connected | Successfully connected | integration_name |
| integration_disconnected | Removed integration | integration_name, reason |

### Account Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| account_created | New account | source, plan |
| account_upgraded | Plan upgrade | from_plan, to_plan |
| account_churned | Account closed | reason, tenure, mrr_lost |
| account_reactivated | Returned customer | previous_tenure, new_plan |

---

## Event Properties (Parameters)

### Standard Properties to Include

**User Context:**
```
user_id: "12345"
user_type: "free" | "trial" | "paid"
account_id: "acct_123"
plan_type: "starter" | "pro" | "enterprise"
```

**Session Context:**
```
session_id: "sess_abc"
session_number: 5
page: "/pricing"
referrer: "https://google.com"
```

**Campaign Context:**
```
source: "google"
medium: "cpc"
campaign: "spring_sale"
content: "hero_cta"
```

**Product Context (E-commerce):**
```
product_id: "SKU123"
product_name: "Product Name"
category: "Category"
price: 99.99
quantity: 1
currency: "USD"
```

**Timing:**
```
timestamp: "2024-01-15T10:30:00Z"
time_on_page: 45
session_duration: 300
```

---

## Funnel Event Sequences

### Signup Funnel
1. signup_started
2. signup_step_completed (email)
3. signup_step_completed (password)
4. signup_completed
5. onboarding_started

### Purchase Funnel
1. pricing_viewed
2. plan_selected
3. checkout_started
4. payment_info_entered
5. purchase_completed

### E-commerce Funnel
1. product_viewed
2. product_added_to_cart
3. cart_viewed
4. checkout_started
5. shipping_info_entered
6. payment_info_entered
7. purchase_completed

---

## analytics-tracking — Ga4 Implementation

<!-- Source: skills/analytics-tracking/references/ga4-implementation.md -->

# GA4 Implementation Reference

Detailed implementation guide for Google Analytics 4.

## Contents
- Configuration (data streams, enhanced measurement events, recommended events)
- Custom Events (gtag.js implementation, Google Tag Manager)
- Conversions Setup (creating conversions, conversion values)
- Custom Dimensions and Metrics (when to use, setup steps, examples)
- Audiences (creating audiences, audience examples)
- Debugging (DebugView, real-time reports, common issues)
- Data Quality (filters, cross-domain tracking, session settings)
- Integration with Google Ads (linking, audience export)

## Configuration

### Data Streams

- One stream per platform (web, iOS, Android)
- Enable enhanced measurement for automatic tracking
- Configure data retention (2 months default, 14 months max)
- Enable Google Signals (for cross-device, if consented)

### Enhanced Measurement Events (Automatic)

| Event | Description | Configuration |
|-------|-------------|---------------|
| page_view | Page loads | Automatic |
| scroll | 90% scroll depth | Toggle on/off |
| outbound_click | Click to external domain | Automatic |
| site_search | Search query used | Configure parameter |
| video_engagement | YouTube video plays | Toggle on/off |
| file_download | PDF, docs, etc. | Configurable extensions |

### Recommended Events

Use Google's predefined events when possible for enhanced reporting:

**All properties:**
- login, sign_up
- share
- search

**E-commerce:**
- view_item, view_item_list
- add_to_cart, remove_from_cart
- begin_checkout
- add_payment_info
- purchase, refund

**Games:**
- level_up, unlock_achievement
- post_score, spend_virtual_currency

Reference: https://support.google.com/analytics/answer/9267735

---

## Custom Events

### gtag.js Implementation

```javascript
// Basic event
gtag('event', 'signup_completed', {
  'method': 'email',
  'plan': 'free'
});

// Event with value
gtag('event', 'purchase', {
  'transaction_id': 'T12345',
  'value': 99.99,
  'currency': 'USD',
  'items': [{
    'item_id': 'SKU123',
    'item_name': 'Product Name',
    'price': 99.99
  }]
});

// User properties
gtag('set', 'user_properties', {
  'user_type': 'premium',
  'plan_name': 'pro'
});

// User ID (for logged-in users)
gtag('config', 'GA_MEASUREMENT_ID', {
  'user_id': 'USER_ID'
});
```

### Google Tag Manager (dataLayer)

```javascript
// Custom event
dataLayer.push({
  'event': 'signup_completed',
  'method': 'email',
  'plan': 'free'
});

// Set user properties
dataLayer.push({
  'user_id': '12345',
  'user_type': 'premium'
});

// E-commerce purchase
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T12345',
    'value': 99.99,
    'currency': 'USD',
    'items': [{
      'item_id': 'SKU123',
      'item_name': 'Product Name',
      'price': 99.99,
      'quantity': 1
    }]
  }
});

// Clear ecommerce before sending (best practice)
dataLayer.push({ ecommerce: null });
dataLayer.push({
  'event': 'view_item',
  'ecommerce': {
    // ...
  }
});
```

---

## Conversions Setup

### Creating Conversions

1. **Collect the event** - Ensure event is firing in GA4
2. **Mark as conversion** - Admin > Events > Mark as conversion
3. **Set counting method**:
   - Once per session (leads, signups)
   - Every event (purchases)
4. **Import to Google Ads** - For conversion-optimized bidding

### Conversion Values

```javascript
// Event with conversion value
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'USD'
});
```

Or set default value in GA4 Admin when marking conversion.

---

## Custom Dimensions and Metrics

### When to Use

**Custom dimensions:**
- Properties you want to segment/filter by
- User attributes (plan type, industry)
- Content attributes (author, category)

**Custom metrics:**
- Numeric values to aggregate
- Scores, counts, durations

### Setup Steps

1. Admin > Data display > Custom definitions
2. Create dimension or metric
3. Choose scope:
   - **Event**: Per event (content_type)
   - **User**: Per user (account_type)
   - **Item**: Per product (product_category)
4. Enter parameter name (must match event parameter)

### Examples

| Dimension | Scope | Parameter | Description |
|-----------|-------|-----------|-------------|
| User Type | User | user_type | Free, trial, paid |
| Content Author | Event | author | Blog post author |
| Product Category | Item | item_category | E-commerce category |

---

## Audiences

### Creating Audiences

Admin > Data display > Audiences

**Use cases:**
- Remarketing audiences (export to Ads)
- Segment analysis
- Trigger-based events

### Audience Examples

**High-intent visitors:**
- Viewed pricing page
- Did not convert
- In last 7 days

**Engaged users:**
- 3+ sessions
- Or 5+ minutes total engagement

**Purchasers:**
- Purchase event
- For exclusion or lookalike

---

## Debugging

### DebugView

Enable with:
- URL parameter: `?debug_mode=true`
- Chrome extension: GA Debugger
- gtag: `'debug_mode': true` in config

View at: Reports > Configure > DebugView

### Real-Time Reports

Check events within 30 minutes:
Reports > Real-time

### Common Issues

**Events not appearing:**
- Check DebugView first
- Verify gtag/GTM firing
- Check filter exclusions

**Parameter values missing:**
- Custom dimension not created
- Parameter name mismatch
- Data still processing (24-48 hrs)

**Conversions not recording:**
- Event not marked as conversion
- Event name doesn't match
- Counting method (once vs. every)

---

## Data Quality

### Filters

Admin > Data streams > [Stream] > Configure tag settings > Define internal traffic

**Exclude:**
- Internal IP addresses
- Developer traffic
- Testing environments

### Cross-Domain Tracking

For multiple domains sharing analytics:

1. Admin > Data streams > [Stream] > Configure tag settings
2. Configure your domains
3. List all domains that should share sessions

### Session Settings

Admin > Data streams > [Stream] > Configure tag settings

- Session timeout (default 30 min)
- Engaged session duration (10 sec default)

---

## Integration with Google Ads

### Linking

1. Admin > Product links > Google Ads links
2. Enable auto-tagging in Google Ads
3. Import conversions in Google Ads

### Audience Export

Audiences created in GA4 can be used in Google Ads for:
- Remarketing campaigns
- Customer match
- Similar audiences

---

## analytics-tracking — Gtm Implementation

<!-- Source: skills/analytics-tracking/references/gtm-implementation.md -->

# Google Tag Manager Implementation Reference

Detailed guide for implementing tracking via Google Tag Manager.

## Contents
- Container Structure (tags, triggers, variables)
- Naming Conventions
- Data Layer Patterns
- Common Tag Configurations (GA4 configuration tag, GA4 event tag, Facebook pixel)
- Preview and Debug
- Workspaces and Versioning
- Consent Management
- Advanced Patterns (tag sequencing, exception handling, custom JavaScript variables)

## Container Structure

### Tags

Tags are code snippets that execute when triggered.

**Common tag types:**
- GA4 Configuration (base setup)
- GA4 Event (custom events)
- Google Ads Conversion
- Facebook Pixel
- LinkedIn Insight Tag
- Custom HTML (for other pixels)

### Triggers

Triggers define when tags fire.

**Built-in triggers:**
- Page View: All Pages, DOM Ready, Window Loaded
- Click: All Elements, Just Links
- Form Submission
- Scroll Depth
- Timer
- Element Visibility

**Custom triggers:**
- Custom Event (from dataLayer)
- Trigger Groups (multiple conditions)

### Variables

Variables capture dynamic values.

**Built-in (enable as needed):**
- Click Text, Click URL, Click ID, Click Classes
- Page Path, Page URL, Page Hostname
- Referrer
- Form Element, Form ID

**User-defined:**
- Data Layer variables
- JavaScript variables
- Lookup tables
- RegEx tables
- Constants

---

## Naming Conventions

### Recommended Format

```
[Type] - [Description] - [Detail]

Tags:
GA4 - Event - Signup Completed
GA4 - Config - Base Configuration
FB - Pixel - Page View
HTML - LiveChat Widget

Triggers:
Click - CTA Button
Submit - Contact Form
View - Pricing Page
Custom - signup_completed

Variables:
DL - user_id
JS - Current Timestamp
LT - Campaign Source Map
```

---

## Data Layer Patterns

### Basic Structure

```javascript
// Initialize (in <head> before GTM)
window.dataLayer = window.dataLayer || [];

// Push event
dataLayer.push({
  'event': 'event_name',
  'property1': 'value1',
  'property2': 'value2'
});
```

### Page Load Data

```javascript
// Set on page load (before GTM container)
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  'pageType': 'product',
  'contentGroup': 'products',
  'user': {
    'loggedIn': true,
    'userId': '12345',
    'userType': 'premium'
  }
});
```

### Form Submission

```javascript
document.querySelector('#contact-form').addEventListener('submit', function() {
  dataLayer.push({
    'event': 'form_submitted',
    'formName': 'contact',
    'formLocation': 'footer'
  });
});
```

### Button Click

```javascript
document.querySelector('.cta-button').addEventListener('click', function() {
  dataLayer.push({
    'event': 'cta_clicked',
    'ctaText': this.innerText,
    'ctaLocation': 'hero'
  });
});
```

### E-commerce Events

```javascript
// Product view
dataLayer.push({ ecommerce: null }); // Clear previous
dataLayer.push({
  'event': 'view_item',
  'ecommerce': {
    'items': [{
      'item_id': 'SKU123',
      'item_name': 'Product Name',
      'price': 99.99,
      'item_category': 'Category',
      'quantity': 1
    }]
  }
});

// Add to cart
dataLayer.push({ ecommerce: null });
dataLayer.push({
  'event': 'add_to_cart',
  'ecommerce': {
    'items': [{
      'item_id': 'SKU123',
      'item_name': 'Product Name',
      'price': 99.99,
      'quantity': 1
    }]
  }
});

// Purchase
dataLayer.push({ ecommerce: null });
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T12345',
    'value': 99.99,
    'currency': 'USD',
    'tax': 5.00,
    'shipping': 10.00,
    'items': [{
      'item_id': 'SKU123',
      'item_name': 'Product Name',
      'price': 99.99,
      'quantity': 1
    }]
  }
});
```

---

## Common Tag Configurations

### GA4 Configuration Tag

**Tag Type:** Google Analytics: GA4 Configuration

**Settings:**
- Measurement ID: G-XXXXXXXX
- Send page view: Checked (for pageviews)
- User Properties: Add any user-level dimensions

**Trigger:** All Pages

### GA4 Event Tag

**Tag Type:** Google Analytics: GA4 Event

**Settings:**
- Configuration Tag: Select your config tag
- Event Name: {{DL - event_name}} or hardcode
- Event Parameters: Add parameters from dataLayer

**Trigger:** Custom Event with event name match

### Facebook Pixel - Base

**Tag Type:** Custom HTML

```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

**Trigger:** All Pages

### Facebook Pixel - Event

**Tag Type:** Custom HTML

```html
<script>
  fbq('track', 'Lead', {
    content_name: '{{DL - form_name}}'
  });
</script>
```

**Trigger:** Custom Event - form_submitted

---

## Preview and Debug

### Preview Mode

1. Click "Preview" in GTM
2. Enter site URL
3. GTM debug panel opens at bottom

**What to check:**
- Tags fired on this event
- Tags not fired (and why)
- Variables and their values
- Data layer contents

### Debug Tips

**Tag not firing:**
- Check trigger conditions
- Verify data layer push
- Check tag sequencing

**Wrong variable value:**
- Check data layer structure
- Verify variable path (nested objects)
- Check timing (data may not exist yet)

**Multiple firings:**
- Check trigger uniqueness
- Look for duplicate tags
- Check tag firing options

---

## Workspaces and Versioning

### Workspaces

Use workspaces for team collaboration:
- Default workspace for production
- Separate workspaces for large changes
- Merge when ready

### Version Management

**Best practices:**
- Name every version descriptively
- Add notes explaining changes
- Review changes before publish
- Keep production version noted

**Version notes example:**
```
v15: Added purchase conversion tracking
- New tag: GA4 - Event - Purchase
- New trigger: Custom Event - purchase
- New variables: DL - transaction_id, DL - value
- Tested: Chrome, Safari, Mobile
```

---

## Consent Management

### Consent Mode Integration

```javascript
// Default state (before consent)
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied'
});

// Update on consent
function grantConsent() {
  gtag('consent', 'update', {
    'analytics_storage': 'granted',
    'ad_storage': 'granted'
  });
}
```

### GTM Consent Overview

1. Enable Consent Overview in Admin
2. Configure consent for each tag
3. Tags respect consent state automatically

---

## Advanced Patterns

### Tag Sequencing

**Setup tags to fire in order:**
Tag Configuration > Advanced Settings > Tag Sequencing

**Use cases:**
- Config tag before event tags
- Pixel initialization before tracking
- Cleanup after conversion

### Exception Handling

**Trigger exceptions** - Prevent tag from firing:
- Exclude certain pages
- Exclude internal traffic
- Exclude during testing

### Custom JavaScript Variables

```javascript
// Get URL parameter
function() {
  var params = new URLSearchParams(window.location.search);
  return params.get('campaign') || '(not set)';
}

// Get cookie value
function() {
  var match = document.cookie.match('(^|;) ?user_id=([^;]*)(;|$)');
  return match ? match[2] : null;
}

// Get data from page
function() {
  var el = document.querySelector('.product-price');
  return el ? parseFloat(el.textContent.replace('$', '')) : 0;
}
```

---

## ab-test-setup — Sample Size Guide

<!-- Source: skills/ab-test-setup/references/sample-size-guide.md -->

# Sample Size Guide

Reference for calculating sample sizes and test duration.

## Contents
- Sample Size Fundamentals (required inputs, what these mean)
- Sample Size Quick Reference Tables
- Duration Calculator (formula, examples, minimum duration rules, maximum duration guidelines)
- Online Calculators
- Adjusting for Multiple Variants
- Common Sample Size Mistakes
- When Sample Size Requirements Are Too High
- Sequential Testing
- Quick Decision Framework

## Sample Size Fundamentals

### Required Inputs

1. **Baseline conversion rate**: Your current rate
2. **Minimum detectable effect (MDE)**: Smallest change worth detecting
3. **Statistical significance level**: Usually 95% (α = 0.05)
4. **Statistical power**: Usually 80% (β = 0.20)

### What These Mean

**Baseline conversion rate**: If your page converts at 5%, that's your baseline.

**MDE (Minimum Detectable Effect)**: The smallest improvement you care about detecting. Set this based on:
- Business impact (is a 5% lift meaningful?)
- Implementation cost (worth the effort?)
- Realistic expectations (what have past tests shown?)

**Statistical significance (95%)**: Means there's less than 5% chance the observed difference is due to random chance.

**Statistical power (80%)**: Means if there's a real effect of size MDE, you have 80% chance of detecting it.

---

## Sample Size Quick Reference Tables

### Conversion Rate: 1%

| Lift to Detect | Sample per Variant | Total Sample |
|----------------|-------------------|--------------|
| 5% (1% → 1.05%) | 1,500,000 | 3,000,000 |
| 10% (1% → 1.1%) | 380,000 | 760,000 |
| 20% (1% → 1.2%) | 97,000 | 194,000 |
| 50% (1% → 1.5%) | 16,000 | 32,000 |
| 100% (1% → 2%) | 4,200 | 8,400 |

### Conversion Rate: 3%

| Lift to Detect | Sample per Variant | Total Sample |
|----------------|-------------------|--------------|
| 5% (3% → 3.15%) | 480,000 | 960,000 |
| 10% (3% → 3.3%) | 120,000 | 240,000 |
| 20% (3% → 3.6%) | 31,000 | 62,000 |
| 50% (3% → 4.5%) | 5,200 | 10,400 |
| 100% (3% → 6%) | 1,400 | 2,800 |

### Conversion Rate: 5%

| Lift to Detect | Sample per Variant | Total Sample |
|----------------|-------------------|--------------|
| 5% (5% → 5.25%) | 280,000 | 560,000 |
| 10% (5% → 5.5%) | 72,000 | 144,000 |
| 20% (5% → 6%) | 18,000 | 36,000 |
| 50% (5% → 7.5%) | 3,100 | 6,200 |
| 100% (5% → 10%) | 810 | 1,620 |

### Conversion Rate: 10%

| Lift to Detect | Sample per Variant | Total Sample |
|----------------|-------------------|--------------|
| 5% (10% → 10.5%) | 130,000 | 260,000 |
| 10% (10% → 11%) | 34,000 | 68,000 |
| 20% (10% → 12%) | 8,700 | 17,400 |
| 50% (10% → 15%) | 1,500 | 3,000 |
| 100% (10% → 20%) | 400 | 800 |

### Conversion Rate: 20%

| Lift to Detect | Sample per Variant | Total Sample |
|----------------|-------------------|--------------|
| 5% (20% → 21%) | 60,000 | 120,000 |
| 10% (20% → 22%) | 16,000 | 32,000 |
| 20% (20% → 24%) | 4,000 | 8,000 |
| 50% (20% → 30%) | 700 | 1,400 |
| 100% (20% → 40%) | 200 | 400 |

---

## Duration Calculator

### Formula

```
Duration (days) = (Sample per variant × Number of variants) / (Daily traffic × % exposed)
```

### Examples

**Scenario 1: High-traffic page**
- Need: 10,000 per variant (2 variants = 20,000 total)
- Daily traffic: 5,000 visitors
- 100% exposed to test
- Duration: 20,000 / 5,000 = **4 days**

**Scenario 2: Medium-traffic page**
- Need: 30,000 per variant (60,000 total)
- Daily traffic: 2,000 visitors
- 100% exposed
- Duration: 60,000 / 2,000 = **30 days**

**Scenario 3: Low-traffic with partial exposure**
- Need: 15,000 per variant (30,000 total)
- Daily traffic: 500 visitors
- 50% exposed to test
- Effective daily: 250
- Duration: 30,000 / 250 = **120 days** (too long!)

### Minimum Duration Rules

Even with sufficient sample size, run tests for at least:
- **1 full week**: To capture day-of-week variation
- **2 business cycles**: If B2B (weekday vs. weekend patterns)
- **Through paydays**: If e-commerce (beginning/end of month)

### Maximum Duration Guidelines

Avoid running tests longer than 4-8 weeks:
- Novelty effects wear off
- External factors intervene
- Opportunity cost of other tests

---

## Online Calculators

### Recommended Tools

**Evan Miller's Calculator**
https://www.evanmiller.org/ab-testing/sample-size.html
- Simple interface
- Bookmark-worthy

**Optimizely's Calculator**
https://www.optimizely.com/sample-size-calculator/
- Business-friendly language
- Duration estimates

**AB Test Guide Calculator**
https://www.abtestguide.com/calc/
- Includes Bayesian option
- Multiple test types

**VWO Duration Calculator**
https://vwo.com/tools/ab-test-duration-calculator/
- Duration-focused
- Good for planning

---

## Adjusting for Multiple Variants

With more than 2 variants (A/B/n tests), you need more sample:

| Variants | Multiplier |
|----------|------------|
| 2 (A/B) | 1x |
| 3 (A/B/C) | ~1.5x |
| 4 (A/B/C/D) | ~2x |
| 5+ | Consider reducing variants |

**Why?** More comparisons increase chance of false positives. You're comparing:
- A vs B
- A vs C
- B vs C (sometimes)

Apply Bonferroni correction or use tools that handle this automatically.

---

## Common Sample Size Mistakes

### 1. Underpowered tests
**Problem**: Not enough sample to detect realistic effects
**Fix**: Be realistic about MDE, get more traffic, or don't test

### 2. Overpowered tests
**Problem**: Waiting for sample size when you already have significance
**Fix**: This is actually fine—you committed to sample size, honor it

### 3. Wrong baseline rate
**Problem**: Using wrong conversion rate for calculation
**Fix**: Use the specific metric and page, not site-wide averages

### 4. Ignoring segments
**Problem**: Calculating for full traffic, then analyzing segments
**Fix**: If you plan segment analysis, calculate sample for smallest segment

### 5. Testing too many things
**Problem**: Dividing traffic too many ways
**Fix**: Prioritize ruthlessly, run fewer concurrent tests

---

## When Sample Size Requirements Are Too High

Options when you can't get enough traffic:

1. **Increase MDE**: Accept only detecting larger effects (20%+ lift)
2. **Lower confidence**: Use 90% instead of 95% (risky, document it)
3. **Reduce variants**: Test only the most promising variant
4. **Combine traffic**: Test across multiple similar pages
5. **Test upstream**: Test earlier in funnel where traffic is higher
6. **Don't test**: Make decision based on qualitative data instead
7. **Longer test**: Accept longer duration (weeks/months)

---

## Sequential Testing

If you must check results before reaching sample size:

### What is it?
Statistical method that adjusts for multiple looks at data.

### When to use
- High-risk changes
- Need to stop bad variants early
- Time-sensitive decisions

### Tools that support it
- Optimizely (Stats Accelerator)
- VWO (SmartStats)
- PostHog (Bayesian approach)

### Tradeoff
- More flexibility to stop early
- Slightly larger sample size requirement
- More complex analysis

---

## Quick Decision Framework

### Can I run this test?

```
Daily traffic to page: _____
Baseline conversion rate: _____
MDE I care about: _____

Sample needed per variant: _____ (from tables above)
Days to run: Sample / Daily traffic = _____

If days > 60: Consider alternatives
If days > 30: Acceptable for high-impact tests
If days < 14: Likely feasible
If days < 7: Easy to run, consider running longer anyway
```

---

## ab-test-setup — Test Templates

<!-- Source: skills/ab-test-setup/references/test-templates.md -->

# A/B Test Templates Reference

Templates for planning, documenting, and analyzing experiments.

## Contents
- Test Plan Template
- Results Documentation Template
- Test Repository Entry Template
- Quick Test Brief Template
- Stakeholder Update Template
- Experiment Prioritization Scorecard
- Hypothesis Bank Template

## Test Plan Template

```markdown
# A/B Test: [Name]

## Overview
- **Owner**: [Name]
- **Test ID**: [ID in testing tool]
- **Page/Feature**: [What's being tested]
- **Planned dates**: [Start] - [End]

## Hypothesis

Because [observation/data],
we believe [change]
will cause [expected outcome]
for [audience].
We'll know this is true when [metrics].

## Test Design

| Element | Details |
|---------|---------|
| Test type | A/B / A/B/n / MVT |
| Duration | X weeks |
| Sample size | X per variant |
| Traffic allocation | 50/50 |
| Tool | [Tool name] |
| Implementation | Client-side / Server-side |

## Variants

### Control (A)
[Screenshot]
- Current experience
- [Key details about current state]

### Variant (B)
[Screenshot or mockup]
- [Specific change #1]
- [Specific change #2]
- Rationale: [Why we think this will win]

## Metrics

### Primary
- **Metric**: [metric name]
- **Definition**: [how it's calculated]
- **Current baseline**: [X%]
- **Minimum detectable effect**: [X%]

### Secondary
- [Metric 1]: [what it tells us]
- [Metric 2]: [what it tells us]
- [Metric 3]: [what it tells us]

### Guardrails
- [Metric that shouldn't get worse]
- [Another safety metric]

## Segment Analysis Plan
- Mobile vs. desktop
- New vs. returning visitors
- Traffic source
- [Other relevant segments]

## Success Criteria
- Winner: [Primary metric improves by X% with 95% confidence]
- Loser: [Primary metric decreases significantly]
- Inconclusive: [What we'll do if no significant result]

## Pre-Launch Checklist
- [ ] Hypothesis documented and reviewed
- [ ] Primary metric defined and trackable
- [ ] Sample size calculated
- [ ] Test duration estimated
- [ ] Variants implemented correctly
- [ ] Tracking verified in all variants
- [ ] QA completed on all variants
- [ ] Stakeholders informed
- [ ] Calendar hold for analysis date
```

---

## Results Documentation Template

```markdown
# A/B Test Results: [Name]

## Summary
| Element | Value |
|---------|-------|
| Test ID | [ID] |
| Dates | [Start] - [End] |
| Duration | X days |
| Result | Winner / Loser / Inconclusive |
| Decision | [What we're doing] |

## Hypothesis (Reminder)
[Copy from test plan]

## Results

### Sample Size
| Variant | Target | Actual | % of target |
|---------|--------|--------|-------------|
| Control | X | Y | Z% |
| Variant | X | Y | Z% |

### Primary Metric: [Metric Name]
| Variant | Value | 95% CI | vs. Control |
|---------|-------|--------|-------------|
| Control | X% | [X%, Y%] | — |
| Variant | X% | [X%, Y%] | +X% |

**Statistical significance**: p = X.XX (95% = sig / not sig)
**Practical significance**: [Is this lift meaningful for the business?]

### Secondary Metrics

| Metric | Control | Variant | Change | Significant? |
|--------|---------|---------|--------|--------------|
| [Metric 1] | X | Y | +Z% | Yes/No |
| [Metric 2] | X | Y | +Z% | Yes/No |

### Guardrail Metrics

| Metric | Control | Variant | Change | Concern? |
|--------|---------|---------|--------|----------|
| [Metric 1] | X | Y | +Z% | Yes/No |

### Segment Analysis

**Mobile vs. Desktop**
| Segment | Control | Variant | Lift |
|---------|---------|---------|------|
| Mobile | X% | Y% | +Z% |
| Desktop | X% | Y% | +Z% |

**New vs. Returning**
| Segment | Control | Variant | Lift |
|---------|---------|---------|------|
| New | X% | Y% | +Z% |
| Returning | X% | Y% | +Z% |

## Interpretation

### What happened?
[Explanation of results in plain language]

### Why do we think this happened?
[Analysis and reasoning]

### Caveats
[Any limitations, external factors, or concerns]

## Decision

**Winner**: [Control / Variant]

**Action**: [Implement variant / Keep control / Re-test]

**Timeline**: [When changes will be implemented]

## Learnings

### What we learned
- [Key insight 1]
- [Key insight 2]

### What to test next
- [Follow-up test idea 1]
- [Follow-up test idea 2]

### Impact
- **Projected lift**: [X% improvement in Y metric]
- **Business impact**: [Revenue, conversions, etc.]
```

---

## Test Repository Entry Template

For tracking all tests in a central location:

```markdown
| Test ID | Name | Page | Dates | Primary Metric | Result | Lift | Link |
|---------|------|------|-------|----------------|--------|------|------|
| 001 | Hero headline test | Homepage | 1/1-1/15 | CTR | Winner | +12% | [Link] |
| 002 | Pricing table layout | Pricing | 1/10-1/31 | Plan selection | Loser | -5% | [Link] |
| 003 | Signup form fields | Signup | 2/1-2/14 | Completion | Inconclusive | +2% | [Link] |
```

---

## Quick Test Brief Template

For simple tests that don't need full documentation:

```markdown
## [Test Name]

**What**: [One sentence description]
**Why**: [One sentence hypothesis]
**Metric**: [Primary metric]
**Duration**: [X weeks]
**Result**: [TBD / Winner / Loser / Inconclusive]
**Learnings**: [Key takeaway]
```

---

## Stakeholder Update Template

```markdown
## A/B Test Update: [Name]

**Status**: Running / Complete
**Days remaining**: X (or complete)
**Current sample**: X% of target

### Preliminary observations
[What we're seeing - without making decisions yet]

### Next steps
[What happens next]

### Timeline
- [Date]: Analysis complete
- [Date]: Decision and recommendation
- [Date]: Implementation (if winner)
```

---

## Experiment Prioritization Scorecard

For deciding which tests to run:

| Factor | Weight | Test A | Test B | Test C |
|--------|--------|--------|--------|--------|
| Potential impact | 30% | | | |
| Confidence in hypothesis | 25% | | | |
| Ease of implementation | 20% | | | |
| Risk if wrong | 15% | | | |
| Strategic alignment | 10% | | | |
| **Total** | | | | |

Scoring: 1-5 (5 = best)

---

## Hypothesis Bank Template

For collecting test ideas:

```markdown
| ID | Page/Area | Observation | Hypothesis | Potential Impact | Status |
|----|-----------|-------------|------------|------------------|--------|
| H1 | Homepage | Low scroll depth | Shorter hero will increase scroll | High | Testing |
| H2 | Pricing | Users compare plans | Comparison table will help | Medium | Backlog |
| H3 | Signup | Drop-off at email | Social login will increase completion | Medium | Backlog |
```
