const host = 'http://localhost:5000/';

async function register(name, email, password) {
    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    return await res.json();
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await res.json();
}

async function createFurniture(furnitureData) {
    const res = await fetch(host + 'furniture/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify(furnitureData)
    });
    return await res.json();
}

async function getStats() {
    const res = await fetch(host + 'stats')
    return await res.json();
}

async function getPage(page) {
    const res = await fetch(host + 'furniture/all?page=' + page)
    return await res.json();
}

async function getDetails(id) {
    const res = await fetch(host + 'furniture/details/' + id, {
        method: "GET",
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken')
        }
    })
    return await res.json();
}

async function listReviews(id) {
    const res = await fetch(host + `furniture/details/${id}/reviews`, {
        method: "GET",
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken')
        }
    })
    return await res.json();
}

async function createReview(id, data) {
    const res = await fetch(host + `furniture/details/${id}/reviews/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function getMyFurniture() {
    const res = await fetch(host + 'furniture/mine', {
        method: "GET",
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken')
        }
    })
    return await res.json();
}

async function deleteFurniture(id) {
    const res = await fetch(host + 'furniture/delete/' + id, {
        method: "POST",
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken')
        }
    })
    return await res.json();
}

async function search(searchData) {
    const res = await fetch(host + 'furniture/all?search=' + searchData, {
        method: "GET",
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken')
        }
    })
    return await res.json();
}

async function likeFurniture(id) {
    const res = await fetch(host + `furniture/details/${id}/like`, {
        method: "POST",
        headers: {
            Authorization: 'bearer ' + localStorage.getItem('authToken')
        }
    })
    return await res.json();
}


export { register, login, createFurniture, getStats, getPage, getDetails, listReviews, createReview, getMyFurniture, deleteFurniture, search, likeFurniture };