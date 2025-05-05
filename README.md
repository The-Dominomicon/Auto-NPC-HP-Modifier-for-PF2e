# Auto NPC HP Modifier

A lightweight Foundry VTT module for **Pathfinder Second Edition** GMs, created by **Dominic of The Dominomicon**.

This module automatically applies slight, randomized HP adjustments to NPC tokens **as they are placed on the canvas**—no need for manual tweaks or macros.

---

## 🎯 What It Does

When you drop an NPC onto the scene, the module will:
- Determine their level (minimum 1, even for level -1/0 creatures),
- Roll a **random number between -X × level and +X × level**, where X is a configurable multiplier (default: ×2),
- Modify the token’s **max HP and current HP** by that amount,
- Always set the creature to **full health** after the adjustment.

The result: Some NPCs are a bit beefier, others are more fragile. This creates subtle encounter variety without rebalancing the whole game.

---

## ⚙️ Configuration

You can adjust the module behavior via:

> ⚙️ Settings → Configure Settings → Module Settings → Auto NPC HP Modifier

### Available Settings

#### 🔢 HP Variance Multiplier
- Choose from ×1 through ×10
- This controls how much HP can vary by level
- **Default is ×2**

#### 🔄 HP Adjustment Mode
- `Increase and Decrease (default)` – Random HP goes up or down
- `Only Increase HP` – HP can only increase
- `Only Decrease HP` – HP can only decrease

---

## 🧠 System Support

This module is designed **exclusively for Pathfinder Second Edition** and works with the PF2e system on Foundry VTT.

It uses the system’s level field and actor data format, and will not behave correctly on other systems.

---

## 📦 Installation

To install the module, paste this URL into Foundry's **“Install Module via Manifest URL”**:

```
https://raw.githubusercontent.com/The-Dominomicon/Auto-NPC-HP-Modifier-for-PF2e/main/module.json
```

---

## 🧙 Author

**Dominic**  
[The Dominomicon YouTube Channel](https://www.youtube.com/@TheDominomicon)  
Sci-fi / fantasy Pathfinder 2e content, guides, and actual play.

---

## 🛠 Tech Stuff

- Changes are applied directly to each Token’s embedded actor data using `createToken` hook
- Uses a 100ms delay to ensure token initialization doesn’t overwrite changes
- Compatible with Weak/Elite templates
- Works even if the NPC prototype actor was saved with damaged HP

---

## 🧪 License

MIT License – do whatever you like, just don’t be a dick about it.
