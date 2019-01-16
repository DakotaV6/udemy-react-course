import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    people: [
      { id: 'asdef32', name: 'Max', age: 28 },
      { id: 'akdl29k', name: 'Dakota', age: 25 },
      { id: 'alcidh0', name: 'Kylie', age: 23 }
    ],
    showPeople: false
  }

  switchNameHandler = (newName) => {
    // console.log("Was clicked!");
    // DO NOT DO THIS -- this.state.people[0].name = "Maximilian";
    this.setState({
      people: [
        { name: newName, age: 28 },
        { name: 'Dakota', age: 25 },
        { name: 'Kylie', age: 23 }
      ]
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.people.findIndex(person => {
      return person.id === id;
    });

    const person = {
      ...this.state.people[personIndex]
    };

    person.name = event.target.value;

    const people = [...this.state.people];
    people[personIndex] = person;

    this.setState({ people: people });
  }

  deletePersonHandler = (personIndex) => {
    // const people = this.state.people.slice(); ---- This is also acceptable
    const people = [...this.state.people];
    people.splice(personIndex, 1);
    this.setState({ people: people });
  }

  togglePeopleHandler = () => {
    const doesShow = this.state.showPeople;
    this.setState({ showPeople: !doesShow });
  }

  render() {
    let people = null;
    let btnClass = '';

    if (this.state.showPeople) {
      people = (
        <div>
          {this.state.people.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      btnClass = classes.Red;
    }

    let assignedClasses = [];

    if (this.state.people.length <= 2) {
      assignedClasses.push(classes.red); // assignedClasses = ['red']
    }
    if (this.state.people.length <= 1) {
      assignedClasses.push(classes.bold); // assignedClasses = ['red', 'bold']
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button
          className={btnClass}
          onClick={this.togglePeopleHandler}>Toggle People</button>
        {people}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
