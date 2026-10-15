# NextPlay waitlist site

A two-page static site: the main page (`index.html`) and the developer page (`devs/index.html`, which will live at yoursite.com/devs). No build step. Upload the folder as it is.

## Files

- `index.html` - main page for players and clip creators
- `devs/index.html` - developer version
- `styles.css` - all colors, fonts and layout (colors are at the top)
- `script.js` - signup form handling (the MailerLite addresses are at the top)

## How signups work

Every signup form on the site sends the email to MailerLite, which adds the person to your list. The site is already connected to the MailerLite form "NextPlay Waitlist". People see the site's own "You're on the list" message, not MailerLite's.

### Splitting people into groups

One MailerLite form adds people to the groups you ticked when you set it up, so right now everyone lands in the same place. To keep developers, creators and founding signups separate:

1. In MailerLite, create one more embedded form per group, each adding people to that group only.
2. For each form, open its embed code and copy the address in `action="..."` (it ends in `/subscribe`).
3. Open `script.js` and paste each address next to the matching type in `FORM_ENDPOINTS`:
   - `dev` - top form, "Game developer" picked
   - `creator` and `both` - top form, the other two choices
   - `founding-developer` and `founding-creator` - the founding forms on each page
4. Re-upload the site.

## Put it online

Any of these is free for a site like this. The easiest is drag-and-drop:

- **Cloudflare Pages** (Workers & Pages > Create > Pages > Upload assets)
- **Netlify** (app.netlify.com/drop, drag the unzipped folder onto the page)

Unzip the folder first, then upload the folder itself (the one containing `index.html`).

## Use your own domain

Buy a domain (for example nextplay.com if it's free), then add it in your host's "Custom domains" settings and follow the DNS steps it shows. The developer page will be at `yourdomain.com/devs` automatically.

Tip: use a different link per place you share it so you can see what works, for example `yourdomain.com/?from=reddit`. The page ignores the extra part and your host's analytics can count it.

## Before you tell people about it

- Submit a test signup with your own email, then check MailerLite > Subscribers to confirm it arrived. The site can't see MailerLite's reply, so this is the only way to be sure.
- Check MailerLite's double opt-in setting (Account settings). If it's on, new people get a confirmation email and only count after they click it. If you keep it on, change the success message on both pages to tell them to check their email.
- Replace the example clip card with a real screenshot or short clip once the app has one. It is labelled "example clip" for now.
- Add a short privacy note and a contact email when you have them (a lawyer can check the wording). Every email you send should include an unsubscribe link, which MailerLite adds for you.
- The promises on the page ("early access, a founding badge, and a direct line to the two people building it") are placeholders from the design. Change them in both `index.html` and `devs/index.html` if you plan something different.
