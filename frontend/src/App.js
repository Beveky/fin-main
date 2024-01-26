import { useEffect } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import { getTodos } from "./Redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import AddTask from "./Pages/AddTask";
// import Header2 from "./Components/Header2";


function App() {
  const dispatch = useDispatch();

  const { mytodos } = useSelector((state) => state.todo);
  const { loading } = useSelector((state) => state.todo);
  const { createdTodo } = useSelector((state) => state.todo);
  const { deletedTodo } = useSelector((state) => state.todo);
  const { updatedTodo } = useSelector((state) => state.todo);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch, createdTodo, deletedTodo, updatedTodo]);
  return (
    <div className="App">
      {/* <Header2 /> */}
      <AddTask />
    
      <br />
      <br />
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <HomePage
          mytodos={
            userInfo?.role === "admin"
              ? mytodos
              : mytodos?.filter((el) => el.postedBy._id === userInfo?._id)
          }
        />
      )}
    </div>
  );
}

export default App;
