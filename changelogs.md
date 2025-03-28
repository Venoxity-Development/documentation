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

## MessageBoards 1.0.0 (12/12/24)

* Initial Release

## License Plate Changer 1.0.1 (12/23/24)

### 🛠️ **Fixes**
* Complete Rewrite: The script has undergone a complete overhaul to boost performance and expand functionality.

### ✨ **Improvements**
* New API System: A robust API built for developers, ensuring seamless compatibility with both RagePluginHook (RPH) and ScriptHookVDotNet (SHVDN).  
* Trailer Support: Now includes full support for various plate formats and types tailored to trailers.
* Enhanced Vehicle Data Configuration: The `vehicleData.toml` file now supports multiple plate sets, offering different plate types and formats for more flexible vehicle configurations. 

## License Plate Changer 1.1.0 (03/27/25)

### 🛠️ **Fixes**
* **Assembly Metadata:** Updated the copyright year to 2025 for accurate attribution.
* **Backend Logging:** Refined logging structure for clearer, more meaningful entries, now logged directly to the file.

### ✨ **Improvements**
* **New Library:** Introduced **Venoxity.Common** to centralize core logic, improving maintainability and consistency.
  
### 🌟 **New Features**
* Added new settings under the **[ADVANCED]** section:
  * **MaxNearbyVehicles:** Limits the number of nearby vehicles (default: 10).
  * **VehicleScanRadius:** Defines the radius within which vehicles are scanned (default: 100.0).
