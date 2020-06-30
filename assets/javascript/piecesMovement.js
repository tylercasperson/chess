
drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);
    if(e.target.length === 1){
        return;
    } 
    let currentSpot = document.getElementById(e.target.id).parentNode.id;

    removeOptions = () => {
        if (!(currentSpot == 'blackPieces' || currentSpot == 'whitePieces')) {     
            let chessPiece = e.target.id.slice(5,-1);
            var possibleMoves = document.getElementsByClassName('possibleMoves');        
            var allowableMoves = document.getElementsByClassName('allowableMoves');        
            piecesMovement(currentSpot, chessPiece);        
            document.getElementById(currentSpot).classList.add('youAreHere');
            
            for(let i=0;i<possibleMoves.length;i++){
                if(possibleMoves[i].classList.contains('dk')) possibleMoves[i].classList.add('dark');
                if(possibleMoves[i].childNodes.length == 1){
                    if(possibleMoves[i].childNodes[0].id.substring(0,5) == e.target.id.substring(0,5)){
                        possibleMoves[i].classList.remove('possibleMoves');
                    }
                }
            }

            for(let i=0;i<allowableMoves.length;i++){
                if(allowableMoves[i].classList.contains('dk')) allowableMoves[i].classList.add('dark');
                if(allowableMoves[i].childNodes.length == 1){
                    if(allowableMoves[i].childNodes[0].id.substring(0,5) == e.target.id.substring(0,5)){
                        allowableMoves[i].classList.remove('allowableMoves');
                    }
                }
            }
        }
    }
    removeOptions();
}

allowDrop = (e) => e.preventDefault();

drop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData('text');
    let currentSpot = document.getElementById(e.target.id).id;
    let oldSpot = document.getElementsByClassName('youAreHere');
    let possibleMoves = document.getElementsByClassName('possibleMoves');        
    let allowableMoves = document.getElementsByClassName('allowableMoves');        
    let highlightedCells = [];
    let battleCell = document.getElementById(document.getElementById(currentSpot).id);

    for(let i=0;i<possibleMoves.length;i++){                
        highlightedCells.push(possibleMoves[i].attributes[0].nodeValue);
    }

    for(let i=0;i<allowableMoves.length;i++){                
        highlightedCells.push(allowableMoves[i].attributes[0].nodeValue);
    }

    removeHighlights = () => {
        for(let j=0;j<highlightedCells.length;j++){
            let highlightedMoves = document.getElementById(highlightedCells[j]);
            highlightedMoves.classList.remove('possibleMoves');
            highlightedMoves.classList.remove('allowableMoves');
            if(highlightedMoves.classList.contains('dk')) highlightedMoves.classList.add('dark');
        }  
    }

    checkMovement = () => {
        checkKing = () => {

        }

        if(highlightedCells.length>0){    
            if(currentSpot.length === 2){
                var thisSpot = currentSpot;
            } else {
                var thisSpot = document.getElementById(currentSpot).parentElement.id;
            }
            if(!(highlightedCells.indexOf(thisSpot) === -1)){
                if(battleCell.childNodes.length == 1 ){
                    if( !(currentSpot.substring(0,5) === data.substring(0,5))){
                        if(currentSpot.length == 2){
                            document.getElementById(document.getElementById(currentSpot).childNodes[0].id.substring(0,5)+'Pieces').append(document.getElementById(currentSpot).childNodes[0]);                        
                            e.target.appendChild(document.getElementById(data));
                        } else {
                            document.getElementById(document.getElementById(battleCell.id).parentNode.id).append(document.getElementById(data));
                            document.getElementById(battleCell.id.slice(0,5)+'Pieces').append(battleCell); 
                        }
                    }
                } else {
                    if(!(highlightedCells.indexOf(currentSpot) === -1)){
                        e.target.appendChild(document.getElementById(data));
                    }
                }
            }
            oldSpot[0].classList.remove('youAreHere');
            removeHighlights();
        }
    }

    //this is needed for development but will be removed in production.. probably will be replaced with buttons to start the game
    if(highlightedCells.length === 0){
        if(e.target.innerText.length === 0){
        e.target.appendChild(document.getElementById(data));
        return;
       }
    }
    checkMovement();
}

