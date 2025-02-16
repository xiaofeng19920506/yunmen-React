import { useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store/store";

const App = () => {
  const { email } = useAppSelector((state: RootState) => state.user);

  console.log(email);
  return (
    <div className="App">
      <h1>Welcome to Vite + React</h1>
      <p>
        Edit <code>{email}</code> and save to test HMR (Hot Module Replacement).
      </p>
    </div>
  );
};

export default App;
