function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}


export const userService = {
    login,
    logout,
    register,
    getById,
    //update,
    //delete: _delete
};


function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
        if (!response.ok) {
            if (response.status === 401) {
                if (response.statusText === "Username/Password does not match") {
                    alert("Username/Password does not match");
                    window.location.reload(true);
                }
                else {
                    logout();
                    window.location.reload(true);
                }   
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}


function login(username, password) {
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    
    return fetch("http://desktop-hv2qoiv:3000/signin", reqOptions)
        .then(handleResponse)
        .then(user => {
            //console.log(user);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}


function getById(id) {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://desktop-hv2qoiv:3000/users/${id}`, reqOptions).then(handleResponse);
}


function register(user) {
    const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch('http://desktop-hv2qoiv:3000/signup', reqOptions).then(handleResponse);
}