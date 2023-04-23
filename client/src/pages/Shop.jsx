import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { Context } from "..";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data));
        fetchBrands().then((data) => device.setBrands(data));
        fetchDevices(null, null, 1, 3).then((data) => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device]);

    useEffect(() => {
        fetchDevices(
            device.selectedType.id,
            device.selectedBrand.id,
            device.page,
            2
        ).then((data) => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.page, device, device.selectedType, device.selectedBrand]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
