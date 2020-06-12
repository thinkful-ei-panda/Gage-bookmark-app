import api from './api.js';
import cache from './cache.js';
import events from './events.js';



const main = function(){
  //get info from api and push into local cache

  api.getMarks()
    .then((marks) => {
      marks.forEach(bM => cache.addBookmark(bM));
      events.render();
    });
  events.eventPackage();
  events.render();
};

$(main);