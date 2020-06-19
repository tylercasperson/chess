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
        $whiteKing = "<div id='whiteKing' class='piece' draggable='true' ondragstart='drag(event)'>&#x2654;</div>";
        $whiteQueen = "<div id='whiteQueen' class='piece' draggable='true' ondragstart='drag(event)'>&#x2655;</div>";
        $whiteRook = "<div id='whiteRook' class='piece' draggable='true' ondragstart='drag(event)'>&#x2656;</div>";
        $whiteBishop = "<div id='whiteBishop' class='piece' draggable='true' ondragstart='drag(event)'>&#x2657;</div>";
        $whiteKnight = "<div id='whiteKnight' class='piece' draggable='true' ondragstart='drag(event)'>&#x2658;</div>";
        $whitePawn = "<div id='whitePawn' class='piece' draggable='true' ondragstart='drag(event)'>&#x2659;</div>";

        $blackKing = "<div id='blackKing' class='piece' draggable='true' ondragstart='drag(event)'>&#x265A;</div>";
        $blackQueen = "<div id='blackQueen' class='piece' draggable='true' ondragstart='drag(event)'>&#x265B;</div>";
        $blackRook = "<div id='blackRook' class='piece' draggable='true' ondragstart='drag(event)'>&#x265C;</div>";
        $blackBishop = "<div id='blackBishop' class='piece' draggable='true' ondragstart='drag(event)'>&#x265D;</div>";
        $blackKnight = "<div id='blackKnight' class='piece' draggable='true' ondragstart='drag(event)'>&#x265E;</div>";
        $blackPawn = "<div id='blackPawn' class='piece' draggable='true' ondragstart='drag(event)'>&#x265F;</div>";

        echo "<div whitePieces>" . $whiteKing . $whiteQueen . $whiteRook . $whiteBishop . $whiteKnight . $whitePawn . "</div>";
        echo "<div blackPieces>" . $blackKing . $blackQueen . $blackRook . $blackBishop . $blackKnight . $blackPawn . "</div>";
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
                for($column = 0; $column <= 7; $column++){
                    if($column == 0){
                        echo "<td class='yLegend'>" . $yAxis[($row)] . "</td>";
                    }
                    if(($row + $column) % 2 == 0){
                        echo "<td id='" . $xAxis[7-$row] . $yAxis[$column] . "' class='cell dark' ondrop='drop(event)' ondragover='allowDrop(event)'></td>";
                    } else {
                        echo "<td id='" . $xAxis[7-$row] . $yAxis[$column] . "' class='cell light' ondrop='drop(event)' ondragover='allowDrop(event)'></td>";
                    }
                }
                echo "</tr>";
            } 
        ?>
        </tbody>
    </table>
    <script type="text/javascript" src="./assets/javascript/piecesMovement.js"></script>
</body>
</html>