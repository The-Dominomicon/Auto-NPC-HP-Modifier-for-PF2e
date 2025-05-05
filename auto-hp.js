// Register module settings
Hooks.once("init", () => {
  game.settings.register("auto-npc-hp-modifier", "hpMultiplier", {
    name: "HP Variance Multiplier",
    "hint": "Multiplies the NPC level to determine the max amount of HP variance (default is ×2).",
    scope: "world",
    config: true,
    default: 2,
    type: Number,
    choices: {
      1: "×1",
      2: "×2",
      3: "×3",
      4: "×4",
      5: "×5",
      6: "×6",
      7: "×7",
      8: "×8",
      9: "×9",
      10: "×10"
    }
  });

  game.settings.register("auto-npc-hp-modifier", "adjustmentMode", {
    name: "HP Adjustment Mode",
    hint: "Choose whether HP should only increase, only decrease, or vary both ways.",
    scope: "world",
    config: true,
    default: "both",
    type: String,
    choices: {
      "both": "Increase and Decrease (default)",
      "increase": "Only Increase HP",
      "decrease": "Only Decrease HP"
    }
  });
});

// Hook to token creation and apply HP adjustments based on settings
Hooks.on("createToken", async (tokenDoc) => {
  setTimeout(async () => {
    const token = canvas.tokens.get(tokenDoc.id);
    if (!token) return;

    const actor = token.actor;
    if (!actor || actor.type !== "npc") return;

    const multiplier = game.settings.get("auto-npc-hp-modifier", "hpMultiplier");
    const mode = game.settings.get("auto-npc-hp-modifier", "adjustmentMode");

    let level = actor.system.details.level?.value;
    if (level === undefined || level < 1) level = 1;

    let mod = 0;
    const range = level * multiplier;

    if (mode === "both") {
      mod = Math.floor(Math.random() * (range * 2 + 1)) - range;
    } else if (mode === "increase") {
      mod = Math.floor(Math.random() * (range + 1));
    } else if (mode === "decrease") {
      mod = -Math.floor(Math.random() * (range + 1));
    }

    const oldMax = actor.system.attributes.hp.max;
    const newMax = Math.max(1, oldMax + mod);
    const newCurrent = newMax;

    await token.document.update({
      "actorData.system.attributes.hp.max": newMax,
      "actorData.system.attributes.hp.value": newCurrent
    });
  }, 100);
});
