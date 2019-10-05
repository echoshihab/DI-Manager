import React, { Fragment } from "react";
import TechForm from "./TechForm";
import TechList from "./TechList";

export default function Dashboard() {
  return (
    <Fragment>
      <TechForm />
      <TechList />
    </Fragment>
  );
}
