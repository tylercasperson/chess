
drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);
    let currentSpot = document.getElementById(e.target.id).parentNode.id;

    if (!(currentSpot == 'blackPieces' || currentSpot == 'whitePieces')) {     
        let chessPiece = e.target.id.slice(5,-1);
        piecesMovement(currentSpot, chessPiece);        
        document.getElementById(currentSpot).classList.add('youAreHere');
    }
}

allowDrop = (e) => e.preventDefault();

drop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData('text');
    let currentSpot = document.getElementById(e.target.id).id;
    let allowableMoves = document.getElementsByClassName('allowableMoves');        
    let highlightedCells = [];

    for(let i=0;i<allowableMoves.length;i++){                
        highlightedCells.push(allowableMoves[i].attributes[0].nodeValue);
    }

    removeHighlights = () => {
        for(let j=0;j<highlightedCells.length;j++){
            let highlightedMoves = document.getElementById(highlightedCells[j]);
            highlightedMoves.classList.remove('allowableMoves');
            if(highlightedMoves.classList.contains('dk')) highlightedMoves.classList.add('dark');
        }  
    }

    checkMovement = () => {
        let oldSpot = document.getElementsByClassName('youAreHere');
        if(!(oldSpot.length === 0)){
            if(highlightedCells.indexOf(currentSpot) === -1){
                if( !(document.getElementById(currentSpot).parentNode.id.slice(5,11) === 'Pieces')) {
                    if(!(document.getElementById(document.getElementById(currentSpot).childNodes[0]) === null) ){
                        if(!(document.getElementById(document.getElementById(currentSpot).childNodes[0].id) === '') ){
                            document.getElementById(oldSpot[0].id).append(document.getElementById(document.getElementById(currentSpot).childNodes[0].id));   
                        }    
                    }
                }
            }
            oldSpot[0].classList.remove('youAreHere');
        }
        removeHighlights();
    }

    if (document.getElementById(currentSpot).innerText == ''){
        if(e.target.classList.contains('piece')) {
            return;
        } else {
            e.target.appendChild(document.getElementById(data));
            checkMovement();
        }
    } else {
        let battleCell = document.getElementById(document.getElementById(currentSpot).id);
        
        if(data == battleCell.id || document.getElementById(currentSpot).parentNode.id == battleCell.id) {
            return;
        } else {
            if(document.getElementById(document.getElementById(battleCell.id).parentNode.id) === null){
                checkMovement();
                return;
            } 
            if(highlightedCells.indexOf(document.getElementById(document.getElementById(battleCell.id).parentNode.id).id) === -1 ){
                checkMovement();
                return;
            } else {
                if ( (document.getElementById(document.getElementById(battleCell.id).parentNode.id)) == null) {
                    document.getElementById(currentSpot).append(document.getElementById(data));
                    document.getElementById(document.getElementById(currentSpot).childNodes[0].id.slice(0,5)+'Pieces').append(battleCell.childNodes[0]);
                } else {
                        document.getElementById(document.getElementById(battleCell.id).parentNode.id).append(document.getElementById(data));
                        document.getElementById(battleCell.id.slice(0,5)+'Pieces').append(battleCell);
                }
            }
            checkMovement();
        }
    }
}

piecesMovement = (currentSpot, chessPiece) => {
    const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const yAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

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

            let knightX = [xSpot + 2, xSpot - 2, xSpot + 1, xSpot - 1].filter(function(cellPosition){
                return (cellPosition > -1 && cellPosition < 8);
            });
            let knightY = [ySpot + 2, ySpot - 2, ySpot + 1, ySpot - 1].filter(function(cellPosition){
                return (cellPosition > -1 && cellPosition < 8);
            });

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
