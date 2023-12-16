import {memo, MouseEventHandler} from "react";

import styles from "./styles.module.scss";
import {Item} from "../../services/jsonPlaceholder";
import water from "../../static/water.png";
import iron_ore from "../../static/Iron_ore.png";
import iron_plate from "../../static/Iron_plate.png";
import stone_furnace from "../../static/stone_furnace.png";
import assembling_machine from "../../static/assembling_machine_1.png";
import electric_mining_drill from "../../static/electric_mining_drill.png";
import belt from "../../static/belt.png";
import pipe from "../../static/pipe.png";
import offshore_pump from "../../static/offshore_pump.png";

interface Props {
    item?: Item;
    onClick?: MouseEventHandler<HTMLDivElement>;
};

const icon = new Map<number, any>([
    [1, water],
    [2, pipe],
    [3, offshore_pump],
    [4, iron_ore],
    [5, iron_plate],
    [6, stone_furnace],
    [7, assembling_machine],
    [8, belt],
    [9, electric_mining_drill],
]);

// @ts-ignore
const ItemIcon = ({item, onClick}: Props) => {
    if (!item) {
        return (<div />)
    }
    // console.log(icon);
    return (
        <div className={styles.ItemIcon} onClick={onClick}>
            {icon.has(item.item_id) ? <img src={icon.get(item.item_id)} alt={item.item_name}/> :
                <span>{item.item_name}</span>}
        </div>
    );
}

export default memo(ItemIcon);
