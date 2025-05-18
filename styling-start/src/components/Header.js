import logo from "../assets/logo.png";
import { classes } from "./Header.module.css";
import "./Header.css";
export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      {/* <p className={classes.para}>A community of artists and art-lovers.</p> */}
      <p className="paragraph">A community of artists and art-lovers.</p>
    </header>
  );
}
