
###### index.php
```php
<?php

include 'providers.php';

class Man {

    private $foodProvider;

    public function __construct(FoodProvider $foodProvider){

    	$this->foodProvider = $foodProvider;
    }


    public function Eat(){

    	$food = $this->foodProvider->getFood();

    	print_r($food);
    }

}

$wife      = new Wife;
$restraunt = new Restraunt;


$usual_man = new Man($wife);
$usual_man->Eat();

$bussines_man = new Man($restraunt);
$bussines_man->Eat();

```

###### providers.php
```php
<?php

interface FoodProvider {
   public function getFood();
}


class Wife implements FoodProvider {

    public function getFood(){
    	return ['Борщ', 'Пиво', 'Гречка'];
    }

}



class Restraunt implements FoodProvider {

    public function getFood(){
    	return ['Фуагра', 'Риззото', 'Вино'];
    }

}



```
