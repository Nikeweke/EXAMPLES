
<?php

// Make Array from response RethinkDB
function CreateRsArray($query)
 {
    if(! $query){ die("Shit"); }

     $rs = array();
     foreach($query as $item)
     {
       $rs[] = $item;
     }

     return $rs;
 }



// DEBUG - FUNC
function d($value = null, $die = 1)
 {
  $empty = $value == "" ? "Yes" : "No";
  echo "=====================================-> Debug (Value is empty -> $empty): <br><pre>";
  print_r($value);
  echo "</pre>";

  if($die == 1) die;
 }
