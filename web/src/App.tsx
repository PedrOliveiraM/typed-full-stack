import { CreateUser } from "./CreateUser";
import { useGetUsers } from "./http/generated/users/users";

function App() {
  const { data: users } = useGetUsers();

  return (
    <div>
      <ul>
        {users?.data.map((users) => (
          <li key={users.name}>{users.name}</li>
        ))}
      </ul>

      <CreateUser />
    </div>
  );
}

export default App;
