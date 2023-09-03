import { useEffect, useState } from "react";
import "./App.css";

import Api_client, {CanceledError} from "./api_Client_services/Api_client";

interface User {
  id: number;
  name: string;
}
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    Api_client
      .get<User[]>("/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) =>{
    const  originalUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id));

    Api_client
    .delete('/users/' + user.id)
     .catch(err => {
      setError(err.message);
      setUsers(originalUsers);
     })
  }
  const addUser = () => {
    const originalUsers = [...users]
    const newUser = {id:0, name:'Barde'};
    setUsers([newUser, ...users]);

    Api_client
    .post('https://jsonplaceholder.typicode.com/users', newUser)
    .then(({data: savedUser}) => setUsers([savedUser, ...users]))
    .catch(err => {
      setError (err.message);
      setUsers(originalUsers)
    })
    
  };

  const update = (user: User) => {
    const originalUsers = [...users]
    const updatedUser = {...user, name: user.name + '!'};
    setUsers(users.map(u => u.id === user.id ? updatedUser:u));
    Api_client
    .patch('https://jsonplaceholder.typicode.com/users/' + user.id, updatedUser)
    .catch(err =>{
      setError(err.message);
      setUsers( originalUsers);


    })
  }
  return (
    <>
    
    <button className="btn btn-primary" onClick={addUser}>add</button>
      <ul className="list-group">
        {<p className="text-danger">{error}</p>}
        {users.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between py-12 px-10 p-20">
            {user.name}
            <div>
            <button className="btn btn-outline-secondary mx-1" onClick={() => update(user)}>update</button>
            <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
         
            </div>
            </li>
        ))}
        {isLoading && <div className="spinner-border"></div>}
      </ul>
    </>
  );
}
export default App;
