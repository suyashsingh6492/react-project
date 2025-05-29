import { Component } from 'react';
import classes from './User.module.css';

class User extends Component {
  //you see user will unmount three times.becuase we used 3 times per user 
  componentWillUnmount() {
    console.log("User will unmount");
  }


  render() {
    return <li className={classes.user}>{this.props.name}</li>;

  }
}



// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
