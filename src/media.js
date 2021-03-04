import React from "react";
import "./media.css";

function Media({ media }) {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Label</th>
          <th>is_attached</th>
          <th>name</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>
        {media.map((state, i) => {
          return (
            <tr key={i}>
              <td>{state.label}</td>
              <td>{state.is_attached}</td>
              <td>{state.name}</td>
              <td>{state.description}</td>
              <td>
                <button>Trigger</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Media;
