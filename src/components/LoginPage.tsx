import { TextField } from "@mui/material";
import styles from "../styles/LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.whole}>
      <TextField required id="outlined-required" label="Email address" />
      <TextField required id="outlined-required" label="Password" />
    </div>
  );
}
