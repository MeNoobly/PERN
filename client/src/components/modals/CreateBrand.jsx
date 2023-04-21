import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createBrand } from "../../http/deviceAPI";

const CreateBrand = ({ show, handleClose }) => {
    const [value, setValue] = useState("");

    const addBrand = () => {
        createBrand({ name: value }).then((data) => {
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
                        placeholder="Введите название типа"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addBrand}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;
