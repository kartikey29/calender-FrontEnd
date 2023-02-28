import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../api";

function ModalCus(props) {
  const [show, setShow] = useState(props.confirmDelete.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(props.confirmDelete.show);
  }, [props]);

  const deleteHandler = async () => {
    let getUserData = JSON.parse(localStorage.getItem("userData"));
    try {
      const res = await api.delete(`/event/${props.confirmDelete.id}`, {
        headers: { authorization: `Bearer ${getUserData.token}` },
      });
      console.log(res);
      handleClose();
    } catch (e) {
      console.log(e);
    }
    props.getData();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cofirm do you want to delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            no
          </Button>
          <Button variant="primary" onClick={deleteHandler}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalCus;
