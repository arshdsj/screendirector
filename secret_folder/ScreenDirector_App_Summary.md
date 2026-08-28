# ScreenDirector — App Summary & Functionality

## App Purpose

**ScreenDirector** is a personal iPhone 15 filmmaking tool for creating realistic, choreographed phone-screen props for film shoots. The app is meant to let a filmmaker quickly set up fake calls, text messages, conversations, notifications, green screens, and other phone interactions, then play them full-screen so the phone looks like a real iPhone on camera.

The app is not meant to be a public/commercial app. It is a fully unlocked personal production tool with no accounts, no subscriptions, no ads, no paywalls, and no online dependency.

The main goal is:

> Choose a prop → configure it → set a timer or cue → press Start → the phone shows a realistic iPhone screen → the choreographed event plays exactly as planned.

Reliability, speed, simplicity, and realistic iPhone visuals are more important than unnecessary complexity.

---

## Target Device

The app is designed specifically for the **standard iPhone 15**.

The interface should be optimized for:

- iPhone 15 screen size and proportions
- Dynamic Island placement
- Safe areas
- iOS-style status bar
- iOS-style home screen
- iMessage layout
- Call-screen layout
- iPhone-style keyboard proportions
- Touch-first controls

The app should not show desktop-style instructions like **“Press Esc”** because it is intended to be used directly on an iPhone.

---

## Main Launch/Home Workflow

When the app opens, the user should be introduced to simple prop categories such as:

- Prop Call
- Prop Text Message
- Prop Conversation / Chat
- Green Screen
- Other future prop types

The workflow should be fast and direct:

1. Open the app.
2. Choose the type of prop to create.
3. Configure the prop details.
4. Set a timer or cue.
5. Press **Start Event**.
6. The app enters the simulated iPhone environment.
7. The choreographed event plays full-screen.

At the bottom of the homepage and configuration screens, display:

**Developed by Arsh DSJ**

This credit should be subtle and should **not** appear during full-screen prop playback.

---

## Simulated iPhone Home Screen

The simulated home screen is extremely important because it appears before and after prop events.

It should look like a real default iPhone home screen, especially based on the provided reference screenshot.

It should accurately include:

- Wallpaper
- App icon layout
- App icon size
- Dock
- Folders
- App labels
- Status bar
- Dynamic Island spacing
- Realistic iPhone margins
- Proper proportions

The ScreenDirector app itself should appear as an app icon on this simulated home screen.

After a call ends or any prop finishes, the user should return to this simulated home screen. There should not be a floating three-dot menu for **Restart**, **Edit**, or **Go Home**.

To restart or edit a prop, the user should tap the ScreenDirector app icon from the simulated home screen.

Other fake apps on the home screen can remain unclickable.

---

## Simulated Date and Time

The user should be able to set the simulated date and time from the home screen.

This simulated time should affect the entire prop environment, including:

- Home screen clock
- Message timestamps
- Notification timestamps
- Call information
- Conversation timing
- Any other visible time/date elements

The prop environment should not depend only on the real iPhone’s current system time.

---

## Prop Call Functionality

The **Prop Call** module lets the user create a fake incoming or outgoing call.

The user should be able to configure:

- Caller name
- Caller image/avatar
- Call type
- Timer/delay before the call appears
- Ringtone or call behavior where needed
- Call preset

After pressing **Start Event**:

1. The simulated iPhone home screen appears.
2. The timer runs invisibly in the background.
3. When the timer ends, the choreographed call screen appears.
4. The call should look like a real iPhone call interface.
5. After the call ends, the phone returns to the simulated home screen.

### Call Presets

Keep the useful presets simple.

Current desired call presets:

- Unknown Call
- Scam Call
- Blocked Call

Remove useless scenario presets such as:

- Warehouse Drop
- Rooftop Rendezvous

Do not add scenario-specific presets unless specifically requested later.

---

## Prop Text Message / Popup Message Functionality

The **Prop Text Message** module lets the user configure a fake text/iMessage notification.

The user should be able to configure:

- Sender/contact name
- Contact image/avatar
- Message text
- Timer/delay before the message appears
- Optional attachment image

After pressing **Start Event**:

1. The simulated iPhone home screen appears.
2. The timer runs invisibly.
3. When the timer ends, the choreographed message notification appears.
4. The notification should look like a real iPhone/iOS notification.

The message notification should appear **only once**. If it appears twice, that is a bug.

The notification should also be swipeable, so the actor can dismiss it naturally like a real iPhone notification.

### Previously Used Messages

Remove useless **Cinema Dialogue** presets from popup text/message props.

Instead, add **Previously Used Messages**.

The app should remember messages the user has typed before and show them as reusable suggestions.

The user should be able to:

- Select a previously used message
- Reuse it quickly
- Delete unwanted message history entries

---

## Prop Conversation / iMessage Chat Functionality

The **Prop Conversation** module lets the user choreograph a full iMessage-style conversation.

The user should configure:

- Contact name
- Contact photo/avatar
- Sender messages
- Receiver messages
- Message order
- Message timing

