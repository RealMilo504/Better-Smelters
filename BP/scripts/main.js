import { world, system, ItemStack } from '@minecraft/server'
import { smeltableItems, baseSettings, furnacesSettings, fuels, upgrades } from './settings.js'

const { baseCost, baseSpeed } = baseSettings

function msg(str) {
    world.sendMessage(`${str}`)
}

function randomInterval(min, max) {
    return Math.random() * (max - min) + min;
}

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('better_smelters:furnace', {
        onPlace(e) {
            const { block } = e
            let { x, y, z } = block.location
            y += 0.250, x += 0.5, z += 0.5
            const entity = block.dimension.spawnEntity('better_smelters:furnace', { x, y, z })
            const inv = entity.getComponent('minecraft:inventory')?.container;
            entity.nameTag = 'Better Smelters'

            entity.addTag('twm_container')
            inv.setItem(0, new ItemStack('better_smelters:flame_0', 1))
            inv.setItem(1, new ItemStack('better_smelters:arrow_right_0', 1))

            entity.setDynamicProperty('better_smelters:fuelR', 0)
            entity.setDynamicProperty('better_smelters:fuelV', 0)
            entity.setDynamicProperty('better_smelters:progress', 0)
        },
        onTick(e) {
            const { block } = e;
            let { x, y, z } = block.location;
            [x, y, z] = [x + 0.5, y + 0.25, z + 0.5];

            // If by any chance the script is executed when you break the machine, returns to avoid errors
            if (block?.typeId == 'minecraft:air') return;

            const furnaceType = furnacesSettings[block.typeId]

            // Entity of the machine
            const entity = block.dimension.getEntities({ families: ['furnace'], maxDistance: 0.3, location: { x, y, z } })[0];
            if (!entity) return;

            // Ouput slot
            const inv = entity.getComponent('minecraft:inventory')?.container;
            let outputSlot = inv.getItem(4);

            // Item to Process
            let item = inv?.getItem(3);
            const itemToSmelt = smeltableItems[item?.typeId]

            let itemFuelSlot = inv.getItem(2)

            let progress = entity.getDynamicProperty('better_smelters:progress') || 0
            let fuelV = entity.getDynamicProperty('better_smelters:fuelV') || 0
            let fuelR = entity.getDynamicProperty('better_smelters:fuelR') || 0

            // Speed Formule
            let speed = 2.5 * baseSpeed * furnaceType.speed

            const facingOff = {
                north: [1, 0, 0],
                south: [-1, 0, 0],
                west: [0, 0, -1],
                east: [0, 0, 1]
            };
            const facing = facingOff[block.permutation.getState('minecraft:cardinal_direction')];

            [x, y, z] = [x + facing[0], y + facing[1], z + facing[2]];
            const inputBlock = block.dimension.getBlock({ x, y, z })

            if (inputBlock && (item?.amount < 64 || !item)) {
                const inputContainer = inputBlock.getComponent('minecraft:inventory')?.container
                if (inputContainer) {
                    for (let i = 0; i < inputContainer.size; i++) {
                        let inputItem = inputContainer.getItem(i)
                        if (!inputItem) continue
                        if (inputItem.typeId != item?.typeId && item) continue
                        if (!item) {
                            inputContainer.moveItem(i, 3, inv)
                            break
                        }
                        const amount = Math.min(inputItem.amount, 64 - item.amount)
                        inputItem.amount > amount ? inputItem.amount -= amount : inputItem = undefined;
                        item.amount += amount
                        inputContainer.setItem(i, inputItem)
                        inv.setItem(3, item)
                        break
                    }
                }
            }

            const fuelBlock = block.above(1)

            if (fuelBlock && (itemFuelSlot?.amount < 64 || !itemFuelSlot)) {
                const fuelContainer = fuelBlock.getComponent('minecraft:inventory')?.container
                if (fuelContainer) {
                    for (let i = 0; i < fuelContainer.size; i++) {
                        let fuelItem = fuelContainer.getItem(i)
                        if (!fuelItem) continue
                        if (fuelItem.typeId != itemFuelSlot?.typeId && itemFuelSlot) continue
                        if (!itemFuelSlot) {
                            fuelContainer.moveItem(i, 2, inv)
                            break
                        }
                        const amount = Math.min(fuelItem.amount, 64 - itemFuelSlot.amount)
                        fuelItem.amount > amount ? fuelItem.amount -= amount : fuelItem = undefined;
                        itemFuelSlot.amount += amount
                        fuelContainer.setItem(i, fuelItem)
                        inv.setItem(2, itemFuelSlot)
                        break
                    }
                }
            }

            [x, y, z] = [x - 2 * facing[0], y - 2 * facing[1], z - 2 * facing[2]];
            const outputBlock = block.dimension.getBlock({ x, y, z })
            if (outputBlock) {
                const outputContainer = outputBlock.getComponent('minecraft:inventory')?.container
                if (outputContainer && outputContainer?.emptySlotsCount > 0) {
                    inv.transferItem(4, outputContainer)
                }
            }



            if (!itemToSmelt || outputSlot?.amount >= 64) {
                inv.setItem(1, new ItemStack('better_smelters:arrow_right_0', 1))
                entity.setDynamicProperty('better_smelters:progress', 0)
                block?.setPermutation(block?.permutation.withState('better_smelters:on', false))
                return;
            }

            if (outputSlot?.typeId != itemToSmelt.output && outputSlot) {
                inv.setItem(1, new ItemStack('better_smelters:arrow_right_0', 1))
                entity.setDynamicProperty('better_smelters:progress', 0)
                block?.setPermutation(block?.permutation.withState('better_smelters:on', false))
                return;
            }

            if (fuelR == 0) {
                entity.setDynamicProperty('better_smelters:fuelR', 0)
                inv.setItem(0, new ItemStack('better_smelters:flame_0', 1))
                if (itemFuelSlot) {
                    const fuelItem = fuels.find(fuel => itemFuelSlot.typeId.includes(fuel.id))
                    if (fuelItem) {
                        speed = Math.min(fuelItem.fuel * 100, speed)
                        fuelR = fuelItem.fuel * 100
                        itemFuelSlot.amount > 1 ? itemFuelSlot.amount -= 1 : itemFuelSlot = undefined;
                        inv.setItem(2, itemFuelSlot);
                        if (fuelItem.transformToItem) inv.setItem(2, new ItemStack(fuelItem.transformToItem, 1))
                        entity.setDynamicProperty('better_smelters:fuelV', fuelItem.fuel * 100)
                    } else {
                        block?.setPermutation(block?.permutation.withState('better_smelters:on', false))
                        return
                    }
                } else {
                    block?.setPermutation(block?.permutation.withState('better_smelters:on', false))
                    return
                }
            }

            // Facing direction
            if (Math.random() > 0.9) {
                [x, y, z] = [x + facing[0], y + facing[1], z + facing[2]]
                const facingOffsets = {
                    north: [-0.25 + randomInterval(0, 0.50), randomInterval(0, 0.25), -0.55 + randomInterval(0, 0.1)],
                    south: [-0.25 + randomInterval(0, 0.50), randomInterval(0, 0.25), 0.55 + randomInterval(0, 0.1)],
                    west: [-0.55 + randomInterval(0, 0.1), randomInterval(0, 0.25), -0.25 + randomInterval(0, 0.50)],
                    east: [0.55 + randomInterval(0, 0.1), randomInterval(0, 0.25), -0.25 + randomInterval(0, 0.50)]
                };
                const facingP = facingOffsets[block.permutation.getState('minecraft:cardinal_direction')];
                if (facingP) {
                    [x, y, z] = [x + facingP[0], y + facingP[1], z + facingP[2]];
                }
                block.dimension.spawnParticle('minecraft:basic_flame_particle', { x, y, z })
                block.dimension.spawnParticle('minecraft:basic_smoke_particle', { x, y: y + 0.1, z })
            }

            // Display fuel
            let fuelRValue = Math.max(0, Math.min(13, Math.ceil(13 * fuelR / fuelV))) || 0
            entity.setDynamicProperty('better_smelters:fuelR', fuelR)
            inv.setItem(0, new ItemStack(`better_smelters:flame_${fuelRValue}`));


            if (progress >= baseCost) {
                let progressCount = Math.min(item.amount, Math.floor(progress / baseCost))
                if (outputSlot) {
                    if (block.typeId == 'better_smelters:nether_star_furnace') progressCount = Math.min(item.amount, 64 - outputSlot.amount)
                    outputSlot.amount += progressCount
                    inv.setItem(4, outputSlot)
                } else {
                    if (block.typeId == 'better_smelters:nether_star_furnace') progressCount = item.amount
                    inv.setItem(4, new ItemStack(itemToSmelt.output, progressCount));
                }
                progress -= progressCount * baseCost;
                item.amount > progressCount ? item.amount -= progressCount : item = undefined;
                inv.setItem(3, item);
            } else {
                let usedFuel = speed * furnaceType.efficiency
                if (usedFuel > fuelR) { usedFuel = fuelR }
                progress += usedFuel / furnaceType.efficiency;
                fuelR -= usedFuel;
            }

            // Display progress
            let progressValue = Math.max(0, Math.min(16, Math.ceil(16 * progress / baseCost)));
            inv.setItem(1, new ItemStack(`better_smelters:arrow_right_${progressValue}`));

            block?.setPermutation(block?.permutation.withState('better_smelters:on', true))
            entity.setDynamicProperty('better_smelters:progress', progress)

            if (block.typeId == 'better_smelters:oak_wood_furnace' && Math.random() > 0.99) {
                block.setType('air')
                if (inv.getItem(2)) block.dimension.spawnItem(inv.getItem(2), { x, y, z })
                if (inv.getItem(3)) block.dimension.spawnItem(inv.getItem(3), { x, y, z })
                if (inv.getItem(4)) block.dimension.spawnItem(inv.getItem(4), { x, y, z })
                entity.remove()
            }
        },
        onPlayerDestroy(e) {
            const { block, player } = e
            let { x, y, z } = block.location
            x += 0.5, z += 0.5, y += 0.250
            const entity = block.dimension.getEntities({ families: ['furnace'], maxDistance: 0.3, location: { x, y, z } })[0]
            if (!entity) return
            const inv = entity.getComponent('minecraft:inventory').container

            system.run(() => {
                if (inv.getItem(2)) block.dimension.spawnItem(inv.getItem(2), { x, y, z })
                if (inv.getItem(3)) block.dimension.spawnItem(inv.getItem(3), { x, y, z })
                if (inv.getItem(4)) block.dimension.spawnItem(inv.getItem(4), { x, y, z })
                entity.remove()
            });
        }, onPlayerInteract(e) { }
    })
})

