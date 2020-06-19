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
    <?php
        $whiteKing = "<div id='whiteKing' class='piece king' draggable='true' ondragstart='drag(event)'>&#x2654;</div>";
        $whiteQueen = "<div id='whiteQueen' class='piece queen' draggable='true' ondragstart='drag(event)'>&#x2655;</div>";
        $whiteRook = "<div id='whiteRook' class='piece rook' draggable='true' ondragstart='drag(event)'>&#x2656;</div>";
        $whiteBishop = "<div id='whiteBishop' class='piece bishop' draggable='true' ondragstart='drag(event)'>&#x2657;</div>";
        $whiteKnight = "<div id='whiteKnight' class='piece knight' draggable='true' ondragstart='drag(event)'>&#x2658;</div>";
        $whitePawn = "<div id='whitePawn' class='piece pawn' draggable='true' ondragstart='drag(event)'>&#x2659;</div>";

        $blackKing = "<div id='blackKing' class='piece king' draggable='true' ondragstart='drag(event)'>&#x265A;</div>";
        $blackQueen = "<div id='blackQueen' class='piece queen' draggable='true' ondragstart='drag(event)'>&#x265B;</div>";
        $blackRook = "<div id='blackRook' class='piece rook' draggable='true' ondragstart='drag(event)'>&#x265C;</div>";
        $blackBishop = "<div id='blackBishop' class='piece bishop' draggable='true' ondragstart='drag(event)'>&#x265D;</div>";
        $blackKnight = "<div id='blackKnight' class='piece knight' draggable='true' ondragstart='drag(event)'>&#x265E;</div>";
        $blackPawn = "<div id='blackPawn' class='piece pawn' draggable='true' ondragstart='drag(event)'>&#x265F;</div>";
        
        echo "<div whitePieces ondrop='drop(event)' ondragover='allowDrop(event)'>" . $whiteKing . $whiteQueen . $whiteRook . $whiteRook . $whiteBishop . $whiteBishop . $whiteKnight . $whiteKnight . $whitePawn . $whitePawn . $whitePawn . $whitePawn . $whitePawn . $whitePawn . $whitePawn . $whitePawn . "</div>";
        echo "<div blackPieces ondrop='drop(event)' ondragover='allowDrop(event)'>" . $blackKing . $blackQueen . $blackRook . $blackRook . $blackBishop . $blackBishop . $blackKnight . $blackKnight . $blackPawn . $blackPawn . $blackPawn . $blackPawn . $blackPawn . $blackPawn . $blackPawn . $blackPawn . "</div>";
    ?>

    <table>
        <tbody>
        <?php
            $xAxis = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
            $yAxis = array('8', '7', '6', '5', '4', '3', '2', '1');

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
                echo "<td class='yLegend'>" . $yAxis[($row)] . "</td>";
                for($column = 0; $column <= 7; $column++){
                    if(($row + $column) % 2 == 0){
                        echo "<td id='" . $xAxis[7-$row] . $yAxis[$column] . "' class='cell light' ondrop='drop(event)' ondragover='allowDrop(event)'></td>";
                    } else {
                        echo "<td id='" . $xAxis[7-$row] . $yAxis[$column] . "' class='cell dark' ondrop='drop(event)' ondragover='allowDrop(event)'></td>";
                    }
                }
                echo "<td class='yLegend'>" . $yAxis[($row)] . "</td>";
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
    <script type="text/javascript" src="./assets/javascript/piecesMovement.js"></script>
</body>
</html>