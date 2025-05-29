import { useState, Component } from 'react';
import User from './User';

import classes from './Users.module.css';

 
class Users extends Component {
  constructor() {
    super();
    //init state here 
    // this.state={}; //always an object namd must be state 
    this.state = {
      showUsers: true,
      more: 'Test'
    };

  }
  toggleUsersHandler() {
    //this.setState({ showUsers: false });
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });

  };



  componentDidUpdate(){
    if(this.props.users.length===0){
      throw new Error('No User Provided');
    }
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
    //this.toggleUsersHandler.bind(this) : this method here (last one)
    //is now set to have the same context or the same value
    //as this keyword when this code is evaluated and here that this keyword will refer to this class.
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>

          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
