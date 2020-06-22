<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess</title>
    <link rel="stylesheet" type="text/css" href="./assets/css/reset.css" />
    <link rel="stylesheet" type="text/css" href="./assets/css/style.css" />
</head>

<body>
<script type="text/javascript" src="./assets/javascript/piecesMovement.js"></script>
    <?php
        $oldSpot = "document.getElementById(e.target.id).parentNode.id;";

        $whiteKing1 = "<div id='whiteKing1' class='piece king' draggable='true' ondragstart=\"drag(event)\">&#x2654;</div>";
        $whiteQueen1 = "<div id='whiteQueen1' class='piece queen' draggable='true' ondragstart=\"drag(event)\">&#x2655;</div>";
        $whiteRook1 = "<div id='whiteRook1' class='piece rook' draggable='true' ondragstart=\"drag(event)\">&#x2656;</div>";
        $whiteRook2 = "<div id='whiteRook2' class='piece rook' draggable='true' ondragstart=\"drag(event)\">&#x2656;</div>";
        $whiteBishop1 = "<div id='whiteBishop1' class='piece bishop' draggable='true' ondragstart=\"drag(event)\">&#x2657;</div>";
        $whiteBishop2 = "<div id='whiteBishop2' class='piece bishop' draggable='true' ondragstart=\"drag(event)\">&#x2657;</div>";
        $whiteKnight1 = "<div id='whiteKnight1' class='piece knight' draggable='true' ondragstart=\"drag(event)\">&#x2658;</div>";
        $whiteKnight2 = "<div id='whiteKnight2' class='piece knight' draggable='true' ondragstart=\"drag(event)\">&#x2658;</div>";
        $whitePawn1 = "<div id='whitePawn1' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x2659;</div>";
        $whitePawn2 = "<div id='whitePawn2' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x2659;</div>";
        $whitePawn3 = "<div id='whitePawn3' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x2659;</div>";
        $whitePawn4 = "<div id='whitePawn4' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x2659;</div>";
        $whitePawn5 = "<div id='whitePawn5' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x2659;</div>";
        $whitePawn6 = "<div id='whitePawn6' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x2659;</div>";
        $whitePawn7 = "<div id='whitePawn7' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x2659;</div>";
        $whitePawn8 = "<div id='whitePawn8' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x2659;</div>";

        $blackKing1 = "<div id='blackKing1' class='piece king' draggable='true' ondragstart=\"drag(event)\">&#x265A;</div>";
        $blackQueen1 = "<div id='blackQueen1' class='piece queen' draggable='true' ondragstart=\"drag(event)\">&#x265B;</div>";
        $blackRook1 = "<div id='blackRook1' class='piece rook' draggable='true' ondragstart=\"drag(event)\">&#x265C;</div>";
        $blackRook2 = "<div id='blackRook2' class='piece rook' draggable='true' ondragstart=\"drag(event)\">&#x265C;</div>";
        $blackBishop1 = "<div id='blackBishop1' class='piece bishop' draggable='true' ondragstart=\"drag(event)\">&#x265D;</div>";
        $blackBishop2 = "<div id='blackBishop2' class='piece bishop' draggable='true' ondragstart=\"drag(event)\">&#x265D;</div>";
        $blackKnight1 = "<div id='blackKnight1' class='piece knight' draggable='true' ondragstart=\"drag(event)\">&#x265E;</div>";
        $blackKnight2 = "<div id='blackKnight2' class='piece knight' draggable='true' ondragstart=\"drag(event)\">&#x265E;</div>";
        $blackPawn1 = "<div id='blackPawn1' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x265F;</div>";
        $blackPawn2 = "<div id='blackPawn2' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x265F;</div>";
        $blackPawn3 = "<div id='blackPawn3' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x265F;</div>";
        $blackPawn4 = "<div id='blackPawn4' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x265F;</div>";
        $blackPawn5 = "<div id='blackPawn5' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x265F;</div>";
        $blackPawn6 = "<div id='blackPawn6' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x265F;</div>";
        $blackPawn7 = "<div id='blackPawn7' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x265F;</div>";
        $blackPawn8 = "<div id='blackPawn8' class='piece pawn' draggable='true' ondragstart=\"drag(event)\">&#x265F;</div>";


        echo "<div id='whitePieces' ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\">" . $whiteKing1 . $whiteQueen1 . $whiteRook1 . $whiteRook2 . $whiteBishop1 . $whiteBishop2 . $whiteKnight1 . $whiteKnight2 . $whitePawn1 . $whitePawn2 . $whitePawn3 . $whitePawn4 . $whitePawn5 . $whitePawn6 . $whitePawn7 . $whitePawn8 . "</div>";
        echo "<div id='blackPieces' ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\">" . $blackKing1 . $blackQueen1 . $blackRook1 . $blackRook2 . $blackBishop1 . $blackBishop2 . $blackKnight1 . $blackKnight2 . $blackPawn1 . $blackPawn2 . $blackPawn3 . $blackPawn4 . $blackPawn5 . $blackPawn6 . $blackPawn7 . $blackPawn8 . "</div>";
    ?>

    <table>
        <tbody>
        <?php
            $xAxis = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
            $yAxis = array('1', '2', '3', '4', '5', '6', '7', '8');

            echo "<tr>";
            for($x=0;$x<8;$x++){
                if($x==0){
                    echo "<td></td>";
                }
                echo "<td class='xLegend'>" . $xAxis[$x] . "</td>";
            }
            echo "</tr>";

            for($row = 0; $row <= 7; $row++){
                echo "<tr class='row'>"; 
                echo "<td class='yLegend'>" . $yAxis[(7-$row)] . "</td>";
                for($column = 0; $column <= 7; $column++){
                    if(($row + $column) % 2 == 0){
                        echo "<td id='" . $xAxis[$column] . $yAxis[7-$row] . "' class='cell light lt' ondrop='drop(event)' ondragover='allowDrop(event)'></td>";
                    } else {
                        echo "<td id='" . $xAxis[$column] . $yAxis[7-$row] . "' class='cell dark dk' ondrop='drop(event)' ondragover='allowDrop(event)'></td>";
                    }
                }
                echo "<td class='yLegend'>" . $yAxis[(7-$row)] . "</td>";
                echo "</tr>";
            } 

            echo "<tr>";
            for($x=0;$x<8;$x++){
                if($x==0){
                    echo "<td></td>";
                }
                echo "<td class='xLegend'>" . $xAxis[$x] . "</td>";
            }
            echo "</tr>";
        ?>
        </tbody>
    </table>
    
</body>
</html>