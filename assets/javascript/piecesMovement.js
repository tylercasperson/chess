
drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);

    let offBoard = document.getElementById(e.target.id).parentNode.id;

    if (!(offBoard == 'blackPieces' || offBoard == 'whitePieces')) {
        let currentCell = document.getElementById(e.target.id).parentNode.id;
        let chessPiece = e.target.id.slice(5,-1);
        piecesMovement(currentCell, chessPiece);
    }
    console.log(e.target.id.slice(5,-1));
}

allowDrop = (e) => e.preventDefault();

drop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData('text');
    let currentSquare = document.getElementById(e.target.id).id;

    removeHighlights = () => {
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

    if (document.getElementById(currentSquare).innerText == ''){
        if(e.target.classList.contains('piece')) {
            return;
        } else {
            e.target.appendChild(document.getElementById(data));
            removeHighlights();
        }
    } else {
        let battleCell = document.getElementById(document.getElementById(currentSquare).id);
        
        if(!(currentSquare == battleCell.id || document.getElementById(currentSquare).parentNode.id == battleCell.id)) {
            return;
        } else {
            if ( document.getElementById(document.getElementById(battleCell.id).parentNode.id) == null) {
                document.getElementById(currentSquare).append(document.getElementById(data));
                document.getElementById(document.getElementById(currentSquare).childNodes[0].id.slice(0,5)+'Pieces').append(battleCell.childNodes[0]);
            } else {
                document.getElementById(document.getElementById(battleCell.id).parentNode.id).append(document.getElementById(data));
                document.getElementById(battleCell.id.slice(0,5)+'Pieces').append(battleCell);
            }
            removeHighlights();
        }
    }
}

