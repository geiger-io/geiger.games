$(document).ready(function(){
//Navigation

$('#main-nav .active').removeClass('active');
$('#main-nav ul').hide();

$('#menu-link').click(function(e){
	e.preventDefault();
	var $state = $('#main-nav').attr('class');
	
	if($state != 'active'){
		$('#main-nav ul').fadeIn().addClass('active');
		$('#main-nav').addClass('active');
		$('#menu-link').addClass('active');
	} else {
		$('#main-nav ul').fadeOut();
		$('#main-nav').removeClass('active');
		$('#menu-link').removeClass('active');
	}
	
})


// Mobile Gallery

$('.slider .slide').click(function(){

	//Loop Next
	$.fn.loopNext = function(selector){
    	var selector = selector || '';
	 	return this.next(selector).length ? this.next(selector) : this.siblings(selector).addBack(selector).first();
	}
	
	var current = $(this);
	
	$(this).css('z-index', 9).loopNext().hide().css('z-index', 10).fadeIn(500, function(){
		$(current).css('z-index', 5);
	});
	
})

// Standard Gallery
$(".standard-gallery").responsiveSlides({
        auto: false,
        pager: false,
        nav: true,
        speed: 500
      });

})




// Text entry functions

$(document).ready(function(){
	
	var progress = 0;
	 $('#text-input').focus();
	 
	 // Load in some filthy language for the badwords filter
	 $.ajax({
      url: 'badwords.txt',
      type: 'get',
      async: false,
      success: function(txt) {
         badwords = txt;
      }
    });

	$('#text-form').submit(function(e){
		e.preventDefault();
		
		var name = $('#text-input').val();
		var val = $('#text-input').val().toLowerCase();
		
		var statement2 = "Hi <span class='highlight'>" + name + "</span> what are you interested in? ";
		var hint2 = "Hint: Digital Books, Apps, Crowdfunding, Contact";
		var hint3 = "At this point the page will re-direct to relevant page";
		
		var statementbooks = "Books eh? Follow the white rabbit!";
		var statementweb = "A tangled web, untangled, let me show you.";
		var statementnews = "Extra! Extra! Read all about it!";
		var statementapp = "Do we like apps? App-solutely!";
		var statementcontact = "Hey, I just met you, And this is crazy, But here's my number, So call me, maybe!";
		var statementnoidea = "I haven't a clue what you are talking about. Are you sure you are writing English?";
		var bwrds = [];
			 bwrds[0] = "Language!";
			 bwrds[1] = "Wash your mouth out with soup! ...er... I mean soap. Stupid auto-complete.";
			 bwrds[2] = "Merry Christmas you filthy animal!";
			 bwrds[3] = "Such ugly words, from such pretty hands, tut tut.";
			 bwrds[4] = "Do you kiss your mother with that mouth?";
			 bwrds[5] = "How rude! Won't someone please think of the children!";
				
		var noidea = [];
			 noidea[ 0 ] = "I haven't a clue what you are talking about. Are you sure you are writing English?";
			 noidea[ 1 ] = "Que?";
			 noidea[ 2 ] = "You are beyond the realm of comprehension!";
			 noidea[ 3 ] = "Um, nope, try again.";
			 noidea[ 4 ] = "I'm sorry but I don't have an answer for that.";
			 noidea[ 5 ] = "This is not the answer you were looking for. Please try again.";
			 noidea[ 6 ] = "Is this some kind of joke? That didn't make sense.";

		
		progress = progress + 1;
		$("#text-form").get(0).reset();
		
		if(progress == 1){
			$('#statement').html(statement2);
			$('#hint').html(hint2);
			
		} else if(progress >= 2){// change this later
			$('#hint').html(hint3);
			
			if (val.match( /(book|digital books|ebooks|epub|ibooks|kindle)/ )) {
				textSwap(statementbooks);
				setTimeout(function(){window.location.replace("books.php")}, 1500);
				
			} 
			else if(val.match( /(web|website|web site|interwebs|internet|kickstarter|crowdfunding|pledgemanager|pledges|mantic|pledgehammer)/ )) {
				textSwap(statementweb);
				setTimeout(function(){window.location.replace("web.php")}, 2000);
			} 
			/*
			else if(val.match( /(mushroom|game|games)/ )) {
				textSwap(statementgames);
				window.location.replace(".php");
			} 
			
			else if(val.match( /(design|graphic)/ )) {
				textSwap(statementdesign);
				window.location.replace(".php");
			} 
			*/
			else if(val.match( /(app|apps|application|applications|webapp|webapps|ios|iphone|ipad|i phone|i pad|android|apptastic)/ )) {
				textSwap(statementapp);
				setTimeout(function(){window.location.replace("apps.php")}, 2000);
			} 
			else if(val.match( /(contact|email|telephone|address)/ )) {
				textSwap(statementcontact);
				setTimeout(function(){window.location.replace("contact-us.php")}, 2500);
			} 
			else if(val.match( /(news|press|pr|blog|articles)/ )) {
				textSwap(statementnews);
				setTimeout(function(){window.location.replace("news/_site/index.html")}, 2500);
			} 
			else if(val.match(new RegExp(badwords,'i'))) {
				var text = bwrds[Math.floor(Math.random()*bwrds.length)];
				textSwap(text);
			}  
			else {
				var text = noidea[Math.floor(Math.random()*noidea.length)];
				textSwap(text);
				$('#hint').html(hint2);
			}
		}
	});
});

//Swaps the html in the choosen element with the choosen statement
function textSwap(statement, element){
	if (element == null) {
        element = '#statement';
    }
	$(element).fadeOut(100, function(){
			$(this).html(statement).fadeIn();
	});
}


//Page layout functions

$(document).ready(function(){
	wrapperHeight();
	$(window).resize(function(){
		wrapperHeight();
	});
	
});

function wrapperHeight(){
	var windowheight = $(window).height();
	$('#main-wrapper').css({height : windowheight});
}