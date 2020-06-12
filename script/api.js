const BASE_URL = 'https://thinkful-list-api.herokuapp.com/gage'; // bookmark

const errorCatch = function(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if(!res.ok) {
        error = {code : res.status};
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};



const getMarks = function(){
  return errorCatch(`${BASE_URL}/bookmarks`);
};

const newMarks = function(objInput){
  const newMark = JSON.stringify(objInput);
  console.log(newMark);

  return errorCatch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : newMark
  });
};

// const updateMarks = function(){ /<==extra
//                                /
// };                            /
//______________________________/

const deleteMarks = function(id){
  return errorCatch(`${BASE_URL}/bookmarks/${id}`,{
    method : 'DELETE',
  });
};


export default{
  getMarks,
  newMarks,
  //updateMarks, <== extra
  deleteMarks,

};