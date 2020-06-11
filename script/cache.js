const error = null ;

const bookmarks = [];

const ratingFilter = 0;

const submissionToggle = false;

const findById = function (id) {
  return this.bookmark.find(x => x.id === id);
};

const addBookmark = function (obj){
  obj.expanded = false;
  this.bookmark.push(obj);
};
//might update to full update... well see 
const toggleExpand= function(id){
  const target = this.findById(id);
  target.expanded = !target.expanded;
};

const findAndDelete = function (id) {
  this.bookmark = this.bookmark.filter(x => x.id !== id);
};

const setError = function(e){
  this.error = e; 
};


export default {
  bookmarks,
  ratingFilter,
  submissionToggle,
  findById,
  addBookmark,
  toggleExpand,
  findAndDelete,
  setError,
};




    
