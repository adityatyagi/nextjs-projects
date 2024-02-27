import React from "react";
import { User } from "./users.type";

const UsersPage = async () => {
  // this is a RSC component and we can use fetch() to fetch data
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const data: User[] = await response.json();

  return (
    <div>
      {/* when this page was rendered */}
      {/* the time will be updated on every refresh in development mode but will not update in prod mode. */}
      <p>{new Date().toLocaleTimeString()}</p>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
