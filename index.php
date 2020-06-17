<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess</title>
    <link rel="stylesheet" type="text/css" href="./assets/css/reset.css" />
    <link rel="stylesheet" type="text/css" href="./assets/css/style.css?" />
</head>
<body>
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
                        echo "<td id='" . $xAxis[7-$row] . $yAxis[$column] . "' class='cell dark'></td>";
                    } else {
                        echo "<td id='" . $xAxis[7-$row] . $yAxis[$column] . "' class='cell light'></td>";
                    }
                }
                echo "</tr>";
            } 
        ?>
        </tbody>
    </table>
</body>
</html>