world.afterEvents.playerInteractWithBlock.subscribe(e => {
    const { block, itemStack } = e

    if (!itemStack) return
    if (!block.typeId.includes('furnace')) return
    const upgrade = upgrades[itemStack.typeId]
    if (!upgrade) return

    if (block.typeId != upgrade.initialF) return

    const direction = block.permutation.getState('minecraft:cardinal_direction')

    if (itemStack.typeId == 'better_smelters:upgrade_to_copper' || itemStack.typeId == 'better_smelters:upgrade_to_iron') {
        const furnace = block.getComponent('minecraft:inventory').container
        let { x, y, z } = block.location
        y += 0.250, x += 0.5, z += 0.5

        const entity = block.dimension.spawnEntity('better_smelters:furnace', { x, y, z })
        const inv = entity.getComponent('minecraft:inventory')?.container;
        entity.nameTag = 'Better Smelters'

        entity.addTag('twm_container')
        inv.setItem(0, new ItemStack('better_smelters:flame_0', 1))
        inv.setItem(1, new ItemStack('better_smelters:arrow_right_0', 1))
        furnace.moveItem(1, 2, inv)
        furnace.moveItem(0, 3, inv)
        furnace.moveItem(2, 4, inv)

        entity.setDynamicProperty('better_smelters:fuelR', 0)
        entity.setDynamicProperty('better_smelters:fuelV', 0)
        entity.setDynamicProperty('better_smelters:progress', 0)
    }

    block.setType(upgrade.nextF)
    block.setPermutation(block.permutation.withState('minecraft:cardinal_direction',
        `${direction}`))
})
