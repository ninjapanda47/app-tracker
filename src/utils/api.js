// const api = 'http://localhost:7000';
const api = 'https://app-tracker-server.herokuapp.com';

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Authorization: token
};

// Get application by user
export const getAppsByUser = async id => {
  let response = await fetch(`${api}/getByUser/${id}`, { headers });
  let data = await response.json();
  return data;
};

// Get application by user
export const getStatsByUser = async id => {
  let response = await fetch(`${api}/getStatsByUser/${id}`, { headers });
  let data = await response.json();
  return data;
};

// Add new application
export const addApp = async job => {
  let response = await fetch(`${api}/addJob`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  });
  let data = await response.json();
  return data;
};

// Update application
export const updateApp = async update => {
  let response = await fetch(`${api}/updateJob`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(update)
  });
  let data = await response.json();
  return data;
};

// Delete application
export const deleteApp = async id => {
  console.log('in API', id);
  let response = await fetch(`${api}/deleteJob`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(id)
  });
  let data = await response.json();
  return data;
};
