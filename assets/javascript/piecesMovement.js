
// A chess board is commonly described in algebraic notation so a grid with numbers and letters describing each position on the board. It might be more steps but I do not think it is best to change common terms when presenting something to a client.
const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const yAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);

    let offBoard = document.getElementById(e.target.id).parentNode.id;
    console.log(offBoard == 'blackPieces' || offBoard == 'whitePieces');

    if (!(offBoard == 'blackPieces' || offBoard == 'whitePieces')) {
        let currentSpot = document.getElementById(e.target.id).parentNode.id;
        let chessPiece = e.target.id.slice(5,-1);
        piecesMovement(currentSpot, chessPiece);
    }
    console.log(e.target.id.slice(5,-1));
}

//Drag and drop functions
allowDrop = (e) => e.preventDefault();

drop = (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData('text');
    if(e.target.classList.contains('piece')) {
        return;
    } else {
        e.target.appendChild(document.getElementById(data));
    
        let allowableMoves = document.getElementsByClassName('allowableMoves');        
        let highlightedCells = [];

        for(let i=0;i<allowableMoves.length;i++){                
            highlightedCells.push(allowableMoves[i].attributes[0].nodeValue);
        }

        for(let j=0;j<highlightedCells.length;j++){
            let highlightedMoves = document.getElementById(highlightedCells[j]);
            highlightedMoves.classList.remove('allowableMoves');
            if(highlightedMoves.classList.contains('dk')) highlightedMoves.classList.add('dark');
        }        
    }    
}

piecesMovement = (currentSpot, chessPiece) => {

        //Translates the current knight's position to integers in the arrays being used in the function.
        let xSpot = xAxis.indexOf(currentSpot.split('')[0]);
        let ySpot = yAxis.indexOf(currentSpot.split('')[1]);

        console.log(currentSpot[1]);

        switch(chessPiece) {
            case 'King':
                let kingX = [xSpot+1, xSpot-1];
                let kingY = [ySpot+1, ySpot-1];
                let kingMoves = [];

                kingMoves.push(xAxis[parseInt(xSpot+1)] + currentSpot[1]);
                kingMoves.push(xAxis[parseInt(xSpot-1)] + currentSpot[1]);
                kingMoves.push(currentSpot[0] + parseInt(+currentSpot[1] + +1));
                kingMoves.push(currentSpot[0] + parseInt(+currentSpot[1] - +1));

                for(let i=0;i<kingX.length;i++){
                    for(let j=0;j<kingY.length;j++){
                        kingMoves.push(xAxis[kingX[i]] + yAxis[kingY[j]]);    
                    }
                }
                
                for(let k=0;k<kingMoves.length;k++){
                    if (kingMoves[k].length == 2){
                        if (!(kingMoves[k][1] == 9)){
                            let thisOne = document.getElementById(kingMoves[k]).classList;
                            thisOne.add('allowableMoves');
                            thisOne.remove('dark');
                        }
                    }
                }
            break;

            case 'Knight':
                // Need to calculate/limit all of the possible moves a knight can make. 
                let knightX = [xSpot + 2, xSpot - 2, xSpot + 1, xSpot - 1].filter(function(cellPosition){
                    return (cellPosition > -1 && cellPosition < 8);
                });
                let knightY = [ySpot + 2, ySpot - 2, ySpot + 1, ySpot - 1].filter(function(cellPosition){
                    return (cellPosition > -1 && cellPosition < 8);
                });
    
                //Combines the x and y possibilities for the knights moves. This step further limits the knight moving 3 total spaces. Two squares in one direction and one square in a perpendicular direction aka an L shape. 
                for (let i = 0; i < knightX.length; i++) {
                    for (let j = 0; j < knightY.length; j++) {  
                        let knightMoves = document.getElementById(xAxis[knightX[i]] + yAxis[knightY[j]]).classList;
                            
                        if ((Math.abs(xSpot - knightX[i]) + Math.abs(ySpot - knightY[j])) === 3){
                            knightMoves.add('allowableMoves');
                            knightMoves.remove('dark');
                            console.log('This knight(' + currentSpot + ') can move to ' + xAxis[knightX[i]] + yAxis[knightY[j]] + '.');
                        }
                    }
                }
            break;

            case 'Pawn':
                let pawnMoves = [];

                pawnMoves.push(xAxis[xSpot] + parseInt(+(yAxis[ySpot]) + +1));
                pawnMoves.push(xAxis[xSpot] + parseInt((yAxis[ySpot])-1));
                console.log(pawnMoves);
                
                for(let k=0;k<pawnMoves.length;k++){
                    if (pawnMoves[k].length == 2){
                        if (!(pawnMoves[k][1] == 9)){
                            let thisOne = document.getElementById(pawnMoves[k]).classList;
                            thisOne.add('allowableMoves');
                            thisOne.remove('dark');
                        }
                    }
                }
            break;
        }
        
}
