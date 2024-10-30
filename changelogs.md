---
description: Learn More About Current and Previous Releases of Our Plugins
icon: scroll
---

# Changelogs

## General Information

🔽 **Download the Latest Versions:** Access all our plugins through the **"Download"** dropdown menu at the top right to stay updated with new releases.

🕹️ **Enhance Your Gameplay:** Explore plugins like **SimpleCTRL** and **SimpleHUD**, designed for seamless integration and unique features in GTA V.

🤝 **Join Our Community:** Connect with other players and developers for support and feedback on our Discord server: [Join Discord](https://discord.gg/venoxity-network-977366062100283444).

✅ **Stay Informed:** Keep an eye on this section for the latest news, updates, and changelog entries.

✨ **We Value Your Feedback:** Your input helps us improve and innovate. Feel free to reach out with any suggestions or questions!

## SimpleHUD 1.2.8 (10/25/24)

### 🛠️ **Fixes**

* Locations (GWC and Golfing Society, Cayo Perico, North Yankton) are no longer labeled as **“Unknown County.”**
* Duplicate street and crossing road names are prevented from displaying (e.g., **"Olympic Fwy / Olympic Fwy"**).

### ✨ **Improvements**

* Redesigned the postal map for a more accurate and modern look.
* Rewritten from **C# (ScriptHookVDotNet)** to **C++ (ScriptHookV)** for improved performance and stability.
* Introduced a proximity-based **"Near"** prefix system for better location awareness on the HUD.
* Added checks in `DrawTextOnScreen` for radar status, player state, and UI visibility to ensure text is displayed appropriately.