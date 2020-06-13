import store from './store.js';
import api from './api.js';


//**********template generator**************//


//***TODO add delete button to big-bookmarks ***//
const generateBookmarkLoader = function (mark){

  //load with milk 1st
  let displayBox = `<div class="big-bookmark" id="${mark.id}"> 
        <h2>${mark.title}</h2>
        <p>score : ${mark.rating} out of 5</p>
        <a href="${mark.url}" type="button">visit sight</a>
        <button id="deleteMe" type="delete">Delete</button>
        <p>${mark.desc}</p>
    </div>`;
  if(!mark.expanded){
    displayBox =`
            <div class="small-bookmark" id="${mark.id}">
                <span>${mark.title}</span>
                <span>score :${mark.rating} out of 5 </span>
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
            <label for="title-Input">add new bookmark</label>
                <input type="text" name="title" id="title-Input" placeholder="coolmathgames" required>
            <label for="url-input">add url for bookmark</label>
                <input type="url" name="url"  id="url-input" placeholder="coolmathgames.com" required>
            <label for="bookmark-description">description</label>
                <textarea name="desc" id="bookmark-description" required>its a cool place to play cool games</textarea>
                <select name="out-of-filter" id="rank">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type="submit" id="main-form-submit">Create</button>
                <button type="reset" id="reset">Cancel</button>
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
  }
};

//**********print for each**************//

const generateBookmarkList = function(bookmarkList){
  const bookmarks = bookmarkList.map( (object) => generateBookmarkLoader(object));
  return bookmarks.join('\n');
};


//****************render function*****************************//
//cuz you know... a render function can't be a render function, unless if it's named render..... 눈_눈

const render = function(){
  renderError();

  //loads submission page if button $('.add') is clicked 
  //console.log('at Render submissionTog should = ',cache.submissionToggle);
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
    console.log(' @ handleAddButton submission =', store.submissionToggle);
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
      } );
  } );
};

const handleCancelButton = () => {
  $('main').on('click', '#reset',(e) => {
    e.preventDefault();
    console.log('handleCancelButton is working');
    store.toggleSubmission();
    render();
  });
};

const getBookmarkId = function (mark) {
  console.log('at getBookmarkID the inputted element =',mark)
  const id = $(mark).attr('id');
  return id; 
};

const handleDeleteMarkClicked = function() {
  $('.app-loader').on('click', '#deleteMe', (x) => {
    x.preventDefault();
    const target = $('#deleteMe').parent();
    const id = getBookmarkId(target);
    $('main').remove(`div#${id}`);
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
    console.log(store.ratingFilter);
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
};






export default{
  eventPackage,
  render
};
