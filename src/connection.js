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
      connection: {},
    };
  }
  componentDidMount = () => {
    this.connection.open();
  };
  componentWillUnmount = () => {
    this.connection.close();
  };

  onOpenConnection = (session, details) => {
    var add2 = function (args) {
      console.log(args);
      return args[0] + args[1];
    };
    session.register("com.filmdatabox.democontrol.journal", add2);

    session
      .call("com.filmdatabox.democontrol.journal")
      .then(function showSum(res) {
        console.log("sum is", res);
      }, session.log);
  };

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default Connection;
