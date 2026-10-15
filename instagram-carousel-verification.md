# Instagram carousel verification

- Preserved 20 distinct cards and all existing media files; Corvette Dde6cY7xOm8 remains first. One rendered slide per ID; Embla loops by repositioning existing slides rather than cloning media.
- Desktop 1280px and mobile 390px: continuous movement, accessible arrows, mouse drag without unwanted click, real touch swipe with inertia, manual navigation resume, no document horizontal overflow, no page runtime errors.
- Selection freezes motion even when the selected video is paused or cannot decode; the close-video X clearly ends selection. Opening photos freezes motion; Escape/close restores focus and permits motion. The end-event lifecycle was exercised with a dispatched event, not real playback.
- Photo slides: DbgyZJJkWfX (2 photos) and Da_T_j9kRE7 (18 photos), next/previous and full-screen presentation passed on both widths. Existing file URLs preserved.
- Reduced-motion disables automatic movement; leaving the viewport pauses it; hidden-document pause/resume was tested by overriding document.hidden and dispatching visibilitychange. Manual pause remains respected.
- Original new Corvette and old Harley MP4 sources were exercised: the test Chromium reports empty H.264 codec support and media error 4. Real video playback, natural end and audible exclusivity remain unverified in this browser; all videos now use the existing playback coordinator and initiating one pauses other media.
- Latest preview validation: build OK. Nothing published.