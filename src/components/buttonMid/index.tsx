import styles from "./styles.module.scss";

import Button from "@mui/material/Button";

export default function ButtonMid({ text }: { text: string }, { button }: { button: string },) {
    return (
        <Button variant="contained" className={styles.size}>{text}</Button>
    );
}