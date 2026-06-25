# Install skool-view (Firefox)

A faster, custom view over Skool communities. It runs **entirely in your own browser** using **your
own logged-in Skool session** — there's no central server and no shared credentials.

## Install

1. Open **Firefox** (desktop).
2. Click the latest signed install link: **[skool-view releases](https://github.com/rocleemusic/skool-view/releases/latest)** → download the `.xpi`.
3. Firefox asks to **Add skool-view** → **Add**. (The add-on is Mozilla-signed, so it installs permanently.)
4. You'll see the **`cn`** button appear in the toolbar.

> Firefox only for now. A Chrome build is a fast-follow.

## Use it

1. Go to any Skool community you're a member of (e.g. `skool.com/your-group`).
2. Click the **`cn` toolbar button** — or press **`Alt+S`** — to toggle the custom view on/off.
3. In the view: browse the feed (filter by category, sort, infinite-scroll), open a post, read
   threaded comments, and **like / comment / reply** for real. The bell shows notifications; the
   refresh button reloads. Click **← Back to Skool** (or toggle again) to return to the native site.

## What it can access, and why

- **`skool.com` only** — it never runs on any other site.
- **Your session cookies** — so it can read and post **as you**, exactly like the normal site. Nothing
  is sent anywhere except Skool's own servers; there is no skool-view server.
- **Local storage** — remembers your theme + whether the view is on.

## Updates

skool-view **auto-updates** — Firefox periodically checks the project's update feed and installs new
signed versions in the background. No action needed.

## Uninstall

`about:addons` → skool-view → **Remove**.
