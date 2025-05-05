// Register a setting to choose the HP variance multiplier
Hooks.once("init", () => {
  game.settings.register("auto-npc-hp-modifier", "hpMultiplier", {
    name: "HP Variance Multiplier",
    hint: "Multiplies the NPC level to determine the max amount of HP variance (e.g., Level × 2).",
    scope: "world",
    config: true,
    default: 2,
    type: Number,
    choices: {
      1: "×1",
      2: "×2",
      3: "×3",
      4: "×4",
      5: "×5"
    }
  });
});

// Hook to token creation, but apply changes to token document directly
Hooks.on("createToken", async (tokenDoc) => {
  setTimeout(async () => {
    const token = canvas.tokens.get(tokenDoc.id);
    if (!token) return;

    const actor = token.actor;
    if (!actor || actor.type !== "npc") return;

    const multiplier = game.settings.get("auto-npc-hp-modifier", "hpMultiplier");
    let level = actor.system.details.level?.value;
    if (level === undefined || level < 1) level = 1;

    const mod = Math.floor(Math.random() * (level * multiplier * 2 + 1)) - (level * multiplier);

    const oldMax = actor.system.attributes.hp.max;
    const newMax = Math.max(1, oldMax + mod);
    const newCurrent = newMax;

    // Apply HP changes directly to the token's actor data on the scene
    await token.document.update({
      "actorData.system.attributes.hp.max": newMax,
      "actorData.system.attributes.hp.value": newCurrent
    });
  }, 100);
});
