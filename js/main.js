//alert(1);
/// listen from from submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);


function saveBookmark(e){
	//console.log('Its work');
	
	var siteName=document.getElementById('sitename').value;
	var siteUrl=document.getElementById('siteUrl').value;


	if(!siteName || !siteUrl){
		alert('Please fill in the Form');
		return false;
	}

	//var expression = /(https?:\/\/(?:www\.|(?!www))[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use a valid URL');
	}

	

	var bookmark={
		name:siteName,
		url:siteUrl
	}
	/*
	console.log(siteName);
	console.log(siteUrl);
	console.log(bookmark);

	localStorage.setItem('test','Hello World');
	localStorage.setItem('test1','Hello World1');
	console.log(localStorage.getItem('test'));
	console.log(localStorage.getItem('test1'));

	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	console.log(localStorage.getItem('test1'));

	*/

	if(localStorage.getItem('bookmarks')===null){
		//init array
		var bookmarks=[];
		// add to array
		bookmarks.push(bookmark);
		// set to local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}else{
		// get bookmark from localstorage
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		//add Bookmark to array
		bookmarks.push(bookmark);
		// reset back to localStorage 
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));


	}
	e.preventDefault();
}

function deleteBookmark(url){
	//console.log(url);
	// get bookmark from localstorage
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

	for(var i=0;i<bookmarks.length;i++){
		if(bookmarks[i].url==url){
			// remove from array
			bookmarks.splice(i,1);
		}
	}
	// reset back to localStorage 
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

}

function fetchBookmark(){
	// get bookmark from localstorage
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	// get ouput id
	var bookmarkResult=document.getElementById('bookmarkResult');

	// build output
	bookmarkResult.innerHTML='';

	for(var i=0;i<bookmarks.length;i++){
		var name=bookmarks[i].name;
		var url=bookmarks[i].url;
		bookmarkResult.innerHTML+='<div class="well">'+

							'<h3>'+name+
								'<a class="btn btn-default" target="_blank"  href="'+url+'">Visit </a>'+
								'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"   href="#">Delete </a>'+
							'</h3>'+




						'</div>';

	}


}