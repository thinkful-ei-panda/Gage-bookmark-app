const error = null ;

const bookmarks = [];

const ratingFilter = 0;

const submissionToggle = false;

const findById = function (id) {
  return this.bookmarks.find(x => x.id === id);
};

const addBookmark = function (obj){
  obj.expanded = false;
  console.log(obj)
  this.bookmarks.push(obj);
};
//might update to full update... well see 
const toggleExpand= function(id){
  const target = this.findById(id);
  target.expanded = !target.expanded;
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(x => x.id !== id);
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




    
