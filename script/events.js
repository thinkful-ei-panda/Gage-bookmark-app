import cache from './cache.js';
import api from './api.js';


//**********template generator**************//


//***TODO add delete button to big-bookmarks ***//
const generateBookmarkLoader = function (mark){

  //load with milk 1st
  let displayBox = `<div class="big-bookmark" id="${mark.id}"> 
        <h2>${mark.title}</h2>
        <button id="deleteMe-OwO" type="delete">Delete</button>
        <a href="${mark.url}" type="button">visit sight</a>
        <p>${mark.desc}</p>
    </div>`;
  if(!mark.expanded){
    displayBox =`
            <div class="small-bookmark" id="${mark.id}">
                <span>${mark.title}</span>
                <span>${mark.rating}/5</span>
            </div>`;
  }
  return displayBox; 
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
                <textarea name="desc" id="bookmark-description"  required>its a cool place to play cool games</textarea>
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

const errorElement = function (oppsywoopsy) {
  return `<section class="error-content">
            <button id="cancel-error">X</button>
            <p>${oppsywoopsy}</p>
        </section>`;
};

const renderError = function(){
  if(cache.error) {
    const Eelem = errorElement(cache.error);
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
  let marks = [...cache.bookmarks];
  if(cache.ratingFilter > 0){
    marks = marks.filter(obj => obj.rating < cache.ratingFilter);
  }
  const htmlArrToString = generateBookmarkList(marks);
  
  $('.app-loader').html(htmlArrToString);
  
  if(cache.submissionToggle){
    $('.app-loader').html(submissionBoxLoader());
  }

};

//****************and this is where it get's fun (ーー;) ***********************//
//**************************event listeners ************************************//

const handleAddButton = function(){
  $('button.add').click((x) => {
    x.preventDefault();
    cache.submissionToggle = true;
    console.log(' @ handleAddButton submission =', cache.submissionToggle);
    render();
  });
};

const handleSubmissions = function() {
  $('#main-form-submit').click( (e) =>{
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
    cache.toggleSubmission();
    api.newMarks(o)
      .then((newSub)=>{
        console.log(newSub);
        cache.addBookmark(newSub);
        render();
      } );
  } );
};

const handleCancelButton = () => {
  $('main').on('click', '#reset',(e) => {
    e.preventDefault();
    console.log('handleCancelButton is working');
    cache.toggleSubmission();
    render();
  });
};



const getBookmarkId = function (mark) {
  //console.log('at getBookmarkID the inputted element =',mark)
  const id = $(mark).attr('id');
  return id; 
};

const handleDeleteMarkClicked = function() {
  $('.app-loader').on('click', '#deleteMe-OwO', (x) => {
    const id = getBookmarkId(x.currentTarget);
    api.deleteMarks(id)
      .then(() => {
        cache.findAndDelete(id);
        render();
      })
      .catch((e)=>{
        console.log(e);
        cache.setError(e.message);
        renderError();
      });
  });
};

const handleMarkExpanded = function(){
  $('.app-loader').on('click', '.small-bookmark', (e) => {
    //console.log('at handleMarkExanded event.target = ', e.currentTarget);
    const id = getBookmarkId(e.currentTarget);
    cache.toggleExpand(id);
    render();
  });
};
//needs work
const handleFilterValChange = function(){
  $('.out-of-filter').change( () =>{
    cache.ratingFilter = $(this).children('option:selected').val();
    console.log(cache.ratingFilter);
    render();
  } );
};

const eventPackage = function () {
  handleAddButton(); 
  handleSubmissions();
  handleCancelButton();
  handleDeleteMarkClicked();
  handleMarkExpanded();
  handleFilterValChange();
};






export default{
  eventPackage,
  render
};
