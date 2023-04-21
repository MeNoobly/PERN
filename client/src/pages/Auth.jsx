import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
    const location = useLocation();
    const { user } = useContext(Context);
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginHandler = async () => {
        try {
            const data = await login(email, password);
            user.setUser(user);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const registrationHandler = async () => {
        try {
            const data = await registration(email, password);
            user.setUser(user);
            navigate(LOGIN_ROUTE);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

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
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
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
                                            Зарегистрируйтесь!
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
                        {isLogin ? (
                            <Button
                                className="mt-3 align-self-end"
                                variant={"outline-success"}
                                onClick={() => {
                                    loginHandler();
                                }}
                            >
                                Войти
                            </Button>
                        ) : (
                            <Button
                                className="mt-3 align-self-end"
                                variant={"outline-success"}
                                onClick={() => {
                                    registrationHandler();
                                }}
                            >
                                Регистрация
                            </Button>
                        )}
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
