import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../http/deviceAPI";

const CreateType = ({ show, handleClose }) => {
    const [value, setValue] = useState("");

    const addType = () => {
        createType({ name: value }).then((data) => {
            setValue("");
            handleClose();
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        placeholder="Введите название типа"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addType}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
