import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const { device } = useContext(Context);

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {device.devices.map((item) => (
                <DeviceItem key={item.id} device={item} />
            ))}
        </div>
    );
});

export default DeviceList;
