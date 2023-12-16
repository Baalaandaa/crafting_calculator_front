import {Item} from "../../services/jsonPlaceholder";
import styles from "./styles.module.scss";
import ItemIcon from "../ItemIcon";
import {memo, useState} from "react";

interface Props {
    items: Item[];
    item: Item;
    setItem: (item: Item) => void;
};

const ItemSelector = ({items, item, setItem}: Props) => {
    const [opened, setOpened] = useState(false);
    if (!item) {
        setItem(items[0]);
    }
    return (
        <div>
            <div className={styles.ItemSelector} onClick={(e) => {
                setOpened(true);
                e.stopPropagation();
            }}>
                <ItemIcon item={item} />
            </div>
            { opened && <div className={styles.ItemSelectorPopupBackground} onClick={(e) => {
                setOpened(false);
                e.stopPropagation();
            }}>
                <div className={styles.ItemSelectorPopup} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.ItemSelectorGrid}>
                        {items?.filter((item: Item) => {
                            return item.recipes;
                        }).map((item: Item) => {
                            return (
                                <ItemIcon item={item} onClick={() => {
                                    setItem(item);
                                    setOpened(false);
                                }}/>
                            )
                        })}
                    </div>
                </div>
            </div> }
        </div>
    );
}

export default memo(ItemSelector);
