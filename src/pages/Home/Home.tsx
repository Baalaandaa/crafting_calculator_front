import {FC, useEffect, memo, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {Helmet} from "react-helmet";

import {AppState, AppThunk} from "../../store";
import styles from "./styles.module.scss";
import CraftingRow, {CraftingRowHeader} from "../../components/CraftingRow";
import {fetchItemListIfNeed} from "../../store/itemList";
import ItemSelector from "../../components/ItemSelector";
import {Item, Recipe} from "../../services/jsonPlaceholder";

export type Props = RouteComponentProps;

const Home: FC<Props> = (): JSX.Element => {
    const dispatch = useDispatch();
    const {readyStatus, items} = useSelector(
        ({itemList}: AppState) => itemList,
        shallowEqual
    );

    // Fetch client-side data here
    useEffect(() => {
        dispatch(fetchItemListIfNeed());
    }, [dispatch]);

    // @ts-ignore
    const renderList = () => {
        if (!readyStatus || readyStatus === "invalid" || readyStatus === "request")
            return <p>Loading...</p>;

        if (readyStatus === "failure") return <p>Oops, Failed to load list!</p>;

        // return <List items={items} />;
    };

    if (!items) {
        return <div>
            Loading...
        </div>
    }
    let itemsById: Map<number, Item> = new Map<number, Item>();
    items.forEach(e => {
        itemsById.set(e.item_id, e);
    })
    const [item, setItem] = useState(items[0]);
    const [targetQty, setTargetQty] = useState(1);

    console.log(item);
    const itemCount = new Map<number, number>();
    let queue = [{recipe: item.recipes[0], qty: targetQty}];
    while (queue.length > 0) {
        const {recipe, qty} = queue.shift() as { qty: number; recipe: Recipe };
        if (itemCount.has(recipe.item_id)) {
            itemCount.set(recipe.item_id, itemCount.get(recipe.item_id) as number + qty);
        } else {
            itemCount.set(recipe.item_id, qty);
        }
        if (recipe.input_items) {
            recipe.input_items.forEach(e => {
                const newItem: Item = itemsById.get(e.id) as Item;
                const newQty = qty * e.quantity;
                if (newItem.recipes) {
                    queue.push({
                        recipe: newItem.recipes[0],
                        qty: newQty,
                    })
                }
            })
        }
    }
    console.log(itemCount);
    const craftingRows: any[] = [];
    itemCount.forEach((v, k) => {
        if (!(itemsById.get(k) as Item).recipes) {
            return;
        }
        console.log("!!!", k, (itemsById.get(k) as Item).recipes[0]);
        craftingRows.push({recipe: (itemsById.get(k) as Item).recipes[0], qty: v});
    })

    return (
        <div className={styles.Home}>
            <Helmet title="Home"/>
            <div className={styles.Controls}>
                <div className={styles.SelectItemBlock}>
                    <span className={styles.SelectItemSpan}>Select item:</span>
                    <ItemSelector items={items} item={item} setItem={setItem}/>
                </div>
                <div className={styles.SelectQtyBlock}>
                    <span className={styles.SelectQtySpan}>Items/sec:</span>
                    <input value={targetQty} onChange={(e) => {
                        if (e.target.value == '') {
                            setTargetQty(0);
                        } else if (!isNaN(parseInt(e.target.value))) {
                            setTargetQty(parseInt(e.target.value));
                        }
                    }}/>
                </div>
            </div>
            <hr />
            <CraftingRowHeader />
            {item && craftingRows.map(({recipe, qty}) => {
                const ratio = recipe.production_factory;
                return (
                    <CraftingRow recipe={recipe} itemsById={itemsById} ratio={qty / ratio}/>
                )
            })}
        </div>
    );
};

// Fetch server-side data here
export const loadData = (): AppThunk[] => [
    fetchItemListIfNeed(),
    // More pre-fetched actions...
];

export default memo(Home);
