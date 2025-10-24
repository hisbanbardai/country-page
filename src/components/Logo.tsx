import { Link } from "react-router";
import logo from "../assets/Logo.svg";

export default function Logo() {
  return (
    <Link to={"/"}>
      <img
        className="absolute top-20 md:top-35 left-1/2 transform -translate-x-1/2 w-56"
        src={logo}
        alt="Logo image"
      />
    </Link>
  );
}
