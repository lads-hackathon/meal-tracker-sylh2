import { SetStoreFunction, Store } from 'solid-js/store';
import styles from './GroupChip.module.css';

interface GroupChipProps {
    group: string;
    getGroups: Store<string[]>;
    setGroups: SetStoreFunction<string[]>;
}

function remove<T>(arr: T[], el: T): T[] {
    return arr.filter((e, i) => el != e);
}

function toggle(btn: HTMLButtonElement, props: GroupChipProps) {
    btn.classList.toggle(styles.chipToggled);

    if (btn.classList.contains(styles.chipToggled)) {
        props.setGroups([ ...props.getGroups, props.group ]);
    } else {
        props.setGroups(remove(props.getGroups, props.group));
    }
}

export default function GroupChip(props: GroupChipProps) {
    return (
        <button class={styles.chip} onClick={ e => toggle(e.currentTarget, props) }>{props.group}</button>
    )
}