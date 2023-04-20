import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreateBrand = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder="Введите название типа" />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={handleClose}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;
