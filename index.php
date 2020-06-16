<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess</title>
    <link rel="stylesheet" type="text/css" href="./assets/css/reset.css">
    <link rel="stylesheet" type="text/css" href="./assets/css/style.css">
</head>
<body>
    <table>
        <?php
            $xAxis = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
            $yAxis = array('8', '7', '6', '5', '4', '3', '2', '1');
          
            echo "<tr>";
            for($y=0;$y<8;$y++){
                if($y==0){
                    echo "<td></td>";
                }
                echo "<td class='legend'>" . $yAxis[$y] . "</td>";
            }
            echo "</tr>";

            for($row = 0; $row <= 7; $row++){
                echo "<tr class='row'>"; 
                for($column = 0; $column <= 7; $column++){
                    if($column == 0){
                        echo "<td class='legend'>" . $xAxis[(7-$row)] . "</td>";
                    }
                    if(($row + $column) % 2 == 0){
                        echo "<td id='" . $xAxis[$column] . $yAxis[$row] . "' class='dark'></td>";
                    } else {
                        echo "<td id='" . $xAxis[$column] . $yAxis[$row] . "' class='light'></td>";
                    }
                }
                echo "</tr>";
            }
        ?>
    </table>
</body>
</html>