piecesMovement = (currentSpot, chessPiece) => {    
    const xAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const yAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

    let xSpot = xAxis.indexOf(currentSpot.split('')[0]);
    let ySpot = yAxis.indexOf(currentSpot.split('')[1]);

    afterMovement = (direction) =>{
        let allowableHighlights = document.getElementsByClassName('possibleMoves');
        
        addDark = () => {
            for(let i=0;i<allowableHighlights.length;i++){
                let highlightedMoves = document.getElementById(allowableHighlights[i].id);
                if(highlightedMoves.classList.contains('dk')) highlightedMoves.classList.add('dark');
            }  
        }
        
        switch(direction){
            case 'horizontal':
                for(let i=(xSpot+1);i<xAxis.length;i++){
                    if(document.getElementById(xAxis[i]+currentSpot[1]).childNodes.length === 1){
                        if(!(document.getElementById(xAxis[i]+currentSpot[1]).childNodes[0].id.substring(0,5) === document.getElementById(currentSpot).childNodes[0].id.substring(0,5))){
                            document.getElementById(xAxis[i]+currentSpot[1]).classList.add('allowableMoves');
                            addDark();
                            break;
                        } else {
                            addDark();
                            break;
                        }    
                    }
                    document.getElementById(xAxis[i]+currentSpot[1]).classList.add('allowableMoves');
                }
    
                for(let i=(xSpot-1);i>-1;i--){
                    if(document.getElementById(xAxis[i]+currentSpot[1]).childNodes.length === 1){
                        if(!(document.getElementById(xAxis[i]+currentSpot[1]).childNodes[0].id.substring(0,5) === document.getElementById(currentSpot).childNodes[0].id.substring(0,5))){
                            document.getElementById(xAxis[i]+currentSpot[1]).classList.add('allowableMoves');
                            break;
                        } else {
                            break;
                        }    
                    }
                    document.getElementById(xAxis[i]+currentSpot[1]).classList.add('allowableMoves');
                }
            break;
            case 'vertical':
                for(let i=(ySpot+1);i<yAxis.length;i++){
                    if(document.getElementById(currentSpot[0] + yAxis[i]).childNodes.length === 1){
                        if(!(document.getElementById(currentSpot[0] + yAxis[i]).childNodes[0].id.substring(0,5) === document.getElementById(currentSpot).childNodes[0].id.substring(0,5))){
                            document.getElementById(currentSpot[0] + yAxis[i]).classList.add('allowableMoves');
                            addDark();
                            break;
                        } else {
                            addDark();
                            break;
                        }    
                    }
                    document.getElementById(currentSpot[0] + yAxis[i]).classList.add('allowableMoves');
                }
    
                for(let i=(ySpot-1);i>-1;i--){
                    if(document.getElementById(currentSpot[0] + yAxis[i]).childNodes.length === 1){
                        if(!(document.getElementById(currentSpot[0] + yAxis[i]).childNodes[0].id.substring(0,5) === document.getElementById(currentSpot).childNodes[0].id.substring(0,5))){
                            document.getElementById(currentSpot[0] + yAxis[i]).classList.add('allowableMoves');
                            break;
                        } else {
                            break;
                        }    
                    }
                    document.getElementById(currentSpot[0] + yAxis[i]).classList.add('allowableMoves');
                }
            break;
            case 'diagonal':

                checkPlacement = (diagonalArray) => {
                    for(let i=0;i<diagonalArray.length;i++){
                        let spotCheck = document.getElementById(diagonalArray[i]);
        
                        if(spotCheck.childNodes.length === 1){
                            if(!(spotCheck.childNodes[0].id.substring(0,5) === document.getElementById(currentSpot).childNodes[0].id.substring(0,5))){
                                spotCheck.classList.add('allowableMoves');
                                addDark();
                                break;
                            } else {
                                addDark();
                                break;
                            }
                        }
                        spotCheck.classList.add('allowableMoves');
                    }
                }

                if(document.getElementById(xAxis[(xSpot+1)]+yAxis[(ySpot+1)]).childElementCount === 0 || !(document.getElementById(xAxis[(xSpot+1)]+yAxis[(ySpot+1)]).childNodes[0].id.substring(0,5) === document.getElementById(currentSpot).childNodes[0].id.substring(0,5)) ){
                    let NEarray = [];
                    NEarray.push(xAxis[(xSpot+1)]+yAxis[(ySpot+1)]);
                    for(let i=0;i<Math.min((xAxis.length-(xSpot+1)),(yAxis.length-(ySpot+1)));i++){
                        let NEdirection = xAxis[(xAxis.indexOf(NEarray[(NEarray.length-1)][0])+1)] + yAxis[(yAxis.indexOf(NEarray[(NEarray.length-1)][1])+1)];    
                            if(NEdirection.length === 2){
                                NEarray.push(NEdirection);                        
                            }
                    }
                    checkPlacement(NEarray);
                }
                
                if(document.getElementById(xAxis[(xSpot+1)]+yAxis[(ySpot-1)]).childElementCount === 0 || !(document.getElementById(xAxis[(xSpot+1)]+yAxis[(ySpot-1)]).childNodes[0].id.substring(0,5) === document.getElementById(currentSpot).childNodes[0].id.substring(0,5)) ){
                    let SEarray = [];
                    SEarray.push(xAxis[(xSpot+1)]+yAxis[(ySpot-1)]);
                    for(let i=0;i<Math.min((xAxis.length-(xSpot+1)),(yAxis.length-(ySpot-1)))+1;i++){
                        let southEast = xAxis[(xAxis.indexOf(SEarray[(SEarray.length-1)][0])+1)] + yAxis[(yAxis.indexOf(SEarray[(SEarray.length-1)][1])-1)];
                        if(southEast.length === 2){
                            SEarray.push(southEast);
                        }
                    }
                    checkPlacement(SEarray);
                }
                
                if(document.getElementById(xAxis[(xSpot-1)]+yAxis[(ySpot-1)]).childElementCount === 0 || !(document.getElementById(xAxis[(xSpot-1)]+yAxis[(ySpot-1)]).childNodes[0].id.substring(0,5) === document.getElementById(currentSpot).childNodes[0].id.substring(0,5)) ){
                    let SWarray = [];
                    SWarray.push(xAxis[(xSpot-1)]+yAxis[(ySpot-1)]);
                    for(let i=0;i<Math.min((xAxis.length-(xSpot-1)),(yAxis.length-(ySpot-1)))+1;i++){
                        let southWest = xAxis[(xAxis.indexOf(SWarray[(SWarray.length-1)][0])-1)] + yAxis[(yAxis.indexOf(SWarray[(SWarray.length-1)][1])-1)];
                        if(southWest.length === 2){
                            SWarray.push(southWest);
                        }
                    }
                    checkPlacement(SWarray);
                }

                if(document.getElementById(xAxis[(xSpot-1)]+yAxis[(ySpot+1)]).childElementCount === 0 || !(document.getElementById(xAxis[(xSpot-1)]+yAxis[(ySpot+1)]).childNodes[0].id.substring(0,5) === document.getElementById(currentSpot).childNodes[0].id.substring(0,5)) ){
                    let NWarray = [];
                    NWarray.push(xAxis[(xSpot-1)]+yAxis[(ySpot+1)]);
                    for(let i=0;i<Math.min((xAxis.length-(xSpot-1)),(yAxis.length-(ySpot-1)))+1;i++){
                        let northWest = xAxis[(xAxis.indexOf(NWarray[(NWarray.length-1)][0])-1)] + yAxis[(yAxis.indexOf(NWarray[(NWarray.length-1)][1])+1)];
                        if(northWest.length === 2){
                            NWarray.push(northWest);
                        }
                    }
                    checkPlacement(NWarray);
                }
            break;
        }
    }

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
                queenPossibilities.add('possibleMoves');
                queenPossibilities.remove('dark');
            }
            afterMovement('horizontal');
            afterMovement('vertical');
            afterMovement('diagonal');
        break;

        case 'Rook':
            let rookMoves = [];

            for (let i=0;i<xAxis.length;i++){
                if( !(xAxis[i]+currentSpot[1] === currentSpot)) rookMoves.push(xAxis[i]+currentSpot[1]);
                if( !(currentSpot[0]+yAxis[i] === currentSpot)) rookMoves.push(currentSpot[0]+yAxis[i]);
            }

            for (let j=0;j<rookMoves.length;j++){
                let rookPossibilities = document.getElementById(rookMoves[j]).classList;
                rookPossibilities.add('possibleMoves');
                rookPossibilities.remove('dark');
            }
            afterMovement('horizontal');
            afterMovement('vertical');
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
                bishopPossibilities.add('possibleMoves');
                bishopPossibilities.remove('dark');
            }
            afterMovement('diagonal');
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

            //still need to remove a pawn from moving backwards


            if((xAxis[xSpot] + (parseInt(yAxis[ySpot])+1)).length == 2 && !(parseInt(yAxis[ySpot])+1 == 9)) pawnMoves.push(xAxis[xSpot] + parseInt(+(yAxis[ySpot]) + +1));
            if( (xAxis[xSpot] + parseInt((yAxis[ySpot])-1)).length == 2 && !(parseInt((yAxis[ySpot])-1)) == 0) pawnMoves.push(xAxis[xSpot] + parseInt((yAxis[ySpot])-1));

            let movingPawn = document.getElementById(document.getElementById(currentSpot).childNodes[0].id); 

            //A pawn can move two squares forward on the first move
            if(movingPawn.classList.contains('first')){
                if(currentSpot[1] == 2 || currentSpot[1] == 7){
                    if((xAxis[xSpot] + (parseInt(yAxis[ySpot])+1)).length == 2 && !(parseInt(yAxis[ySpot])+2 == 9)) pawnMoves.push(xAxis[xSpot] + parseInt(+(yAxis[ySpot]) + 2));
                    if( (xAxis[xSpot] + parseInt((yAxis[ySpot])-1)).length == 2 && !(parseInt((yAxis[ySpot])-2)) == 0) pawnMoves.push(xAxis[xSpot] + parseInt(+(yAxis[ySpot]) - 2));
                    movingPawn.classList.remove('first');
                }
            }

            let northEast = document.getElementById(xAxis[xAxis.indexOf(currentSpot[0])+1] + yAxis[yAxis.indexOf(currentSpot[1])+1]);
            let northWest = document.getElementById(xAxis[xAxis.indexOf(currentSpot[0])-1] + yAxis[yAxis.indexOf(currentSpot[1])+1]);
            let southEast = document.getElementById(xAxis[xAxis.indexOf(currentSpot[0])+1] + yAxis[yAxis.indexOf(currentSpot[1])-1]);
            let southWest = document.getElementById(xAxis[xAxis.indexOf(currentSpot[0])-1] + yAxis[yAxis.indexOf(currentSpot[1])-1]);
            let currentColor = document.getElementById(currentSpot).childNodes[0].id.slice(0,5);
            
            if(northEast.childNodes.length == 1){
                if(!(currentColor == northEast.childNodes[0].id.slice(0,5))){
                    pawnMoves.push(northEast.id);
                }
            } 
            if(northWest.childNodes.length == 1){
                if(!(currentColor == northWest.childNodes[0].id.slice(0,5))){
                    pawnMoves.push(northWest.id);
                }
            } 
            if(southEast.childNodes.length == 1){
                if(!(currentColor == southEast.childNodes[0].id.slice(0,5))){
                    pawnMoves.push(southEast.id);      
                }
            } 
            if(southWest.childNodes.length == 1){
                if(!(currentColor == southWest.childNodes[0].id.slice(0,5))){
                    pawnMoves.push(southWest.id);
                }
            } 

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
