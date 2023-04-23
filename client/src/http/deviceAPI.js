import { $authHost, $host } from ".";

export const createType = async (type) => {
    const { data } = await $authHost.post(
        `${process.env.REACT_APP_API_URL}/api/type`,
        type
    );

    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get(
        `${process.env.REACT_APP_API_URL}/api/type`
    );

    return data;
};

export const createBrand = async (brand) => {
    const { data } = await $authHost.post(
        `${process.env.REACT_APP_API_URL}/api/brand`,
        brand
    );

    return data;
};

export const fetchBrands = async () => {
    const { data } = await $host.get(
        `${process.env.REACT_APP_API_URL}/api/brand`
    );

    return data;
};

export const createDevice = async (device) => {
    const { data } = await $authHost.post(
        `${process.env.REACT_APP_API_URL}/api/device`,
        device
    );

    return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const { data } = await $host.get(
        `${process.env.REACT_APP_API_URL}/api/device`,
        {
            params: {
                typeId,
                brandId,
                page,
                limit,
            },
        }
    );

    return data;
};

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get(
        `${process.env.REACT_APP_API_URL}/api/device/${id}`
    );

    return data;
};