piecesMovement = (currentSpot, chessPiece) => {
    // A chess board is commonly described in algebraic notation so a grid with numbers and letters describing each position on the board. It might be more steps but I do not think it is best to change common terms when presenting something to a client.
    const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const yAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

    //Translates the current knight's position to integers in the arrays being used in the function.
    let xSpot = xAxis.indexOf(currentSpot.split('')[0]);
    let ySpot = yAxis.indexOf(currentSpot.split('')[1]);

    switch(chessPiece) {
        case 'King':
            let kingX = [xSpot+1, xSpot-1];
            let kingY = [ySpot+1, ySpot-1];
            let kingMoves = [];
 
            if((xAxis[parseInt(xSpot+1)] + currentSpot[1]).length == 2) kingMoves.push(xAxis[parseInt(xSpot+1)] + currentSpot[1]);
            if((xAxis[parseInt(xSpot-1)] + currentSpot[1]).length == 2) kingMoves.push(xAxis[parseInt(xSpot-1)] + currentSpot[1]);
            if((currentSpot[0] + parseInt(+currentSpot[1] + 1)).length == 2 && !(parseInt(+currentSpot[1] + 1) == 9)) kingMoves.push(currentSpot[0] + parseInt(+currentSpot[1] + +1));
            if((currentSpot[0] + parseInt(+currentSpot[1] - 1)).length == 2 && !(parseInt(+currentSpot[1] - 1)) == 0) kingMoves.push(currentSpot[0] + parseInt(+currentSpot[1] - +1));

            for(let i=0;i<kingX.length;i++){
                for(let j=0;j<kingY.length;j++){
                    if((xAxis[kingX[i]] + yAxis[kingY[j]]).length == 2) kingMoves.push(xAxis[kingX[i]] + yAxis[kingY[j]]);    
                }
            }
            
            for(let k=0;k<kingMoves.length;k++){
                if (kingMoves[k].length == 2){
                    if (!(kingMoves[k][1] == 9)){
                        let kingPossibilities = document.getElementById(kingMoves[k]).classList;
                        kingPossibilities.add('allowableMoves');
                        kingPossibilities.remove('dark');
                    }
                }
            }
        break;

        case 'Queen':
            let queenMoves = [];

            for(let i=0;i<xAxis.length;i++){
                if ((xAxis[(xSpot+i)] + yAxis[(ySpot+i)]).length === 2) queenMoves.push(xAxis[(xSpot+i)] + yAxis[(ySpot+i)]);
                if ((xAxis[(xSpot-i)] + yAxis[(ySpot-i)]).length === 2) queenMoves.push(xAxis[(xSpot-i)] + yAxis[(ySpot-i)]);
                if ((xAxis[(xSpot+i)] + yAxis[(ySpot-i)]).length === 2) queenMoves.push(xAxis[(xSpot+i)] + yAxis[(ySpot-i)]);
                if ((xAxis[(xSpot-i)] + yAxis[(ySpot+i)]).length === 2) queenMoves.push(xAxis[(xSpot-i)] + yAxis[(ySpot+i)]);

                if( !(xAxis[i]+currentSpot[1] === currentSpot)) queenMoves.push(xAxis[i]+currentSpot[1]);
                if( !(currentSpot[0]+yAxis[i] === currentSpot)) queenMoves.push(currentSpot[0]+yAxis[i]);
            }

            for(let j=0;j<queenMoves.length;j++){
                let queenPossibilities = document.getElementById(queenMoves[j]).classList;
                queenPossibilities.add('allowableMoves');
                queenPossibilities.remove('dark');
            }
        break;

        case 'Rook':
            let rookMoves = [];

            for (let i=0;i<xAxis.length;i++){
                if( !(xAxis[i]+currentSpot[1] === currentSpot)) rookMoves.push(xAxis[i]+currentSpot[1]);
                if( !(currentSpot[0]+yAxis[i] === currentSpot)) rookMoves.push(currentSpot[0]+yAxis[i]);
            }

            for (let j=0;j<rookMoves.length;j++){
                let rookPossibilities = document.getElementById(rookMoves[j]).classList;
                rookPossibilities.add('allowableMoves');
                rookPossibilities.remove('dark');
            }
        break;

        case 'Bishop':            
            let bishopMoves = [];

            for(let i=0;i<xAxis.length;i++){
                if ((xAxis[(xSpot+i)] + yAxis[(ySpot+i)]).length === 2) bishopMoves.push(xAxis[(xSpot+i)] + yAxis[(ySpot+i)]);
                if ((xAxis[(xSpot-i)] + yAxis[(ySpot-i)]).length === 2) bishopMoves.push(xAxis[(xSpot-i)] + yAxis[(ySpot-i)]);
                if ((xAxis[(xSpot+i)] + yAxis[(ySpot-i)]).length === 2) bishopMoves.push(xAxis[(xSpot+i)] + yAxis[(ySpot-i)]);
                if ((xAxis[(xSpot-i)] + yAxis[(ySpot+i)]).length === 2) bishopMoves.push(xAxis[(xSpot-i)] + yAxis[(ySpot+i)]);
            }

            for(let j=0;j<bishopMoves.length;j++){
                let bishopPossibilities = document.getElementById(bishopMoves[j]).classList;
                bishopPossibilities.add('allowableMoves');
                bishopPossibilities.remove('dark');
            }
        break;

        case 'Knight':
            let knightMoves = [];

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
                    let knightPossibilities = document.getElementById(xAxis[knightX[i]] + yAxis[knightY[j]]).classList;
                        
                    if ((Math.abs(xSpot - knightX[i]) + Math.abs(ySpot - knightY[j])) === 3){
                        knightPossibilities.add('allowableMoves');
                        knightPossibilities.remove('dark');
                        knightMoves.push(xAxis[knightX[i]] + yAxis[knightY[j]]);
                    }
                }
            } 
        break;

        case 'Pawn':
            let pawnMoves = [];

            if((xAxis[xSpot] + (parseInt(yAxis[ySpot])+1)).length == 2 && !(parseInt(yAxis[ySpot])+1 == 9)) pawnMoves.push(xAxis[xSpot] + parseInt(+(yAxis[ySpot]) + +1));
            if( (xAxis[xSpot] + parseInt((yAxis[ySpot])-1)).length == 2 && !(parseInt((yAxis[ySpot])-1)) == 0) pawnMoves.push(xAxis[xSpot] + parseInt((yAxis[ySpot])-1));

            for(let k=0;k<pawnMoves.length;k++){
                if (pawnMoves[k].length == 2){
                    if (!(pawnMoves[k][1] == 9)){
                        let pawnPossibilities = document.getElementById(pawnMoves[k]).classList;
                        pawnPossibilities.add('allowableMoves');
                        pawnPossibilities.remove('dark');
                    }
                }
            }
        break;
    }
}
