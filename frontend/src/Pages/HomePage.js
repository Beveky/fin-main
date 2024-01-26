import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../Redux/todoSlice";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const HomePage = ({ mytodos }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      {mytodos?.map((el) => (
        <div>
          <center>
          <Card style={{ width: "50rem" }} bg="success" data-bs-theme="dark">
            
            <Card.Body>
              <Card.Title> {el.task} </Card.Title>
              <Card.Text>Le Malade :      {el.postedBy.name}</Card.Text>
              <Card.Text>Numéro Bulttin de soin :     {el.numero}</Card.Text>
              <Card.Text>Frais Médecin : {el.medecin}</Card.Text>
              <Card.Text>Frais Pharmacie :{el.pharmacie}</Card.Text>
              <Card.Text>Frais Labo :{el.labo}</Card.Text>
              <Card.Text>Montant dépensé : {el.labo+el.pharmacie+el.medecin}</Card.Text>
              <Card.Text>Montant Remboursé : --------------------</Card.Text>
              {userInfo?.role === "admin" ? (
                <>
                  <Button
                    variant="primary"
                    onClick={() => {
                      dispatch(deleteTodo(el._id));
                    }}
                  >
                    Delete
                  </Button>
                  <Link to={`/todo/${el._id}`}>
                    <Button>Edit</Button>
                  </Link>
                </>
              ) : (
                ""
              )}
            
            </Card.Body>
           
          </Card>
          </center>
        </div>
       
      ))}
     
    </div>
    
  );
  
 
};

export default HomePage;
