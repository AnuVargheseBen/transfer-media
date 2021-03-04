import React from "react";
import Autobahn from "autobahn";
import Media from "./media";

class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.connection = new Autobahn.Connection({
      url: "ws://testassignment.filmdatabox.com:8104/ws",
      realm: "democontrol",
    });
    this.connection.onopen = this.onOpenConnection;
    this.session = null;
    this.state = {
      journals: [],
      media: [],
    };
  }

  componentDidMount = () => {
    this.connection.open();
  };
  componentWillUnmount = () => {
    this.connection.close();
  };

  onOpenConnection = (session, details) => {
    this.session = session;
    session.call("com.filmdatabox.democontrol.journal").then((res) => {
      this.setState({ journals: res.reverse() });
    }, session.log);

    session.call("com.filmdatabox.democontrol.state").then((res) => {
      console.log("demo", res);
      this.setState({ media: res.media });
    }, session.log);

    session.subscribe("com.filmdatabox.democontrol.journal", (args) => {
      this.setState({ journals: [...args.reverse(), ...this.state.journals] });
    });

    session.subscribe("com.filmdatabox.democontrol.state", (args) => {
      this.setState({
        media: args[0].media
      });
    });
  };

  handleUpdateMedia = (name,attach) => {
    this.session.call("com.filmdatabox.democontrol.change_medium",[name,attach]);
  };

  render() {
    const { journals, media } = this.state;

    return (
      <div>
        <Media media={media} onUpdate={this.handleUpdateMedia} />
        <h1>Messages</h1>
        {journals.map((journal, i) => {
          return <div key={i}>{journal}</div>;
        })}
      </div>
    );
  }
}

export default Journal;
