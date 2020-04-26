// Import Modules
import { SR6ItemSheet } from "./module/item/sheet.js";
import { SR6ActorSheet } from "./module/actor/sheet.js";
import { SR6Actor } from './module/actor/entity.js';
import { SR6Item } from './module/item/entity.js';
import { SR6 } from './module/config.js';
import { Helpers } from './module/helpers.js';
import { preloadHandlebarsTemplates } from './module/templates.js';
import { DiceSR } from './module/dice.js';
import { preCombatUpdate, shadowrunCombatUpdate } from './module/combat.js';
import { measureDistance } from './module/canvas.js';
import * as chat from './module/chat.js';

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", function() {
  console.log("Loading Shadowrun 6e System");

  // Create a namespace within the game global
  game.shadowrun6e = {
    SR6Actor,
    DiceSR,
    SR6Item,
    rollItemMacro,
  };

  CONFIG.SR6 = SR6;
  CONFIG.Actor.entityClass = SR6Actor;
  CONFIG.Item.entityClass = SR6Item;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("shadowrun6e", SR6ActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("shadowrun6e", SR6ItemSheet, { makeDefault: true});

  ['renderSR6ActorSheet', 'renderSR6ItemSheet'].forEach(s => {
    Hooks.on(s, (app, html, data) => Helpers.setupCustomCheckbox(app, html, data));
  });

  preloadHandlebarsTemplates();

  // CONFIG.debug.hooks = true;
});

Hooks.on('canvasInit', function() {
  SquareGrid.prototype.measureDistance = measureDistance;
});

Hooks.on('ready', () => {
  game.socket.on("system.shadowrun6e", data => {
    if (game.user.isGM && data.gmCombatUpdate) {
      shadowrunCombatUpdate(
        data.gmCombatUpdate.changes,
        data.gmCombatUpdate.options
      );
    }
    console.log(data)
  });
});

Hooks.on('preUpdateCombat', preCombatUpdate);
Hooks.on('renderChatMessage', (app, html, data) => {
  if (!app.isRoll) SR6Item.chatListeners(html)
});
Hooks.on("getChatLogEntryContext", chat.addChatMessageContextOptions);

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

Hooks.on("hotbarDrop", (bar, data, slot) => {
  if ( data.type !== "Item" ) return;
  createItemMacro(data.data, slot);
  return false;
});

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} item     The item data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(item, slot) {
  const command = `game.shadowrun6e.rollItemMacro("${item.name}");`;
  let macro = game.macros.entities.find(m => (m.name === item.name) && (m.command === command));
  if ( !macro ) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: {"shadowrun6e.itemMacro": true}
    }, {displaySheet: false});
  }
  game.user.assignHotbarMacro(macro, slot);
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemName
 * @return {Promise}
 */
function rollItemMacro(itemName) {
  const speaker = ChatMessage.getSpeaker();
  let actor;
  if ( speaker.token ) actor = game.actors.tokens[speaker.token];
  if ( !actor ) actor = game.actors.get(speaker.actor);
  const item = actor ? actor.items.find(i => i.name === itemName) : null;
  if ( !item ) return ui.notifications.warn(`Your controlled Actor does not have an item named ${itemName}`);

  return item.roll();
}

Handlebars.registerHelper("localizeOb", function(strId, obj, options) {
  if (obj) strId = obj[strId];
  return game.i18n.localize(strId);
});

Handlebars.registerHelper("toHeaderCase", function(str) {
  if (str) return Helpers.label(str);
  return "";
});

Handlebars.registerHelper("concat", function(strs, c = ",") {
  if (Array.isArray(strs)) {
    return strs.join(c);
  }
  return strs;
});
Handlebars.registerHelper("ifin", function(val, arr, options) {
  if (arr.includes(val)) return options.fn(this);
  else return options.inverse(this);
});
// if greater than
Handlebars.registerHelper("ifgt", function(v1, v2, options) {
 if (v1 > v2) return options.fn(this);
 else return options.inverse(this);
});
// if not equal
Handlebars.registerHelper("ifne", function(v1, v2, options) {
 if (v1 !== v2) return options.fn(this);
 else return options.inverse(this);
});
// if equal
Handlebars.registerHelper("ife", function(v1, v2, options) {
 if (v1 === v2) return options.fn(this);
 else return options.inverse(this);
});
Handlebars.registerHelper("sum", function(v1, v2) {
  return v1 + v2;
});
