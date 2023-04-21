import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";

export default function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <h1>{props.title}</h1>
      <img
        src={props.image}
        alt="image not found :("
        className={classes.detail_image}
      ></img>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}
