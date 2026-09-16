# Lush Marketing website

A self-contained static site (no build step) with a content manager (Decap CMS)
so text can be edited from a browser without touching code.

## What's in here

```
index.html          the page itself
styles.css
script.js            loads the content/*.json files into the page at runtime
content/              <- everything editable through the CMS lives here
  hero.json
  pillars.json        (Advise / Train / Do)
  approach.json        ("So, what can we do to help you?")
  about.json
  contact.json
images/                logo, photos and brand graphics, pulled from your PDF
admin/
  index.html            the CMS login/editor screen
  config.yml             tells the CMS which fields map to which files
netlify.toml
```

The page text isn't hard-coded into `index.html` — on load, `script.js` fetches
each file in `content/` and fills in the page. Editing those JSON files (by
hand, or through the CMS below) is all that's needed to update the site's
wording; no rebuild or redeploy of the HTML itself is required, only a
redeploy of the changed JSON, which the CMS does for you automatically.

## Going live: 3 steps

The CMS needs a real backend to save your edits to (it commits changes to
Git), so it only works once the site is hosted on Netlify. Locally, or if
you open `index.html` directly as a file, the page still displays correctly,
but `/admin` won't be able to save anything.

**1. Put this folder in a GitHub repository.**
Create a new repo (e.g. `lush-marketing-website`) and push everything in this
folder to it.

**2. Connect the repo to Netlify.**
In Netlify: *Add new site → Import an existing project* → pick the repo.
Leave the build command blank and set the publish directory to `.` (already
set in `netlify.toml`). Deploy.

**3. Turn on Identity + Git Gateway.**
In the Netlify site dashboard: *Site configuration → Identity* → **Enable
Identity**. Then *Identity → Services → Git Gateway* → **Enable Git Gateway**.
Under *Identity → Invite users*, invite Jill (and yourself) by email — you'll
each get an email to set a password.

After that, visiting `yoursite.netlify.app/admin` shows a login screen, and
once logged in, an editor for each section of the site (Hero, How we work,
Approach, About, Contact), with a "Publish" button. Publishing commits the
change to GitHub, Netlify redeploys in the background, and the live site
updates within a minute or so.

## Editing photos

Photos (Jill's headshots, the awards photo) are managed the same way — each
"How we work" item and the About section has an image field in the CMS that
lets you upload a replacement.

## Custom domain

Once you're happy with the `netlify.app` URL, add your own domain under
*Domain management* in the Netlify dashboard and point your DNS at it —
Netlify issues a free HTTPS certificate automatically.
