# HERO MODE — BREACH NOTIFICATION PROCEDURE
**Version:** 1.0  
**Effective:** Upon app launch to App Store / Google Play  
**Regulation:** FTC Health Breach Notification Rule (16 CFR Part 318)  
**Responsible party:** Cody Flowers, HeroMode LLC (Wyoming)  
**Contact:** cody.flowers@mymail.champlain.edu  

---

## What This Document Is

The FTC Health Breach Notification Rule applies to any application that collects "personal health records" — including workout logs, wellness check-ins, GPS location data, nutrition logs, and body weight data. Hero Mode collects all of these. There is no minimum revenue or company size threshold.

This document is an internal operating procedure. It is not public-facing, but it must exist and be followed. Keep this file with your LLC records from Northwest Registered Agent.

---

## 1. What Counts as a Breach

A breach is any unauthorized access, acquisition, use, or disclosure of identifiable health data, including:

**Pre-backend (current v1 — local storage only):**
- Physical theft or loss of a device containing Hero Mode data and no device passcode / App Lock enabled
- Unauthorized access to a user's device by a third party who gains access to Hero Mode data
- A malicious update or script injection that reads and exfiltrates localStorage data

**Post-backend (future cloud phase):**
- Unauthorized access to the database containing user health records
- A server misconfiguration exposing user data
- A compromised API key or service account with access to health data
- A vendor/third-party breach that exposes Hero Mode user data they processed on our behalf

**What is NOT a breach:**
- A user voluntarily exporting their own data
- A user sharing their device with someone they authorized
- A user forgetting their PIN (this only locks the UI; the data is still OS-encrypted)

---

## 2. Breach Response Timeline

| Day | Action |
|-----|--------|
| **Day 0** | Breach discovered or reported |
| **Days 1–3** | Confirm breach is real; begin scope assessment |
| **Days 3–10** | Determine: which users affected, what data categories exposed, timeframe |
| **Days 10–30** | Prepare written user notification (see template in §4) |
| **Days 30–60** | Send notification to all affected users via email |
| **Day 60** | If 500 or more users affected: submit notice to FTC at ftc.gov/healthbreach |

**The 60-day clock starts on Day 0 (discovery), not on the date you finish investigating.**

---

## 3. Scope Assessment

When a potential breach is identified, answer these questions before notifying:

1. Which users are affected? (All users? Users who used GPS? Users on a specific date range?)
2. Which data categories were exposed? (workout logs, wellness, GPS tracks, nutrition, body weight, API keys)
3. What is the timeframe of exposure? (When did the breach start? When was it contained?)
4. Was data merely accessed, or was it copied/transmitted externally?
5. Is the breach ongoing or contained?
6. For pre-backend breaches: was the affected device passcode-protected? (iOS Data Protection may limit actual exposure even if device was stolen)

Document answers to all six questions before drafting notifications.

---

## 4. User Notification Template

Send via email to the affected user's registered email address. Subject: "Important Security Notice from Hero Mode."

---

**Subject:** Important Security Notice from Hero Mode

Dear Hero Mode user,

We are writing to notify you of a security incident that may have affected your Hero Mode health data.

**What happened:** [Describe the breach in plain language — e.g., "A device containing Hero Mode data was reported lost/stolen" or "We discovered unauthorized access to our database."]

**What data was involved:** [List specifically — e.g., workout logs from [date range], wellness check-in data, GPS walk tracks.]

**When it happened:** The incident occurred approximately [date/timeframe]. We discovered it on [discovery date].

**What we have done:** [Describe containment steps — e.g., "We have revoked the compromised access credentials and patched the vulnerability."]

**What you can do:**
- If you believe your device was accessed without authorization, consider enabling a stronger passcode
- Monitor any accounts that share the same email address for unusual activity
- Contact us at [contact email] with any questions

We take the protection of your health data seriously. We are sorry this occurred and are committed to preventing future incidents.

Sincerely,  
Cody Flowers  
HeroMode LLC  
cody.flowers@mymail.champlain.edu

---

## 5. FTC Notification (500+ Users Affected)

If the breach affects 500 or more users, submit a report to the FTC within 60 days of discovery at:  
**https://www.ftc.gov/healthbreach**

The report requires:
- Name and contact information of the business
- Description of the breach (what happened, when, how discovered)
- Types of health information involved
- Number of individuals affected
- Steps taken to contain the breach and notify users

You do not need an attorney to file. The FTC portal walks through it step by step.

---

## 6. Record-Keeping

After any breach (even minor), document:
- Date of discovery
- Scope assessment results
- Date and method of user notification
- Number of users notified
- Whether FTC notification was required and filed
- Steps taken to prevent recurrence

Store these records with your LLC documents for a minimum of 3 years.

---

## 7. Post-Backend Additions (Cloud Phase)

When cloud backup launches, add the following to this procedure:

- Firebase/Supabase anomaly alert configuration (alert on: >10x normal read volume for a single user, unexpected bulk exports, auth token reuse from new geolocation)
- Firestore audit log review cadence (weekly automated review)
- Vendor breach notification: add Hero Mode to vendor breach alert services (e.g., HaveIBeenPwned Enterprise for business)
- Incident response runbook stored in the same repo as this document

---

*This document should be reviewed and updated annually, and immediately following any security incident or significant architectural change (e.g., adding a backend, changing cloud providers).*
