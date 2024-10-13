

function showContent(header, div, content) {
    var originHeight = '107px'
    var currentHeight = $(div).height()
    
   
    if (currentHeight > 140) {
         // 3. Once pressed again, the div should shrink and the content should disappear
         $(content).hide('slow','linear', function(){
            $(div).animate({height: '105px'}, 'slow')
        })
        
        
    } else {
        // 1. I want the div to scale and grow 
        $(div).animate({height: '300px'}, 'slow', function(){
            // 2. I want the content to show. 
            $(content).show('slow','linear')
        })
        
     
        
        
    }
    
 
}


function scrollActivity(firstActivity, secondActivity){
    // 1. If this element clicked is equal to one of the titles, hide it and show a different activity
    
    $('#activities-header').click(function(){
        if (secondActivity == '#activity-one') {
            secondActivity = '#activity-two'
            $(secondActivity).hide()
        } else {
            $(secondActivity).hide()
        }
    })
    $(firstActivity).hide(function(){
        $(secondActivity).show()
    })

}
