import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

const Device = () => {
    const device = {
        id: 1,
        name: "Iphone 12 pro",
        price: 25000,
        rating: 5,
        img: "https://cdn1.ozone.ru/s3/multimedia-u/6540785766.jpg",
    };

    const description = [
        {
            id: 1,
            title: "Оперативная память",
            description: "5гб",
        },
        {
            id: 2,
            title: "Камера",
            description: "12 мп",
        },
        {
            id: 3,
            title: "Проуессор",
            description: "Пентиум 3",
        },
        {
            id: 4,
            title: "Количесвто ядер",
            description: "2",
        },
        {
            id: 5,
            title: "Аккумулятор",
            description: "4000",
        },
    ];

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 style={{ textAlign: "center" }}>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ fontSize: 46 }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{
                            width: 300,
                            height: 300,
                            fontSize: 32,
                            border: "5px solid lightgray",
                        }}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button variant="outline-dark">
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {description.map((info, index) => (
                    <Row
                        key={info.id}
                        style={{
                            background:
                                index % 2 === 0 ? "lightgray" : "transparent",
                            padding: 10,
                        }}
                    >
                        {info.title}: {info.description}
                    </Row>
                ))}
            </Row>
        </Container>
    );
};

export default Device;
