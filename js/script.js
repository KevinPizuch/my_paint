$(document).ready(function () {
    let mousePressed = false,
        X,
        Y,
        canvas = $("canvas").get(0).getContext("2d"),
        crayon = true,
        rectangle = false,
        trait = false,
        cercle = false,
        gomme = false,
        i = 0;
        
    canvas.rect(0, 0, 900, 700);
    canvas.closePath();
    canvas.fillStyle = "white";
    canvas.fill();
    canvas.stroke();
    document.getElementById('download').addEventListener('click', function() {
        downloadCanvas(this, 'canvas', 'image.png');
    }, false);

    $('#trait').click(function(){
        reset();
        trait = true;
    });
    $('#crayon').click(function(){
        reset();
        crayon = true;
    });
    $('#rect').click(function(){
        reset();
        rectangle = true;
    });
    $('#cercle').click(function(){
        reset();
        cercle = true;
    });
    $('#gomme').click(function(){
        reset();
        gomme = true;
    });
   
    $('#canvas').mousemove(function (e){
        if(mousePressed){
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, true);
        }
    });
    
    $('#canvas').mouseup(function (){
        mousePressed = false;
    });
    
    $('#canvas').mouseleave(function (){
        mousePressed = false;
    });
    $('#clear').click(function (){
        
        canvas.clearRect(0, 0, 900, 700);
    });

    $('#canvas').mousedown(function (e){
        if(crayon){
            mousePressed = true;
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, false);
        }else if(gomme){
            mousePressed = true;
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, false);
        }else if(trait){
            mousePressed = false;
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, true);
        }else if(rectangle){
            mousePressed = false;
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, true);
        }else if(cercle){
            mousePressed = false;
            draw(e.pageX-$(this).offset().left, e.pageY-$(this).offset().top, true);
        }
    });

    function draw(x, y, fix){
        if(!fix){
            X = x;
            Y = y;
        }
        if(crayon || trait){
            if((trait && i === 1) || crayon){
                canvas.beginPath();
                canvas.strokeStyle = $('#color').val();
                canvas.lineWidth = $('#size').val();
                canvas.moveTo(X, Y);
                canvas.lineTo(x, y);
                canvas.closePath();
                canvas.stroke();
                i = 0;
            }else{
                i += 1;
            }
        }else if(gomme){
            if(gomme){
                canvas.beginPath();
                canvas.clearRect(X,Y,20,20);
                canvas.closePath();
                i = 0;
            }else{
                i += 1;
            }
        }else if(rectangle){
            if(i === 1 && $('#remplir_rect').is(':checked')){
                canvas.beginPath();
                canvas.strokeStyle = $('#color').val();
                canvas.lineWidth = $('#size').val();
                canvas.rect(X, Y, x - X, y - Y);
                canvas.closePath();
                canvas.fillStyle = $('#color').val();
                canvas.fill();
                canvas.stroke();
                i = 0;
            }else if(i === 1){
                canvas.beginPath();
                canvas.strokeStyle = $('#color').val();
                canvas.lineWidth = $('#size').val();
                canvas.rect(X, Y, x - X, y - Y);
                canvas.closePath();
                canvas.stroke();
                i = 0;
            }else{
                i += 1;
            }
        }else if(cercle){
            if(i === 1 && $('#remplir_circle').is(':checked')){
                canvas.beginPath();
                canvas.strokeStyle = $('#color').val();
                canvas.lineWidth = $('#size').val(); 
                canvas.arc(X, Y, Math.sqrt(Math.pow(x - X, 2) + Math.pow(y - Y, 2)), 0, 2 * Math.PI);
                canvas.closePath();
                canvas.fillStyle = $('#color').val();
                canvas.fill();
                canvas.stroke();
                i = 0;
            }else if(i === 1){
                canvas.beginPath();
                canvas.strokeStyle = $('#color').val();
                canvas.lineWidth = $('#size').val(); 
                canvas.arc(X, Y, Math.sqrt(Math.pow(x - X, 2) + Math.pow(y - Y, 2)), 0, 2 * Math.PI);
                canvas.closePath();
                canvas.stroke();
                i = 0;
            }else{
                i += 1;
            }
        }
        X = x;
        Y = y;
    }

    function downloadCanvas(link, canvasId, filename) {
        canvas.fillStyle = "white";
        canvas.fill();
        link.href = document.getElementById(canvasId).toDataURL("image/jpg");
        link.download = filename;
    }

    $('#imageLoader').on('change',function(e){
        let reader = new FileReader();
        reader.onload = function(event){
            let img = new Image();
            img.src = 'img/base.png';
            img.onload = function(){
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.drawImage(img,0, 0);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);     
    });

    function reset(){
        trait = false;
        crayon = false;
        rectangle = false;
        cercle = false;
        gomme = false;
    }
});