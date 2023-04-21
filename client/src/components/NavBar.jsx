import React, { useContext } from "react";
import { Context } from "..";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                {user.isAuth ? (
                    <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
                        КупиДевайс
                    </NavLink>
                ) : (
                    <NavLink style={{ color: "white" }} to={LOGIN_ROUTE}>
                        КупиДевайс
                    </NavLink>
                )}

                {user.isAuth ? (
                    <Nav className="ml-auto" style={{ color: "white" }}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                                logout();
                            }}
                        >
                            Выйти
                        </Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{ color: "white" }}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Авторизация
                        </Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;
