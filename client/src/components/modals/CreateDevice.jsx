import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({ show, handleClose }) => {
    const { device } = useContext(Context);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data));
        fetchBrands().then((data) => device.setBrands(data));
    }, [device]);

    const addInfo = () => {
        setInfo([...info, { title: "", description: "", number: Date.now() }]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter((item) => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(
            info.map((item) =>
                item.number === number ? { ...item, [key]: value } : item
            )
        );
    };

    const selectFile = (event) => {
        setFile(event.target.files[0]);
    };

    const addDevice = () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("price", `${price}`);
        formData.append("img", file);
        formData.append("brandId", device._selectedBrand.id);
        formData.append("typeId", device._selectedType.id);
        formData.append("info", JSON.stringify(info));

        createDevice(formData).then((data) => handleClose());
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить устройство</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {device.selectedType.name || "Выберите тип"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map((type) => (
                                <Dropdown.Item
                                    onClick={() => {
                                        device.setSelectedType(type);
                                    }}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {device.selectedBrand.name || "Выберите бренд"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand) => (
                                <Dropdown.Item
                                    onClick={() => {
                                        device.setSelectedBrand(brand);
                                    }}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Введите название устрйства"
                        className="mt-3"
                    ></Form.Control>
                    <Form.Control
                        value={price}
                        onChange={(event) =>
                            setPrice(Number(event.target.value))
                        }
                        placeholder="Введите стоимость устрйства"
                        className="mt-3"
                        type="number"
                    ></Form.Control>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    ></Form.Control>
                    <hr />
                    <Button variant={"outline-dark"} onClick={addInfo}>
                        Добавить новое свойство
                    </Button>
                    {info.map((item) => (
                        <Row className="mt-4" key={item.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={item.title}
                                    onChange={(event) =>
                                        changeInfo(
                                            "title",
                                            event.target.value,
                                            item.number
                                        )
                                    }
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Введите описание свойства"
                                    value={item.description}
                                    onChange={(event) =>
                                        changeInfo(
                                            "description",
                                            event.target.value,
                                            item.number
                                        )
                                    }
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() => removeInfo(item.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addDevice}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
