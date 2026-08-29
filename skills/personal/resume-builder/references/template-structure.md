# Template Structure Reference

This document captures the exact structure and formatting of the canonical resume template (Juan Ignacio Tejera format). Every resume produced by this skill must mirror this structure precisely.

## Document Specifications

- **Font:** Calibri throughout
- **Page size:** Letter (7772400 × 10058400 EMU)
- **Margins:** Top ~35.5pt, Bottom ~46.75pt, Left ~36pt, Right ~34pt
- **Line spacing:** 1.0 (single)
- **Paragraph spacing before:** ~42545 EMU (~3.35pt) for body paragraphs

## Font Sizes

| Element | Size (pt) | Style |
|---------|-----------|-------|
| Name (header) | 14 | Bold, centered |
| Contact line | 9 | Normal, centered |
| Section headings (EDUCATION, etc.) | 12 | Bold, ALL CAPS |
| All body text | 10 | Normal |
| Organization names | 10 | Bold |
| Role titles | 10 | Italic |
| Label prefixes (Honors/Awards:, Technical:, etc.) | 10 | Italic |

## Exact Section-by-Section Layout

### Header Block

```
[CENTERED, 14pt Bold]
Full Name

[CENTERED, 9pt Normal]
City, ST | (XXX) XXX-XXXX | email@domain.com | linkedin.com/in/handle
```

### EDUCATION Section

```
[12pt Bold]
EDUCATION

[10pt: Bold for school, Normal for location/date]
**University Name** | City, ST                                             Month YYYY
[10pt: Italic for degree label, Normal for details]
*Bachelor of Arts* | *Major:* Economics | *Minors:* Consumer Psychology, Statistics & Data Science
[10pt: Italic label, Normal details]
*Honors/Awards:* Award description here

**High School Name** | City, ST                                            Month YYYY
*ACT Scores:* Math (36/36); English (35/36); Reading (33/36)
*Honors/Awards:* Rank – 7/212; Award Name; Achievement
```

Key observations:
- University/school name is bold, pipe separator, then city/state in normal weight.
- Graduation date is right-aligned on the same line (achieved via tabs in DOCX).
- Degree line uses italic for labels (*Bachelor of Arts*, *Major:*, *Minors:*) and normal for values.
- Honors/Awards label is italic, content is normal.
- High school can include test scores with the same italic-label pattern.

### PROFESSIONAL EXPERIENCE Section

```
[12pt Bold]
PROFESSIONAL EXPERIENCE

[10pt]
**Company Name**, *Job Title* | City, ST                     Month YYYY – Month YYYY
- Achievement bullet starting with action verb, quantified impact
- Achievement bullet starting with action verb, quantified impact
- Achievement bullet starting with action verb, quantified impact
```

Key observations:
- Company name is bold, comma separator, role in italics, pipe, then city/state.
- Date range is right-aligned on the same line.
- Bullets are plain text (not bold/italic), starting with action verbs.
- Bullets do NOT start with `- ` in the DOCX; they are separate paragraphs. In markdown output, use `- `.
- No sub-bullets anywhere.
- Some roles have 2 bullets, some have 3. Range is 2–6.

### LEADERSHIP & OTHER EXPERIENCE Section

```
[12pt Bold]
LEADERSHIP & OTHER EXPERIENCE

[10pt]
**Organization Name**, *Role Title* | City, ST                Month YYYY – Month YYYY
- Impact-focused bullet
- Impact-focused bullet
```

Same formatting pattern as Professional Experience.
- Some entries have only 1 bullet (e.g., a competition result on a single line).
- Some entries omit the role title if it's just a club membership.

### SKILLS & INTERESTS Section

```
[12pt Bold]
SKILLS & INTERESTS

[10pt: Italic labels, Normal values]
*Technical:* Skill A, Skill B, Skill C, Tool D, Method E
*Languages:* Language (proficiency), Language (proficiency)
*Interests:* Interest A; Interest B; Interest C; Interest D
```

Key observations:
- Technical items are separated by commas.
- Interest items are separated by semicolons.
- Language proficiency in parentheses: native, professional working proficiency, fluent, conversational, etc.

## Date Format Convention

- Single date (graduation): `Month YYYY` → e.g., `May 2025`
- Date range: `Month YYYY – Month YYYY` → e.g., `Sep 2025 – Present`
- Use en-dash (–) not hyphen (-) for date ranges.
- Abbreviate months: Jan, Feb, Mar, Apr, May, June, July, Aug, Sep, Oct, Nov, Dec.

## Right-Alignment of Dates

In the DOCX, dates are right-aligned on the same line as the organization/role using tab characters. When generating DOCX output, replicate this with right-aligned tab stops. In markdown output, just place the date at the end of the line.
