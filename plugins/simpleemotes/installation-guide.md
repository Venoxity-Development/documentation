---
icon: computer
description: Step-by-step instructions to install SimpleEmotes for GTA V, including troubleshooting tips and alternative methods for a smooth setup.
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: false
---

# Installation Guide

## Standard Installation Steps
Follow these steps to install **SimpleEmotes** into your GTA V game.

### 1. Download the Release
- Download the latest release from the [Releases](../../releases) page.
- Unzip the archive and place the `SimpleEmotes` folder somewhere easy to find (like your Desktop).

### 2. Install the DLC Package
1. Go to:  
   ```
   SimpleEmotes/Required Content/DLC Package
   ```
2. Open **OpenIV** and enable **Edit Mode**.
3. Navigate to:  
   ```
   mods/update/x64/dlcpacks
   ```
4. Drag and drop the `animpack` folder into the `dlcpacks` folder.
5. Then go to:  
   ```
   mods/update/update.rpf/common/data
   ```
6. Open `dlclist.xml` and add the following line **inside** the `<Paths>` section:
   ```xml
   <Item>dlcpacks:/animpack/</Item>
   ```
7. Save and close the file.

### 3. Install Game Files
1. Go back to the `SimpleEmotes` folder.
2. Open:
   ```
   SimpleEmotes/Grand Theft Auto V
   ```
3. Select **everything** inside that folder and drag it into your main GTA V game folder.  
   This includes files like:
   ```
   Venoxity.Common.dll
   ```

## Troubleshooting
Encountering issues? Try these solutions:
- **Animations Not Playing:** This may indicate your game isn’t updated to the latest version or the `animpack` was not installed correctly. Update GTA V and verify the `animpack` folder is in `mods > update > x64 > dlcpacks` with the correct `dlclist.xml` entry.
- **Crashes on Launch:** Most likely caused by an outdated `Venoxity.Common.dll`. Replace it with the latest version from the SimpleEmotes download package.

## Known Conflicts
SimpleEmotes may conflict with certain mods or game settings. Here’s what to watch for:
- **SimpleCTRL:** This mod uses an older version of `Venoxity.Common.dll` and is outdated, leading to compatibility issues with SimpleEmotes. Use only one of these mods at a time until SimpleCTRL is updated.
- **Simple Foot Controls:** The crouching feature in SimpleEmotes may conflict with similar functionality in Simple Foot Controls, causing overlapping controls or unexpected behavior. Disable one of these mods to resolve the issue.