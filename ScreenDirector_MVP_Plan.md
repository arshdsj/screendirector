# ScreenDirector MVP — React Native / Expo iPhone 15 App

## Summary

Build an iOS-only Expo prebuild app in TypeScript, optimized for iPhone 15. The first release delivers reliable, offline Call and Popup Text Message props, each playing from a realistic simulated iPhone home screen after a hidden delay. It includes fixed simulated date/time, native photo selection, local media storage, reusable presets, and message history.

## Implementation Changes

- Use Expo prebuild with Expo Router, React Native gesture handling, `expo-image-picker`, `expo-file-system`, AsyncStorage, and keep-awake support.
- Create a single local data store for:
  - Global fixed simulated date/time.
  - Call and text preset records, including copied local media URIs.
  - Deduplicated previously used text-message bodies, with deletion support.
- Build a launch screen with Call, Text Message, Conversation (coming soon), and Green Screen (coming soon) categories; show the subtle “Developed by Arsh DSJ” credit on all editor screens only.
- Add a simulated iPhone 15 home screen component with wallpaper, static app grid/dock/folders, simulated status information, and a tappable ScreenDirector icon. Opening that icon returns to the editor hub; all other fake icons remain inert.
- Implement Call editor:
  - Empty caller name/avatar inputs, incoming or outgoing type, delay, optional local ringtone toggle, and Unknown/Scam/Blocked presets only.
  - Start opens the simulated home screen immediately and triggers exactly one event after the configured delay.
  - Incoming calls show realistic accept/decline affordances; outgoing calls enter an active-call screen directly. Ending any call returns to the simulated home screen.
- Implement Text Message editor:
  - Empty sender/avatar/message fields, optional attachment, configurable delay, previous-message selection/deletion, and saved-preset loading.
  - Start opens the simulated home screen, then presents exactly one swipe-dismissable iOS-style notification. It does not reappear after dismissal.
- Put preset controls beneath each Start Event action: save under a user-provided name, load from a dropdown/list, delete saved entries, and treat loaded presets as editable copies until explicitly saved again.
- Playback screens are edge-to-edge, hide editor chrome, real app status UI, credits, menus, and debug controls. Keep the simulated presentation visually consistent and return home after a completed/dismissed prop.

## Public Interfaces / Data

- Define typed local models for `CallProp`, `TextMessageProp`, `Preset<T>`, `MediaAsset`, and `SimulatedClock`.
- Centralize playback as a typed event state machine: `idle → homeWaiting → active → completed`, with one-shot timer cancellation on navigation, interruption, or completion.
- Expose editor actions for save/load/delete presets, import media, delete message history, start playback, and return-to-editor via the ScreenDirector home-screen icon.

## Test Plan

- Unit-test preset serialization, copied-media references, history deduplication/deletion, and one-shot playback timer behavior.
- Test Call flows for incoming accept/decline, outgoing active call, ending a call, and returning to home.
- Test Text flow for one notification per start, swipe dismissal, no duplicate trigger, attachment display, and return-to-editor navigation.
- Verify fixed simulated date/time appears consistently on simulated home and prop UI.
- Manually verify iPhone 15 safe areas, Dynamic Island spacing, full-screen playback, native photo-picker import, offline relaunch persistence, and absence of editor controls/credit during takes.

## Assumptions

- The app is iOS/iPhone 15 only for this MVP; Android, Conversation, and Green Screen are explicitly deferred.
- Visuals use standard iPhone 15/iOS conventions rather than a supplied screenshot, which can be used for later camera-accuracy refinement.
- Simulated time is manually set and remains fixed during playback.
- Imported images are copied into the app’s local document storage so source-gallery deletion does not break presets.
- Call completion is actor-controlled; text notifications are actor-dismissible.
