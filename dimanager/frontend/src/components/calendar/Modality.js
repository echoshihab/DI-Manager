import React, { Fragment } from "react";
import { connect } from "react-redux";

const Modality = props => {
  return (
    <Fragment>
      <select
        className="form-control"
        defaultValue={"default"}
        name="modality"
        onChange={props.onChange}
      >
        <option hidden disabled value="default">
          Select Modality
        </option>

        {props.modalities.map(modality => (
          <option key={modality.id} value={modality.modality}>
            {modality.modality}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  modalities: state.modalities.modalities
});

export default connect(mapStateToProps)(Modality);
