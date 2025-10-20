const SERVER = import.meta.env.VITE_URL_API

async function getDBUsers() {
    const response = await fetch(SERVER + '/users')
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const users = await response.json()
    return users
}

async function addDBUser(user) {
    const response = await fetch(SERVER + '/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const newUser = await response.json()
    return newUser
}
export {
    getDBUsers,
    addDBUser
}