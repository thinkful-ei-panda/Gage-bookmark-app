const error = null ;

const bookmarks = [];

const ratingFilter = 0;

const submissionToggle = false;

const findById = function (id) {
  console.log('at findById  id =',id);
  console.log(bookmarks);
  const thing = bookmarks.find(x => x.id === id);
  console.log(thing);
  return thing;
};


const toggleSubmission = function(){
  this.submissionToggle = !this.submissionToggle ;
} ;

const addBookmark = function (obj){
  obj.expanded = false;
  console.log('@ addBookmark obj =',obj);
  this.bookmarks.push(obj);
};
//might update to full update... well see 
const toggleExpand= function(id){
  const target = this.findById(id);
  target.expanded = !target.expanded;
};

const findAndDelete = function (id) {
  this.bookmarks = bookmarks.filter(x => x.id !== id);
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
  toggleSubmission,
  findAndDelete,
  setError,
};




    
