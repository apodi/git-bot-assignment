
const fetchAPI =require('./fetchAPI');
module.exports = {
  camelize : (str)=>{
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  },
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





