

// baseSpeed 1 means 1 item every 10 seconds
// cost 100 is the normal one
const baseSettings = { baseCost: 100, baseSpeed: 1 }

// Efficiency as percentage decimal, 0.5 means it uses half of a normal furnace
const furnacesSettings = {
    'better_smelters:oak_wood_furnace': { efficiency: 1, speed: 1 },
    'better_smelters:copper_furnace': { efficiency: 1, speed: 1.5 },
    'better_smelters:iron_furnace': { efficiency: 1, speed: 2 },
    'better_smelters:netherrack_furnace': { efficiency: 0.0001, speed: 2 },
    'better_smelters:gold_furnace': { efficiency: 0.8, speed: 3 },
    'better_smelters:emerald_furnace': { efficiency: 0.6, speed: 5 },
    'better_smelters:diamond_furnace': { efficiency: 0.4, speed: 10 },
    'better_smelters:amethyst_furnace': { efficiency: 0.4, speed: 15 },
    'better_smelters:netherite_furnace': { efficiency: 0.2, speed: 20 },
    'better_smelters:blazing_furnace': { efficiency: 0.1, speed: 25 },
    'better_smelters:nether_star_furnace': { efficiency: 0.01, speed: 10 }
}

const upgrades = {
    'better_smelters:upgrade_to_iron': {
        initialF: 'minecraft:furnace', nextF: 'better_smelters:iron_furnace'
    },
    'better_smelters:upgrade_to_copper': {
        initialF: 'minecraft:furnace', nextF: 'better_smelters:copper_furnace'
    },
    'better_smelters:copper_upgrade_to_iron': {
        initialF: 'better_smelters:copper_furnace', nextF: 'better_smelters:iron_furnace'
    },
    'better_smelters:iron_upgrade_to_gold': {
        initialF: 'better_smelters:iron_furnace', nextF: 'better_smelters:gold_furnace'
    },
    'better_smelters:gold_upgrade_to_emerald': {
        initialF: 'better_smelters:gold_furnace', nextF: 'better_smelters:emerald_furnace'
    },
    'better_smelters:emerald_upgrade_to_diamond': {
        initialF: 'better_smelters:emerald_furnace', nextF: 'better_smelters:diamond_furnace'
    },
    'better_smelters:emerald_upgrade_to_amethyst': {
        initialF: 'better_smelters:emerald_furnace', nextF: 'better_smelters:amethyst_furnace'
    },
    'better_smelters:diamond_upgrade_to_netherite': {
        initialF: 'better_smelters:diamond_furnace', nextF: 'better_smelters:netherite_furnace'
    },
    'better_smelters:amethyst_upgrade_to_netherite': {
        initialF: 'better_smelters:amethyst_furnace', nextF: 'better_smelters:netherite_furnace'
    },
    'better_smelters:netherite_upgrade_to_blazing': {
        initialF: 'better_smelters:netherite_furnace', nextF: 'better_smelters:blazing_furnace'
    }
}

// fuel means how many items does it smelts
const fuels = [
    { id: 'compressed_coal_block', fuel: 800 },
    { id: 'coal_block', fuel: 80 },
    { id: 'coal', fuel: 8 },
    { id: 'charcoal', fuel: 8 },
    { id: 'plank', fuel: 1.5 },
    { id: 'stair', fuel: 1.5 },
    { id: 'fence', fuel: 1.5 },
    { id: 'stick', fuel: 0.5 },
    { id: 'door', fuel: 1 },
    { id: 'ladder', fuel: 0.75 },
    { id: 'scaffolding', fuel: 0.25 },
    { id: 'log', fuel: 1.5 },
    { id: '_wood', fuel: 1.5 },
    { id: 'stem', fuel: 1.5 },
    { id: 'hyphae', fuel: 1.5 },
    { id: 'sapling', fuel: 0.5 },
    { id: 'dried_kelp_block', fuel: 20 },
    { id: 'twm:lava_ball', fuel: 100 },
    { id: 'blaze_rod', fuel: 12 },
    { id: 'boat', fuel: 6 },
    { id: 'button', fuel: 0.5 },
    { id: 'wooden', fuel: 1 },
    { id: 'banner', fuel: 1.5 },
    { id: 'chest', fuel: 3 },
    { id: 'minecraft:bamboo', fuel: 0.5 },
    { id: 'minecraft:lava_bucket', transformToItem: 'minecraft:bucket', fuel: 100 },
    { id: 'cloud_iron_coals:iron_coal', fuel: 120 },
    { id: 'cloud_iron_coals:gold_coal', fuel: 240 },
    { id: 'cloud_iron_coals:diamond_coal', fuel: 480 },
    { id: 'cloud_iron_coals:emerald_coal', fuel: 960 },
    { id: 'cloud_iron_coals:netherite_coal', fuel: 7680 },
    { id: 'cloud_iron_coals:aeon_coal', fuel: 99999999 },
    { id: 'cloud_iron_coals:iron_coal_chunk', fuel: 15 },
    { id: 'cloud_iron_coals:gold_coal_chunk', fuel: 30 },
    { id: 'cloud_iron_coals:diamond_coal_chunk', fuel: 60 },
    { id: 'cloud_iron_coals:emerald_coal_chunk', fuel: 120 },
    { id: 'iron_furnaces:rainbow_coal', fuel: 80 },
    { id: 'project_emc:mobius_fuel', fuel: 1600 },
    { id: 'project_emc:aeternalis_fuel', fuel: 6500 },
    { id: 'project_emc:alchemical_coal', fuel: 410 }
];

