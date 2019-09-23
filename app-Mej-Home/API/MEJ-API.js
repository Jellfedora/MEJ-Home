export function getListOfProducts() {
    return fetch('https://mej-api.hopto.org/products/get_all', {
        method: 'get',
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getProduct(opts) {
    return fetch('https://mej-api.hopto.org/products/get/' + opts, {
        method: 'get',
        body: JSON.stringify(opts)
    })
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

export function apiEditProduct(opts) {
    return fetch('https://mej-api.hopto.org/products/edit/' + opts.name, {
        method: 'patch',
        body: JSON.stringify(opts)
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getListOfBabychecks() {
    return fetch('https://mej-api.hopto.org/babychecks/get_all', {
        method: 'get',
    })
        .then((response) => response.json())
        .catch((error) => console.error(error))
}



