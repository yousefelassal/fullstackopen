const axios = require('axios');
const url = "http://localhost:3001/api/notes";

axios.delete(url + "/3")
axios.get(url + "/2").then(response => {
    console.log(response.data);
});
axios.get(url).then(response => {
    const notes = response.data;
    console.log(notes);
});

