import classes from "./style.module.scss";

export function BuyMeACoffee() {
  return (
    <a
      href="https://www.buymeacoffee.com/moandmo"
      target="_blank"
      className={classes.link}
      rel="noreferrer"
    >
      <img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        style={{ width: "100%", height: "auto" }}
      />
    </a>
  );
}
