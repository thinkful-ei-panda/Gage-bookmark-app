import store from './store.js';
import api from './api.js';


//**********template generator**************//


//***TODO add delete button to big-bookmarks ***//
const generateBookmarkLoader = function (mark){

  const star = '<div class="clip-star"></div>';
  let starStore = [];
  for (let i = 0; i < mark.rating; i++) {
    starStore.push(star);
  }
  starStore = starStore.join('\n')
  //load with milk 1st
  let displayBox = `<div class="big-bookmark" id="${mark.id}" > 
        <h2>${mark.title}</h2>
        <p>score : ${starStore}</p>
        <p>${mark.desc}</p>
        <div class="big-b-button" id="${mark.id}" >
          <a href="${mark.url}" type="button" target="_blank" >visit site</a>
          <button id="deleteMe" type="delete">Delete</button>
        </div>
        
    </div>`;
  if(!mark.expanded){
    displayBox =`
            <div class="small-bookmark" id="${mark.id}">
                <span>${mark.title}</span>
                <div>
                score : ${starStore}
                </div>
            </div>`;
  }
  return displayBox; 
};

const topBarLoader = function(){
  return `
    <div class="top-bar">
          <button class="add">Add new item</button>

          <form class="filter-selected" action="filter">
              <label for="filter">filter by scores greater then</label>
              <select name="out-of-filter" id="filter">
                  <option disabled selected>filter by</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
          </form>    
      </div> 
  `;
};

const submissionBoxLoader = function(){
  return `
   <div class="submission-form">
      <form class="add-bookmark" id="add-bM" action="submit">
    <div class ="form-div"> 
      <label for="title-Input">add new bookmark</label>
        <input type="text" name="title" id="title-Input" placeholder="new Bookmark" required>
    </div >
    <div class ="form-div"> 
      <label for="url-input">add url for bookmark</label>
        <input type="url" name="url"  id="url-input" placeholder="BookMarksApp.com" required oninvalid="this.setCustomValidity('Please Enter a URL with http(s)://')">
    </div >
    <div class ="form-div"> 
      <label for="bookmark-description">description</label>
        <textarea name="desc" id="bookmark-description" placeholder="what would you like to say about the new Bookmark"></textarea>
    </div>
    <div class="submit buttons">
      <label for= "rank">score</label>
      <select name="out-of-filter" id="rank">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
      <button type="submit" id="main-form-submit">Create</button>
      <button type="reset" id="reset">Cancel</button>
    </div>
                
        </form>
    </div>`;
};

//********error handlers (need to work on )****************//

const errorElement = function (error) {
  return `<section class="error-content">
            <button id="cancel-error">X</button>
            <p>${error}</p>
        </section>`;
};

const renderError = function(){
  if(store.error) {
    const Eelem = errorElement(store.error);
    $('.app-loader').html(Eelem);
  }
};

const errorButton = function(){
  $('.app-loader').on('click','#cancel-error',()=>{
    store.setError();
    render();
  });
};

//**********print for each**************//

const generateBookmarkList = function(bookmarkList){
  const bookmarks = bookmarkList.map( (object) =>  generateBookmarkLoader(object));
  return bookmarks.join('');
};


//****************render function*****************************//
//cuz you know... a render function can't be a render function, unless if it's named render..... 눈_눈

const render = function(){
  renderError();
  let html = '';
  let marks = store.bookmarks;
  if(store.ratingFilter > 0){
    marks = marks.filter(obj => obj.rating >= store.ratingFilter);
  }

  html = topBarLoader();

  html +=  generateBookmarkList(marks);
  
  $('.app-loader').html(html);
  
  if(store.submissionToggle){
    $('.app-loader').html(submissionBoxLoader());
  }

};

//****************and this is where it get's fun (ーー;) ***********************//
//**************************event listeners ************************************//

const handleAddButton = function(){
  $('main').on('click','button.add',(x) => {
    x.preventDefault();
    store.submissionToggle = true;
    render();
  });
};

const handleSubmissions = function() {
  $('main').on( 'submit','#add-bM', (e) =>{
    e.preventDefault();
    const newTitle = $('#title-Input').val();
    const newURL = $('#url-input').val();
    const newDesc = $('#bookmark-description').val();
    const newVal = $('#rank').val();
    
    const o = {
      title: newTitle,
      url: newURL,
      desc: newDesc,
      rating: newVal,
    };
    store.toggleSubmission();
    api.newMarks(o)
      .then((newSub)=>{
        store.addBookmark(newSub);
        render();
      } )
      .catch((e) => {
        console.log(e);
        store.setError(e.message);
        renderError();
      });
  } );
};

const handleCancelButton = () => {
  $('main').on('click', '#reset',(e) => {
    e.preventDefault();
    store.toggleSubmission();
    render();
  });
};

const getBookmarkId = function (mark) {
  const id = $(mark).attr('id');
  return id; 
};

const handleDeleteMarkClicked = function() {
  $('.app-loader').on('click', '#deleteMe', (x) => {
    x.preventDefault();
    const target = $('#deleteMe').parent();
    console.log('@ handleDeletemarkclicker target =',target);
    const id = getBookmarkId(target);
    console.log('@ handleDeletemarkclicker id =',id);
    api.deleteMarks(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((e)=>{
        console.log(e);
        store.setError(e.message);
        renderError();
      });
  });
};

const handleClosingBigDisplay = () => {
  $('main').on('click','.big-bookmark',(e)=>{
    const id = getBookmarkId(e.currentTarget);
    store.toggleExpand(id);
    render();
  });
};

const handleMarkExpanded = function(){
  $('main').on('click', '.small-bookmark', (e) => {
    //console.log('at handleMarkExanded event.target = ', e.currentTarget);
    const id = getBookmarkId(e.currentTarget);
    store.toggleExpand(id);
    render();
  });
};
//needs work
const handleFilterValChange = function(){
  $('main').on( 'change','#filter', () =>{ 
    store.ratingFilter = $('#filter').val();
    render();
  } );
};

const eventPackage = function () {
  handleAddButton(); 
  handleSubmissions();
  handleCancelButton();
  handleClosingBigDisplay();
  handleDeleteMarkClicked();
  handleMarkExpanded();
  handleFilterValChange();
  errorButton();
};






export default{
  eventPackage,
  render
};
