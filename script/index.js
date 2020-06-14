import api from './api.js';
import store from './store.js';
import events from './events.js';



const main = function(){
  //get info from api and push into local store

  api.getMarks()
    .then((marks) => {
      marks.forEach(bM => store.addBookmark(bM));
      events.render();
    })
    .catch(e => {
      console.log(e);
      store.error = e.message; 
      events.render();
    });
  events.eventPackage();
  events.render();
};

$(main);