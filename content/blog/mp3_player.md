---
title: Mp3 Player
date: 2025-04-01T12:00:00-08:00
draft: false
author: Alex Fallenstedt
annotations: false
---

I remember being a kid with an iPod filled with music. It had music which I owned which I could listen to without an internet connection or using data from my phone plan. I missed that feeling and decided to build my own mp3 player as an Android app. I wanted to get more familiar with Kotlin, Android app development, and build something that could help people own their own data. The app is free, open source, and there are zero advertisements. [You can download it here](https://github.com/Fallenstedt/mp3_player) and start building your own music library...again.

## Directory structure

My plan was to use the `Music` directory on my phone to hold artists and their albums. Tapping on any song would load all songs in that directory into a playlist.

```
/Music
├── The Beatles
│   ├── Abbey Road
│   │   ├── 01 - Come Together.mp3
│   │   ├── 02 - Something.mp3
│   │   ├── 03 - Maxwell's Silver Hammer.mp3
│   │   └── ...
│   ├── Revolver
│   │   ├── 01 - Taxman.mp3
│   │   ├── 02 - Eleanor Rigby.mp3
│   │   ├── 03 - I'm Only Sleeping.mp3
│   │   └── ...
├── Daft Punk
│   ├── Discovery
│   │   ├── 01 - One More Time.mp3
│   │   ├── 02 - Aerodynamic.mp3
│   │   ├── 03 - Digital Love.mp3
│   │   └── ...
└── Radiohead
	├── OK Computer
	│   ├── 01 - Airbag.mp3
	│   ├── 02 - Paranoid Android.mp3
	│   ├── 03 - Subterranean Homesick Alien.mp3
	│   └── …
```

## Learning Jetpack Compose & Android Development

My Google Pixel has a Music directory which was unused. But I knew that somehow an app could play music. So over several weekends I went through [Android’s Training courses](https://developer.android.com/courses/) to get a high-level overview of how to build apps with this library.

## ExoPlayer

I used [ExoPlayer](https://developer.android.com/media/media3/exoplayer/hello-world), the default implementation for Jetpack Media3’s Player interface to play music. The great thing about this library is that it allows me to play music in the background using a [MediaSessionService](https://developer.android.com/media/media3/session/background-playback).

## Summary

I built this MP3 Player app to bring back the simplicity of offline music listening—no ads, no subscriptions, no disappearing albums. It’s free and open source.

- 🔗 GitHub Repo: https://github.com/Fallenstedt/mp3_player
- 📥 Download the APK: You can download the latest APK from the [Releases page on GitHub](https://github.com/Fallenstedt/mp3_player/releases) and install it on your Android device.
