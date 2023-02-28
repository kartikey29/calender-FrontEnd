import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../api";
import Form from "../Form/Form";

function EditModal(props) {
  const [show, setShow] = useState(props.confirmEdit.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(props.confirmEdit.show);
  }, [props]);

  // const submitHandler = async () => {
  //   let getUserData = JSON.parse(localStorage.getItem("userData"));
  //   try {
  //     const res = await api.patch(`/event/${props.confirmEdit.id}`, {
  //       headers: { authorization: `Bearer ${getUserData.token}` },
  //     });
  //     console.log(res);
  //     handleClose();
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   props.getData();
  // };

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
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            no
          </Button>
          {/* <Button variant="primary" onClick={submitHandler}>
            yes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default EditModal;
