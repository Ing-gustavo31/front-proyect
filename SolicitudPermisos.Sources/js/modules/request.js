import "babel-polyfill";

const request = async (route, config) => {
    const response = await fetch(`${route}`, config);
    if (response.status != 200) {
        throw new Error(response.statusText);
    }
    return response;
}

export default request;