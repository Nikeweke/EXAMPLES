```php
<?php

interface iTemplate {
    public function getHtml();
}



abstract class Golem {

   public function Say(){ echo "Golen say"; }

   abstract public function Cry();


}


class Ork extends Golem  implements iTemplate{


    public function getHtml() {
    	echo "htlm got";
    }


     public function Cry (){
     	echo "Ork says hello";
     }


}


$ork = new Ork;
$ork->Cry();
$ork->getHtml();



```
