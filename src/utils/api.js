const api = 'http://localhost:7000';

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Authorization: token
};

// Get application by user
export const getApplicationsbyUser = async id => {
  let response = await fetch(`${api}/getByUser/${id}`, { headers });
  let data = await response.json();
  return data;
};

// Add new application
export const addApplication = async job => {
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

// Update item
export const updateItem = async (id, update) => {
  let response = await fetch(`${api}/updateJob`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, update: update })
  });
  let data = await response.json();
  return data;
};
