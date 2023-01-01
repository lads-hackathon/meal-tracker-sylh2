import { SetStoreFunction, Store } from 'solid-js/store';
import { BodyInfo } from '../../schemas';
import styles from './InputSection.module.css';

interface InputSectionProps {
    body: Store<BodyInfo>;
    setBodyInfo: SetStoreFunction<BodyInfo>;
}

interface TextInputProps {
    title: string;
    inputType: string;
    placeholderText: string;
}

function TextInput(props: TextInputProps) {
    return (
        <div>
            <h3>{props.title}</h3>
            <input type={props.inputType} placeholder={props.placeholderText}/>
        </div>
    )
}

export default function InputSection(props: InputSectionProps) {

    return (
        <div class={styles.inputGrid}>
            <input class={styles.inputField} type="number" placeholder="Weight" onInput={ e => props.setBodyInfo("weight", parseFloat(e.currentTarget.value)) }/>

            <select class={styles.inputField} onInput={ e => props.setBodyInfo("weightUnit", parseFloat(e.currentTarget.value)) }>
                <option value={0.453592}>Pounds (lbs)</option>
                <option value={1}>Kilograms (kg)</option>
            </select>

            <input class={styles.inputField} type="number" placeholder="Feet" onInput={ e => props.setBodyInfo("feet", parseInt(e.currentTarget.value)) }/>
            <input class={styles.inputField} type="number" placeholder="Inches" onInput={ e => props.setBodyInfo("inches", parseInt(e.currentTarget.value)) }/>

            <input class={styles.inputField} type="number" placeholder="Centimeters (optional)" onInput={ e => props.setBodyInfo("centimeters", parseFloat(e.currentTarget.value)) }/>

            <input class={styles.inputField} type="number" placeholder="Age" onInput={ e => props.setBodyInfo("age", parseFloat(e.currentTarget.value)) }/>

            <select class={styles.inputField} onInput={ e => props.setBodyInfo("gender", e.currentTarget.value) }>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
        </div>
    )
}