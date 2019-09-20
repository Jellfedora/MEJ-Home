export function getListOfProducts() {
    return fetch('https://mej-api.hopto.org/products/get_all')
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function postListOfProducts(opts) {
    return fetch('https://mej-api.hopto.org/products/save_product', {
        method: 'post',
        body: JSON.stringify(opts)
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function apiDeleteProduct(opts) {
    return fetch('https://mej-api.hopto.org/products/delete/' + opts, {
        method: 'delete',
        body: JSON.stringify(opts)
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


