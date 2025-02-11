import "./App.css";
import { useSelector, Provider } from "react-redux";
import Auth from "./components/Auth";
import { store } from "./app/store";


function MainContainer() {
  const { isAuthenticate } = useSelector((state) => state.auth);

  if (!isAuthenticate) {
    return (
      <div>
        <h2>Welcome</h2>
        <h2>Do login Signup</h2>
        <Auth/>
      </div>
    );
  }
  return (
    <>
      <h1>mainScreen</h1>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}

export default App;
