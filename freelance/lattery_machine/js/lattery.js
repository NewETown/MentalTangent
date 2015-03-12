$(document).ready(function() {

    $('.go-button').click(function() {
        $(this).addClass('paused');
        $(this).prop('disabled',true);
        
        var first = spinReel();
        var second = spinReel();
        var third = spinReel();
        
        spin(first, '#cup');
        spin(second, '#filter');
        spin(third, '#ingredients');
        
        if (first === second && second === third)
            winner(first);
        else
            loser();
    });
    
    $('.sadface').click(function() {
        $(this).removeClass('wiggle');
        reset();
    });
    
    $('.drink').click(function() {
        $(this).removeClass('drop');
        $(this).removeClass('wobble');
        reset();
    });
    
});

function spinReel() {
    return Math.ceil(Math.random() * 3);
}

function winner(num) {
    setTimeout(function() {
        var color = "";
        switch(num) {
            case 1:
                // Coffee
                color = '106,67,53,.8';
                break;
            case 2:
                // Tea
                color = '75,50,40,.8';
                break;
            case 3:
                // Espresso
                color = '70,103,40,.8';
                break;
            default:
                // Bad
                color = '0,0,0,1';
                break;
        }
        $('.liquid').css('background-color', 'rgba(' + color + ')');
        $('.drink').addClass('wobble drop');
    }, 4000);
}

function loser() {
    setTimeout(function() { 
        $('.sadface').addClass('wiggle');
    }, 4000);
}

function spin(num, el) {
    // Add the proper class based on the roll
    $(el).addClass("spin spin" + num);
}

function reset() {
    $('.go-button').removeClass('paused');
    $('.go-button').prop('disabled',false);
    $('#ingredients').removeClass();
    $('#cup').removeClass();
    $('#filter').removeClass();
}
