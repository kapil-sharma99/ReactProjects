import React, {useContext, useEffect} from 'react';
import classes from './Cockpit.css'
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    //Http request...
    setTimeout(() => {
      alert('saved data to cloud!!');
    }, 1000);
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    }
  }, []) //usually ;useeffect runs after every render cycle, but using the second
                      //argument in useEffect function, i.e. the array which will contains the list 
                      //of all the elements in which the useEffect function will be called...
                      //if you want to make if run only for one time, then pass an empty array...

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    }
  })
  let btnClass = [classes.button];
  if(props.showPersons) {
    btnClass.push(classes.red);
  }
  let Assignedclasses = [];
    if(props.personsLength <= 2)
      Assignedclasses.push(classes.red); //classes = ['red'];
    if(props.personsLength <= 1)
      Assignedclasses.push(classes.bold); // classes = ['red', 'bold'];
  return (
    <div>
      <h1>{props.title}</h1>
      <h2 className={Assignedclasses.join(' ')}>STUDENT INFORMATION!!</h2>
      <button className={btnClass.join(' ')}
        onClick={props.clicked}>
          Toggle Person
      </button>
        <button onClick={authContext.login}>Log in</button>
    </div>
  );
}

export default React.memo(cockpit);