All fields should start empty. Do not pre-fill conversations with templates, fake dialogue, example messages, or sample names.

### Actor Typing Behavior

When the conversation starts:

1. The simulated iMessage interface opens full-screen.
2. The iPhone-style keyboard appears.
3. The actor can tap keys naturally.
4. No matter which keys the actor presses, the prewritten sender message appears in the text field.
5. The message is not sent automatically.
6. The actor must tap the Send button.
7. After sending, the other side shows a realistic typing indicator.
8. After around 3–4 seconds, the choreographed receiver response appears automatically.
9. The conversation continues according to the planned message order.

The keyboard should not look oversized. Its size, spacing, bottom area, and proportions should feel accurate to the iPhone 15 keyboard.

### iMessage Layout Accuracy

The iMessage screen should closely match the real iPhone/iOS layout.

Fix alignment issues with:

- Contact photo/avatar
- Contact name
- Back button
- Safe area
- Dynamic Island spacing
- Top navigation area
- Message bubbles
- Keyboard

The contact photo and name should be properly centered and aligned, not visually off-center.

The normal iMessage-style back button in the top-left should return to the simulated default home screen.

---

## Image Selection

The app should allow images to be selected from the iPhone’s native Photos/Gallery library.

This should work for:

- Contact photos
- Caller avatars
- Message attachments
- Images sent in the message prop screen
- Any future prop where user-selected images are needed

Use Apple’s native photo picker where possible.

Imported images should remain safely available inside the project/preset even if the original gallery photo is later moved or deleted.

---

## Green Screen Functionality

Add **Green Screen** as its own category on the launch/home screen.

When selected, it should open a simple configuration screen where the user can choose tracking marker options before starting.

Marker options should include:

- No markers
- Basic center markers
- Corner markers
- Grid-style tracking markers
- Adjustable marker density/spacing if practical

After pressing **Start**, the app should show a full-screen green screen.

During green-screen playback, there should be no visible app controls, menus, borders, or editor UI.

---

## Save as Preset Functionality

Every prop configuration screen should support saving custom presets.

At the bottom of each configuration screen, below the **Start Event** button, add:

- **Save as Preset** button
- Preset dropdown arrow/list next to it

The user should be able to:

- Configure a prop
- Save the configuration as a named preset
- Open the preset dropdown later
- Select a saved preset
- Load all saved settings instantly
- Modify a loaded preset without overwriting it unless explicitly saved again
- Delete unwanted presets

Presets should be stored locally and persist after closing and reopening the app.

This should work across all relevant prop types, not only calls.

---

## No Pre-Filled Example Content

Do not pre-populate user-editable fields with fake content.

This means no default:

- Fake names
- Fake conversations
- Fake dialogue
- Sample messages
- Scene templates
- Fictional contact details

Fields should be empty by default unless a value is technically required.

Instructional placeholders are okay, such as:

- Enter name
- Enter message
- Select image

But these placeholders should not become real prop content.

---

## Full-Screen Prop Playback

When a prop is being played, the experience should look like a real iPhone screen, not an app editor.

During playback, hide:

- Editor UI
- Menus
- Three-dot controls
- Borders
- Debug text
- Desktop-style tips
- Configuration controls
- Creator credit

The actor-facing playback should occupy the whole iPhone screen.

The goal is that, under a camera, the phone looks like a normal iPhone receiving a call, notification, or message.

---

## Restarting and Editing Props

Do not use a floating options menu for restart/edit/home actions.

Instead:

- After a prop ends, return to the simulated home screen.
- The user can tap the ScreenDirector app icon to return to the app.
- From there, the user can restart, edit, or configure another prop.

This keeps the simulated phone experience believable and avoids visible app controls during filming.

---

## Offline and Local-First Behavior

The app should work fully offline.

It should not require:

- Accounts
- Internet
- Cloud login
- Subscription validation
- Server connection
- Ads
- Analytics

All projects, presets, media, and message history should be stored locally.

Optional backups can be added later, but the app’s core functionality should not depend on online services.

---

## Reliability Requirements for Filmmaking

Because the app is meant for real shooting situations, it should prioritize reliability.

Important behavior:

- Prop events should trigger exactly once.
- Timers should be dependable.
- The app should not show unwanted UI during playback.
- The actor should not accidentally enter edit screens during a take.
- The app should recover gracefully if interrupted.
- Saved presets should not disappear.
- Imported images should not break unexpectedly.
- The simulated UI should remain visually consistent between takes.

---

## Overall Desired Experience

ScreenDirector should feel like a fast, practical filmmaker’s prop-control app.

The ideal experience is:

1. Open the app.
2. Pick a prop type.
3. Enter only the details needed.
4. Optionally load or save a preset.
5. Set a timer.
6. Press Start.
7. The phone shows a believable iPhone home screen.
8. The choreographed event happens automatically.
9. The actor interacts naturally.
10. The phone returns to the simulated home screen when done.

The app should be simple enough to use quickly on set, but accurate enough to look believable under a camera.
