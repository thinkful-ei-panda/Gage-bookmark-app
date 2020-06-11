import api from './api.js';
import chache from './cache.js';
import bookmark from './bookmark.js';



const main = function(){
  //get info from api and push into local cache

  //   api.getMarks()
  //     .then((marks) => {
  //       marks.forEach(bM => chache.addBookmark(bM));
  //       bookmark.render();
  //  });
  bookmark.eventPackage();
  bookmark.render();
};

$(main);