import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      buttonLabel: props.buttonLabel,
      value: '',
    };
  };

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleFocus = event => {
    event.target.select();
  };

  handleSubmit = event => {
    this.props.onSubmit(this.state.value);
    this.toggleForm();
    event.preventDefault();
  };

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  render() {
    if(this.state.showForm) {
      return(
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="label"
            autoFocus
            type="text"
            value={this.state.value}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          />
          <input type="submit" value={this.state.buttonLabel} />
        </form>
      );
    };
    return(
      <button
        className="button button__create"
        onClick={this.toggleForm}
      >{this.state.buttonLabel}</button>
    );
  };
};
