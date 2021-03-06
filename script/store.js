const error = null ;

let bookmarks = [];

const ratingFilter = 0;

const submissionToggle = false;

const findById = function (id) {
  const thing = bookmarks.find(x => x.id === id);
  return thing;
};


const toggleSubmission = function(){
  this.submissionToggle = !this.submissionToggle ;
} ;

const addBookmark = function (obj){
  obj.expanded = false;
  this.bookmarks.push(obj);
};
//might update to full update... well see 
const toggleExpand= function(id){
  const target = this.findById(id);
  target.expanded = !target.expanded;
};

const findAndDelete = function (id)  {
  const index = this.bookmarks.findIndex( x => x.id === id);
  this.bookmarks.splice(index,1);
};


const setError = function(e){
  this.error = e; 
};


export default {
  bookmarks,
  ratingFilter,
  submissionToggle,
  error,
  findById,
  addBookmark,
  toggleExpand,
  toggleSubmission,
  findAndDelete,
  setError,
};




    
