import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = { userData: null }
  }
  loadUserData(){
    //sets userData to null
    this.setState({ userData: null });
    //fetches userData
    this.fetchID = fetchUserData(this.props.username, (userData) => {
  this.setState({ userData });
});
  }
  componentDidMount(){this.loadUserData();}
  compnentWillDismount(){cancelFetch(this.fetchID);}
  componentDidUpdate(prevProps)
  {
    if(this.props.username === prevProps.username){return;}
      cancelFetch(this.fetchID);
      this.loadUserData();
    
}
    render() {
    const isLoading = this.state.userData === null? true : false;
    let className = 'Profile';
    let name = "";
    let bio = "";
    let friends = [];
    if (isLoading) {
      className += ' loading';
      name = "Loading..."; 
      bio = "Loading...";
    }else{
       name = this.state.userData.name;
       bio = this.state.userData.bio;
       friends = this.state.userData.friends;
    }

    return (
      <div className={className}>
        <div className="profile-picture">
        {!isLoading && (<img src={this.state.userData.profilePictureUrl} alt="" />)}
        </div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My Friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}