import { Fragment, useState, useEffect, Component } from 'react';

import Users from './components/Users';
import classes from './UserFinder.module.css';
import UsersContext from './store/users-context';
import ErrorBoundary from './components/ErrorBoundary.js'
const DUMMY_USERS = [
    { id: 'u1', name: 'Max' },
    { id: 'u2', name: 'Manuel' },
    { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component {
    //connect with single context 
    static contextType = UsersContext
    constructor() {
        super();
        this.state = {
            filteredUsers: DUMMY_USERS,
            searchTerm: ''
        }
    }

    //first time call did mount will only run once when the component initially was rendered for the first time.
    //equivalent to use effect with no dependencies
    componentDidMount() {
        //send http request 
        // this.setState({filteredUsers:DUMMY_USERS})
        this.setState({ filteredUsers: this.context.users })

    }
    componentDidUpdate(prevProps, prevState) { //if state change it will execute again and again 
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({
                filteredUsers: this.context.users.filter((user) => user.name.includes(this.state.searchTerm))
            })

        }


    }


    searchChangeHandler(event) {
        this.setState({ searchTerm: event.target.value })
    }

    render() {
        return (
            <Fragment>
                <div className={classes.finder}>
                    <input type='search' onChange={this.searchChangeHandler.bind(this)} />
                </div>
                <ErrorBoundary>
                <Users users={this.state.filteredUsers} />

                </ErrorBoundary>
            </Fragment>
        );
    }
}

// const UserFinder = () => {
//     const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         setFilteredUsers(
//             DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//         );
//     }, [searchTerm]);

//     const searchChangeHandler = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return (
//         <Fragment>
//             <div className={classes.finder}>
//                 <input type='search' onChange={searchChangeHandler} />
//             </div>
//             <Users users={filteredUsers} />
//         </Fragment>
//     );
// };

export default UserFinder;