# ScreenDirector

An offline, iOS-only screen-prop app built with Expo and TypeScript. The MVP stages delayed phone calls and iOS-style text notifications over a simulated iPhone 15 home screen.

## Current build

- Call editor with incoming/outgoing modes, local avatars, delay, generated offline ringtone, built-in presets, and reusable custom presets.
- Text editor with local avatars/attachments, message history, delay, reusable presets, and a one-shot swipe-dismissable notification.
- Fixed simulated date/time shared across editor and playback.
- Offline persistence via AsyncStorage and copied media in app document storage.
- Edge-to-edge playback with keep-awake and a one-shot timer state machine.
- Conversation and Green Screen placeholders for later milestones.

## Run locally

Requires Node.js 22+, Xcode 26.4+, and CocoaPods.

```bash
npm install
npm run prebuild
npm run ios
```

For faster UI iteration in Expo Go, use `npm start` and open the project on an iPhone or iOS Simulator.

## Checks

```bash
npm run typecheck
npm test
```
