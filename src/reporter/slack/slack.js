const axios = require('axios');

async function postData(url = '', data = {}) {
  // Default options are marked with *
  try {
    const response = await axios.post(url, data);
    return response.data; // parses JSON response into native JavaScript objects
  } catch (e) {
    console.log(e);
  }
}
const init = (slackURL) => ({ report: async (data) => postData(slackURL, { text: data }) });

module.exports = {
  init
};
