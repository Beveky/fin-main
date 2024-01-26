import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { updateTodo } from "../Redux/todoSlice";

const UpdateTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mytodos } = useSelector((state) => state.todo);

  const specificTodo = mytodos.filter((el) => el._id === id);

  const [task, setTask] = useState(specificTodo[0].task);

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ id, task }));
    navigate("/");
  };
  return (
    <div>
      {specificTodo.map((el) => (
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Task to update</Form.Label>
            <Form.Control
              type="text"
              defaultValue={el.task}
              name="task"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
          <Link to={"/"}>
            <Button variant="primary">Cancel</Button>
          </Link>
        </Form>
      ))}
    </div>
  );
};

export default UpdateTask;
