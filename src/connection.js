import React from "react";
import Autobahn from "autobahn";

class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: {},
    };
  }

  render() {
    var connection = new Autobahn.Connection({
      url: "ws://testassignment.filmdatabox.com:8104/ws",
      realm: "democontrol",
    });
    console.log("connect", connection);

    connection.open();
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default Connection;
