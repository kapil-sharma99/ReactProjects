import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css'
import Auxillary from '../../../hoc/Auxillary';
import withClass from '../../../hoc/WithClass';
import AuthContext from '../../../context/auth-context';

class Person extends Component {

  static contextType = AuthContext;

  componentDidMount() {
    this.inputElement.focus();
    console.log(this.context.authenticated);
  }
  render() {
  console.log('[Person.js] rendering...')
  return(
    <Auxillary>
        {this.context.authenticated ? <p>Authenticated</p> : <p>Pelase Login</p>}
      <h4 onClick={this.props.click}>Hi!!! I'm {this.props.name} and my age is {this.props.age}</h4>
      <p>{this.props.children}</p>
      <input type="text" onChange={this.props.changed} ref={(inputEl) => {this.inputElement = inputEl}} value={this.props.name}/>
    </Auxillary>//instead of using Auxillary, we can also use React.fragment which does exactly the same work as Auxillary
    )
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass(Person, classes.Person);