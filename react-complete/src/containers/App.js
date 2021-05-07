import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Aux from '../hoc/Auxillary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] Constructor');
  }
  state = {
    persons: [
      {id: 'sdafka2', name: "Kapil Sharma", age: 19},
      {id: 'dsaf4q2', name: "Pushpam Sinha", age: 20},
      {id: 'sdfq43f', name: "Abhishek Raj Jhant", age: 21},
    ],
    otherState: 'Some other Values',
    showCockpit: true,
    showPersons: false,
    changeCounter: 0,
    authenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');  
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons;
    //const persons = this.state.persons.slice(); 1 WAY TO COPY ALL THE ELEMENTS OF ARRAY IN TO NEW VARLIABLE
    const persons = [...this.state.persons] //2nd WAY TO COPY THE ELEMEMTS AND STORE THEM INTO NEW CONST
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    //const person = Object.assign({}, this.state.persons[personIndex]); ALTERNATIVE APPROACH

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter+1
      }
    })
  }

  render() {
    console.log('[App.js] rendering...');
    let persons = null;
    if(this.state.showPersons) {
      persons = (
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}
          />
      );
    }
    return (
      //<StyleRoot>
        <Aux>
          <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
          <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
            {this.state.showCockpit ? <Cockpit 
              login={this.loginHandler}
              title={this.props.title}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonHandler}
              /> : null}
            {persons}
          </AuthContext.Provider>
      </Aux>
      //</StyleRoot> we need to use this higher order component to wrap the main component for using media query
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React Application!!'));
  }
}

export default withClass(App, classes.App);
//export default Radium(App); We need to use this syntax if we use radium