const smeltableItems = {
    // UtilityCraft
    "twm:raw_steel": {
        output: "twm:steel_ingot"
    },
    "twm:raw_energized_iron": {
        output: "twm:energized_iron_ingot"
    },
    "twm:iron_dust": {
        output: "minecraft:iron_ingot"
    },
    "twm:copper_dust": {
        output: "minecraft:copper_ingot"
    },
    "twm:gold_dust": {
        output: "minecraft:gold_ingot"
    },
    "twm:netherite_dust": {
        output: "minecraft:netherite_ingot"
    },
    "twm:steel_dust": {
        output: "twm:steel_ingot"
    },
    "twm:energized_iron_dust": {
        output: "twm:energized_iron_ingot"
    },
    "twm:raw_steel_block": {
        output: "twm:steel_block"
    },
    "twm:raw_energized_iron_block": {
        output: "twm:energized_iron_block"
    },
    "twm:raw_leather": {
        output: "minecraft:leather"
    },
    // Utility Useful Recipes
    "minecraft:raw_iron_block": {
        output: "minecraft:iron_block"
    },
    "minecraft:raw_gold_block": {
        output: "minecraft:gold_block"
    },
    "minecraft:raw_copper_block": {
        output: "minecraft:copper_block"
    },
    // Minecraft Vanilla
    "minecraft:porkchop": {
        output: "minecraft:cooked_porkchop"
    },
    "minecraft:beef": {
        output: "minecraft:cooked_beef"
    },
    "minecraft:chicken": {
        output: "minecraft:cooked_chicken"
    },
    "minecraft:cod": {
        output: "minecraft:cooked_cod"
    },
    "minecraft:salmon": {
        output: "minecraft:cooked_salmon"
    },
    "minecraft:potato": {
        output: "minecraft:baked_potato"
    },
    "minecraft:mutton": {
        output: "minecraft:cooked_mutton"
    },
    "minecraft:rabbit": {
        output: "minecraft:cooked_rabbit"
    },
    "minecraft:kelp": {
        output: "minecraft:dried_kelp"
    },
    "minecraft:rotten_flesh": {
        output: "strat:coagulated_blood"
    },
    "artifacts:everlasting_beef": {
        output: "artifacts:eternal_steak"
    },
    "bg:draconium_dust": {
        output: "bg:draconium_ingot"
    },
    "auxillium:amberine_ore": {
        output: "auxillium:amberine"
    },
    "auxillium:nether_amberine_ore": {
        output: "auxillium:amberine"
    },
    "auxillium:deepslate_amberine_ore": {
        output: "auxillium:amberine"
    },
    "auxillium:aurorus_ore": {
        output: "auxillium:aurorus"
    },
    "auxillium:deepslate_aurorus_ore": {
        output: "auxillium:aurorus"
    },
    "auxillium:auxillium_ore": {
        output: "auxillium:auxillium"
    },
    "auxillium:deepslate_auxillium_ore": {
        output: "auxillium:aurxillium"
    },
    "auxillium:cosmium_ore": {
        output: "auxillium:cosmium"
    },
    "auxillium:deepslate_cosmium_ore": {
        output: "auxillium:cosmium"
    },
    "auxillium:necrite_ore": {
        output: "auxillium:necrite"
    },
    "strat:raw_ardite": {
        output: "strat:ardite_ingot"
    },
    "strat:raw_aluminium": {
        output: "strat:aluminium_ingot"
    },
    "strat:aluminium_ore": {
        output: "strat:aluminium_ingot"
    },
    "strat:raw_cobalt": {
        output: "strat:cobalt_ingot"
    },
    "strat:cobalt_ore": {
        output: "strat:cobalt_ingot"
    },
    "strat:grout": {
        output: "strat:seared_brick"
    },
    "strat:nether_grout": {
        output: "strat:seared_brick"
    },
    "minecraft:raw_iron": {
        output: "minecraft:iron_ingot"
    },
    "minecraft:raw_gold": {
        output: "minecraft:gold_ingot"
    },
    "minecraft:raw_copper": {
        output: "minecraft:copper_ingot"
    },
    "minecraft:copper_ore": {
        output: "minecraft:copper_ingot"
    },
    "minecraft:iron_ore": {
        output: "minecraft:iron_ingot"
    },
    "minecraft:gold_ore": {
        output: "minecraft:gold_ingot"
    },
    "minecraft:diamond_ore": {
        output: "minecraft:diamond"
    },
    "minecraft:lapis_ore": {
        output: "minecraft:lapis_lazuli"
    },
    "minecraft:redstone_ore": {
        output: "minecraft:redstone"
    },
    "minecraft:coal_ore": {
        output: "minecraft:coal"
    },
    "minecraft:emerald_ore": {
        output: "minecraft:emerald"
    },
    "minecraft:deepslate_copper_ore": {
        output: "minecraft:copper_ingot"
    },
    "minecraft:deepslate_iron_ore": {
        output: "minecraft:iron_ingot"
    },
    "minecraft:deepslate_gold_ore": {
        output: "minecraft:gold_ingot"
    },
    "minecraft:deepslate_diamond_ore": {
        output: "minecraft:diamond"
    },
    "minecraft:deepslate_lapis_ore": {
        output: "minecraft:lapis_lazuli"
    },
    "minecraft:deepslate_redstone_ore": {
        output: "minecraft:redstone"
    },
    "minecraft:deepslate_coal_ore": {
        output: "minecraft:coal"
    },
    "minecraft:deepslate_emerald_ore": {
        output: "minecraft:emerald"
    },
    "minecraft:quartz_ore": {
        output: "minecraft:quartz"
    },
    "minecraft:ancient_debris": {
        output: "minecraft:netherite_scrap"
    },
    "minecraft:nether_gold_ore": {
        output: "minecraft:gold_ingot"
    },
    "minecraft:deepslate_emerald_ore": {
        output: "minecraft:emerald"
    },
    "bg:draconium_dust": {
        output: "bg:draconium_ingot"
    },
    "auxillium:amberine_ore": {
        output: "auxillium:amberine"
    },
    "auxillium:nether_amberine_ore": {
        output: "auxillium:amberine"
    },
    "auxillium:deepslate_amberine_ore": {
        output: "auxillium:amberine"
    },
    "auxillium:aurorus_ore": {
        output: "auxillium:aurorus"
    },
    "auxillium:deepslate_aurorus_ore": {
        output: "auxillium:aurorus"
    },
    "auxillium:auxillium_ore": {
        output: "auxillium:auxillium"
    },
    "auxillium:deepslate_auxillium_ore": {
        output: "auxillium:aurxillium"
    },
    "auxillium:cosmium_ore": {
        output: "auxillium:cosmium"
    },
    "auxillium:deepslate_cosmium_ore": {
        output: "auxillium:cosmium"
    },
    "auxillium:necrite_ore": {
        output: "auxillium:necrite"
    },
    "minecraft:rotten_flesh": {
        output: "strat:coagulated_blood"
    },
    "artifacts:everlasting_beef": {
        output: "artifacts:eternal_steak"
    },
    "strat:raw_ardite": {
        output: "strat:ardite_ingot"
    },
    "strat:raw_aluminium": {
        output: "strat:aluminium_ingot"
    },
    "strat:aluminium_ore": {
        output: "strat:aluminium_ingot"
    },
    "strat:raw_cobalt": {
        output: "strat:cobalt_ingot"
    },
    "strat:cobalt_ore": {
        output: "strat:cobalt_ingot"
    },
    "strat:grout": {
        output: "strat:seared_brick"
    },
    "strat:nether_grout": {
        output: "strat:seared_brick"
    },
    "minecraft:raw_iron": {
        output: "minecraft:iron_ingot"
    },
    "minecraft:raw_gold": {
        output: "minecraft:gold_ingot"
    },
    "minecraft:raw_copper": {
        output: "minecraft:copper_ingot"
    },
    "minecraft:copper_ore": {
        output: "minecraft:copper_ingot"
    },
    "minecraft:iron_ore": {
        output: "minecraft:iron_ingot"
    },
    "minecraft:gold_ore": {
        output: "minecraft:gold_ingot"
    },
    "minecraft:diamond_ore": {
        output: "minecraft:diamond"
    },
    "minecraft:lapis_ore": {
        output: "minecraft:lapis_lazuli"
    },
    "minecraft:redstone_ore": {
        output: "minecraft:redstone"
    },
    "minecraft:coal_ore": {
        output: "minecraft:coal"
    },
    "minecraft:emerald_ore": {
        output: "minecraft:emerald"
    },
    "minecraft:deepslate_copper_ore": {
        output: "minecraft:copper_ingot"
    },
    "minecraft:deepslate_iron_ore": {
        output: "minecraft:iron_ingot"
    },
    "minecraft:deepslate_gold_ore": {
        output: "minecraft:gold_ingot"
    },
    "minecraft:deepslate_diamond_ore": {
        output: "minecraft:diamond"
    },
    "minecraft:deepslate_lapis_ore": {
        output: "minecraft:lapis_lazuli"
    },
    "minecraft:deepslate_redstone_ore": {
        output: "minecraft:redstone"
    },
    "minecraft:deepslate_coal_ore": {
        output: "minecraft:coal"
    },
    "minecraft:deepslate_emerald_ore": {
        output: "minecraft:emerald"
    },
    "minecraft:quartz_ore": {
        output: "minecraft:quartz"
    },
    "minecraft:ancient_debris": {
        output: "minecraft:netherite_scrap"
    },
    "minecraft:nether_gold_ore": {
        output: "minecraft:gold_ingot"
    },
    "minecraft:deepslate_emerald_ore": {
        output: "minecraft:emerald"
    },
    "minecraft:porkchop": {
        output: "minecraft:cooked_porkchop"
    },
    "minecraft:beef": {
        output: "minecraft:cooked_beef"
    },
    "minecraft:chicken": {
        output: "minecraft:cooked_chicken"
    },
    "minecraft:cod": {
        output: "minecraft:cooked_cod"
    },
    "minecraft:salmon": {
        output: "minecraft:cooked_salmon"
    },
    "minecraft:potato": {
        output: "minecraft:baked_potato"
    },
    "minecraft:mutton": {
        output: "minecraft:cooked_mutton"
    },
    "minecraft:rabbit": {
        output: "minecraft:cooked_rabbit"
    },
    "minecraft:kelp": {
        output: "minecraft:dried_kelp"
    },
    "minecraft:sand": {
        output: "minecraft:glass"
    },
    "minecraft:cobblestone": {
        output: "minecraft:stone"
    },
    "minecraft:sandstone": {
        output: "minecraft:smooth_sandstone"
    },
    "minecraft:red_sandstone": {
        output: "minecraft:smooth_red_sandstone"
    },
    "minecraft:stone": {
        output: "minecraft:smooth_stone"
    },
    "minecraft:quartz_block": {
        output: "minecraft:quartz_block"
    },
    "minecraft:clay_ball": {
        output: "minecraft:brick"
    },
    "minecraft:netherrack": {
        output: "minecraft:netherbrick"
    },
    "minecraft:nether_brick": {
        output: "minecraft:cracked_nether_bricks"
    },
    "minecraft:basalt": {
        output: "minecraft:smooth_basalt"
    },
    "minecraft:clay": {
        output: "minecraft:hardened_clay"
    },
    "minecraft:stonebrick": {
        output: "minecraft:stonebrick"
    },
    "minecraft:polished_blackstone_bricks": {
        output: "minecraft:cracked_polished_blackstone_bricks"
    },
    "minecraft:coobled_deepslate": {
        output: "minecraft:deepslate"
    },
    "minecraft:deepslate_bricks": {
        output: "minecraft:cracked_deepslate_bricks"
    },
    "minecraft:deepslate_tiles": {
        output: "minecraft:cracked_deepslate_tiles"
    },
    "minecraft:cactus": {
        output: "minecraft:green_dye"
    },
    "minecraft:oak_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:spruce_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:birch_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:jungle_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:acacia_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:dark_oak_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:cherry_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:mangrove_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_oak_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_spruce_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_birch_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_jungle_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_acacia_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_dark_oak_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_cherry_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:stripped_mangrove_log": {
        output: "minecraft:charcoal"
    },
    "minecraft:wood": {
        output: "minecraft:charcoal"
    },
    "minecraft:chorus_fruit": {
        output: "minecraft:popped_chorus_fruit"
    },
    "minecraft:sea_pickle": {
        output: "minecraft:lime_dye"
    },
}

export { smeltableItems, baseSettings, furnacesSettings, fuels, upgrades }


