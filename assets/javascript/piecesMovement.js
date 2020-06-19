
allowDrop = (e) => e.preventDefault();

drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);
    console.log(e.target.id);
}


drop = (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
}

document.getElementsByClassName('cell')

currentPosition = (here) => {
    console.log(here);
}


knightMove = (currentSpot) => {
    // A chess board is commonly described in algebraic notation so a grid with numbers and letters describing each position on the board. It might be more steps but I do not think it is best to change common terms when presenting something to a client.
    const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const yAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

    //Translates the current knight's position to integers in the arrays being used in the function.
    let xSpot = xAxis.indexOf(currentSpot.split('')[0]);
    let ySpot = yAxis.indexOf(currentSpot.split('')[1]);

    // Need to calculate/limit all of the possible moves a knight can make. 
    let knightX = [xSpot + 2, xSpot - 2, xSpot + 1, xSpot - 1].filter(function(cellPosition){
        return (cellPosition > -1 && cellPosition < 8);
    });
    let knightY = [ySpot + 2, ySpot - 2, ySpot + 1, ySpot - 1].filter(function(cellPosition){
        return (cellPosition > -1 && cellPosition < 8);
    });

    // console.log(knightX);
    // console.log(knightY);

    //Combines the x and y possibilities for the knights moves. This step further limits the knight moving 3 total spaces. Two squares in one direction and one square in a perpendicular direction aka an L shape. 
    for (let i = 0; i < knightX.length; i++) {
        for (let j = 0; j < knightY.length; j++) {  

            // console.log(xSpot + '-' + knightX[i] + ' + ' + ySpot + '-' + knightY[j]);
            // console.log((Math.abs(xSpot - knightX[i]) + Math.abs(ySpot - knightY[j])));
            // console.log(xAxis[knightX[i]] + yAxis[knightY[j]]);

            if ((Math.abs(xSpot - knightX[i]) + Math.abs(ySpot - knightY[j])) === 3){
                console.log('This knight(' + currentSpot + ') can move to ' + xAxis[knightX[i]] + yAxis[knightY[j]] + '.');
            }
        }
    };
};

//I would like the current spot of the knight to be grabbed when the player types the coordinates or moves the knight with the mouse.
knightMove('e5');
