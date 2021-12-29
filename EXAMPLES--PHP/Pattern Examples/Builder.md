```php
<?php
class Builder {

   private $human = 'Human == ';

   function addHead(){
       $this->human .=  'head ----';
       return $this;
   }

   function addHands(){
      $this->human .=  'hands ----';
      return $this;
   }

   function addLegs(){
     $this->human .=  'legs ----';
     return $this;
   }

   function addBody(){
     $this->human .=  'body ----';
     return $this;
   }

   function __toString(){
      return $this->human;
   }


}


$builder = new Builder;
$builder->addHead()->addHands();

echo $builder;
```
