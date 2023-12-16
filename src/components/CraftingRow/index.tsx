import {memo} from "react";

import styles from "./styles.module.scss";
import {Item, Recipe} from "../../services/jsonPlaceholder";
import ItemIcon from "../ItemIcon";


interface Props {
    itemsById: Map<number, Item>;
    recipe: Recipe;
    ratio: number;
    header?: boolean
}
const CraftingRow = ({ratio, itemsById, recipe} : Props) => {
    let belt_id = null;
    switch (recipe.belt_name) {
        case "pipes":
            belt_id = 2;
            break;
        case "belt":
            belt_id = 8;
            break;
    }
    let factory_id = null;
    switch (recipe.factory_name) {
        case "offshore pump":
            factory_id = 3;
            break;
        case "stone furnace":
            factory_id = 6;
            break;
        case "assembling machine 1":
            factory_id = 7;
            break;
        case "electric mining drill":
            factory_id = 9;
            break;
    }
    return (
        <div className={styles.CraftingRow}>
            <div className={styles.Block}>
                <ItemIcon item={itemsById.get(recipe.item_id)} />
                x {Math.floor(ratio * recipe.production_factory*10)/10}
            </div>

            <div className={styles.Block}>
                <ItemIcon item={itemsById.get(belt_id as number)} />
                x {Math.ceil(ratio * recipe.production_factory / recipe.belt_quantity * 100) / 100}
            </div>

            <div className={styles.Block}>
                <ItemIcon item={itemsById.get(factory_id as number)} />
                x {Math.ceil(ratio * 60 * 100) / 100}
            </div>

        </div>
    )
};


const CraftingRowHeader = () => {
    return (
        <div className={styles.CraftingRow}>
            <div className={styles.Block}>
                <span>Items/sec</span>
            </div>

            <div className={styles.Block}>
                <span>Belts</span>
            </div>

            <div className={styles.Block}>
                <span>Factories</span>
            </div>

        </div>
    )
};



export default memo(CraftingRow);
export { CraftingRowHeader };
