import React from "react";
import Autobahn from "autobahn";

class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.connection = new Autobahn.Connection({
      url: "ws://testassignment.filmdatabox.com:8104/ws",
      realm: "democontrol",
    });
    this.connection.onopen = this.onOpenConnection;
    this.state = {
      journals: [],
    };
  }
  componentDidMount = () => {
    this.connection.open();
  };
  componentWillUnmount = () => {
    this.connection.close();
  };

  onOpenConnection = (session, details) => {
    session
      .call("com.filmdatabox.democontrol.journal")
      .then((res)=> {
        this.setState({journals:res})
      }, session.log);
  };

  render() {
    const {journals} = this.state;
    return (
      <div>
          <h1>Messages</h1>
        {journals.map((journal,i)=>{
          return(
            <div key={i}>
              
                {journal}
            </div>
          )
        })}
      
      </div>
    );
  }
}

export default Connection;
