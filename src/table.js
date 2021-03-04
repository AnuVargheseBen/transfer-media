import React from "react";

function Table({ media }) {
  return (
    <table>
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
            </tr>
          );
        })}

 
      </tbody>
    </table>
  );
}

export default Table;
