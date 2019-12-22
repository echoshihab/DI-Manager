import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { getModalities, getExamTypes } from "../../actions/shifts";

class Modality extends Component {
  state = {
    manageFlag: false
  };

  listTypes = e => {
    this.props.getExamTypes(e.target.value); //types are rendered in calendarform
    this.setState({ manageFlag: true }, function() {
      this.props.onModalitySelect(this.state.manageFlag);
    });
  };

  componentDidMount() {
    this.props.getModalities();
  }

  render() {
    return (
      <Fragment>
        <select
          className="form-control"
          defaultValue={"default"}
          name="modality"
          onChange={this.listTypes}
        >
          <option hidden disabled value="default">
            Select Modality
          </option>

          {this.props.modalities.map(modality => (
            <option key={modality.id} value={modality.id}>
              {modality.modality}
            </option>
          ))}
        </select>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  modalities: state.modalities.modalities
});

export default connect(mapStateToProps, { getModalities, getExamTypes })(
  Modality
);
