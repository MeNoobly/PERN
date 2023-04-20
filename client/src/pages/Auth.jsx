import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { NavLink, useLocation } from "react-router-dom";

const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">
                    {isLogin ? "Авторизация" : "Регистрация"}
                </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 10,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            {isLogin ? (
                                <span>
                                    Нет аккаунта?
                                    <span style={{ marginLeft: 10 }}>
                                        <NavLink to={REGISTRATION_ROUTE}>
                                            Зарегестрируйтесь!
                                        </NavLink>
                                    </span>
                                </span>
                            ) : (
                                <span>
                                    Есть аккаунт?
                                    <span style={{ marginLeft: 10 }}>
                                        <NavLink to={LOGIN_ROUTE}>
                                            Войдите!
                                        </NavLink>
                                    </span>
                                </span>
                            )}
                        </div>
                        <Button
                            className="mt-3 align-self-end"
                            variant={"outline-success"}
                        >
                            {isLogin ? "Войти" : "Регистрация"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
