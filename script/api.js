const BASE_URL = 'https://thinkful-list-api.herokuapp.com/gage'; // bookmark

const errorCatch = function(...args){
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
  
};

const newMarks = function(){

};

// const updateMarks = function(){ /<==extra
//                                /
// };                            /
//______________________________/

const deleteMarks = function(){

};


export default{
  getMarks,
  newMarks,
  //updateMarks, <== extra
  deleteMarks,

};