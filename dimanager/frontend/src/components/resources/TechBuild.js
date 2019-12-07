import React, { Fragment } from "react";
import TechForm from "../techs/TechForm";
import TechList from "../techs/TechList";

export default function TechBuild() {
  return (
    <Fragment>
      <TechForm />
      <TechList />
    </Fragment>
  );
}
