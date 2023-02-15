import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SlLogout } from 'react-icons/sl';
import { CustomContext } from '../context/AuthContext';

export default function ConfirmModal(props) {

  const context = CustomContext();

  const [show, setShow] = useState(false);

  return (
    <>
      <span variant="primary" className='p-2 flex-center gap-1' onClick={() => setShow(true)}>
        {props.name}
        {props.icon}
      </span>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          {
            //For deleting post only
            props.postId ? (
              <Button variant="secondary" onClick={() => {
                props.action(props.postId);
                setShow(false);
              }}>
                YES
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => {
                props.action();
                setShow(false);
              }}>
                YES
              </Button>
            )
          }
          <Button variant="success" onClick={() => setShow(false)}>
            NO
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}