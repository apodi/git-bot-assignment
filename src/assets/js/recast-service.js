
const fetchAPI =require('./fetchAPI');
module.exports = {
  getIntent : (API_URL,path,reqObj) => {
    return fetchAPI(API_URL,path, {
      method: 'POST',
      body: reqObj,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 228f7bb89d19ce383cfe1530f2950632'
      },
    });
  }
}





