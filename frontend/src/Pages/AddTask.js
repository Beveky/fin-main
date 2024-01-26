import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../Redux/todoSlice";

const AddTask = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [numeroBulletin, setNumeroBulletin] = useState("");
  const [fraisMedecin, setFraisMedecin] = useState("");
  const [fraisPharmacie, setFraisPharmacie] = useState("");
  const [fraisLabo, setFraisLabo] = useState("");

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.userInfo !== null);
  const authToken = useSelector((state) => state.auth.userInfo?.token);

  const AddHandler = (e) => {
    e.preventDefault();
    const token = "abcde";
    console.log("Token:", token);
    if (!isAuthenticated) {
      console.error("User is not authenticated.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };

    const payload = {
      numeroBulletin,
      fraisMedecin,
      fraisPharmacie,
      fraisLabo,
    };

    dispatch(createTodo(payload, headers)); // Pass headers to the action

    setNumeroBulletin("");
    setFraisMedecin("");
    setFraisPharmacie("");
    setFraisLabo("");
    handleClose();
  };
  return (
    <div>
      <Button variant="warning" onClick={handleShow}>
        Add Bulttin
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Bulltin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Numéro Bulttin</Form.Label>
              <Form.Control
                value={numeroBulletin}
                type="text"
                name="title"
                placeholder="Enter Numéro Bulttin"
                onChange={(e) => setNumeroBulletin(e.target.value)}
              />

              <Form.Text className="text-muted">
                We should be enter numéro Bulltin.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Frais Médecin</Form.Label>
              <Form.Control
                value={fraisMedecin}
                type="text"
                name="description"
                placeholder="Frais Médecin"
                onChange={(e) => setFraisMedecin(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPasswor">
              <Form.Label>Frais Pharmacie</Form.Label>
              <Form.Control
                value={fraisPharmacie}
                name="postUrl"
                placeholder="Frais Pharmacie"
                onChange={(e) => setFraisPharmacie(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPasswor">
              <Form.Label>Frais Labo</Form.Label>
              <Form.Control
                value={fraisLabo}
                name="Frais labo"
                placeholder="Frais Labo"
                onChange={(e) => setFraisLabo(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={AddHandler}>
            Save Bulltin
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTask;
