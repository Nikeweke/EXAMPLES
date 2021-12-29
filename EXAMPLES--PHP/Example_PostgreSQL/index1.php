<?php

$host = "localhost";
$user = "root";
$password = "";
$db_name = "dbes";

try{
     $db = new PDO("mysql:host=$host;dbname=$db_name", $user, $password);
     $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
     $db->exec("SET NAMES utf8");
   }

   catch(PDOException $e){ echo $e->getMessage();  }


function Generator()
{
  // Символы, которые будут использоваться в пароле.
  $chars="qazxswedcvfrtgbnhyujmkiolp1234567890QAZXSWEDCVFRTGBNHYUJMKIOLP";

  // Количество символов в пароле.
  $max=20;

  // Определяем количество символов в $chars
  $size=StrLen($chars)-1;

  // Определяем пустую переменную, в которую и будем записывать символы.
  $password=null;

  // Создаём пароль.
  while($max--)
  $password.=$chars[rand(0,$size)];

  return $password;

}


// INSERT PROCEDURE
if(isset($_POST['input']))
 {

    $name    = $_POST['name'];
    $surname = $_POST['surname'];
    $posada  = $_POST['posada'];
    $kraina  = $_POST['kraina'];
    $id_kod = Generator();

    // Заносим человека
    $db->exec("CALL insert_emp('$surname', '$name', '$kraina', '$posada')");

     // Присваиваем человеку ID код
    $query1 = $db->query("SELECT id FROM employees WHERE surname = '$surname'");
    $data = $query1->fetch();
    $id = $data['id'];
    $db->exec("INSERT INTO kod(id,kod) VALUES($id,'$id_kod')");
 }

// DEL PROCEDURE
 if(isset($_POST['del_emp']))
  {
    $id_emp = $_POST['id_emp'];

     $query4 = $db->exec("CALL del_emp($id_emp)");
}
?>

<!DOCTYPE html>
<html lang="en">



<head>

  <title>CN | VIEW</title>

  <meta content="CAMPO Network, CN | Friends, CN,  Social Network, Социальная сеть" name=keywords />
  <meta content="CAMPO Network - social network" name=description />

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

<!-- BOOTER --> <link rel="stylesheet" href="booter/css/bootstrap.css" >
<!-- BOOTER --> <script src="booter/js/bootstrap.min.js"></script>

<style>

body{ background-image: url('9.png'); }

</style>


</head>



<body >


    <br> <br>

<div class="container-fluid">
  <div class="row">


 <!-- CONTENT -->
    <div id="content" class="col-sm-8 col-md-offset-2">
        <div class="row">

              <div class="col-sm-11 well">
                <h2><span class="glyphicon glyphicon-user"></span> Ввести данные </h2>
                <hr>
                <form action="index1.php" method="post">
                     <div class="form-group">
                       <label>Surname</label>
                       <input type="text" name="surname" class="form-control"  placeholder="Input surname" required>
                     </div>

                     <div class="form-group">
                       <label>Name</label>
                       <input type="text" name="name" class="form-control"  placeholder="Input Name" required>
                     </div>

                     <div class="form-group">
                       <label>Posada</label>
                       <select name="posada"  class="form-control">
                         <option selected value="1">Director</option>
                         <option value="2">PHP-scenarist</option>
                         <option value="3">JS-scenarist</option>
                         <option value="4">HTML-designer</option>
                         <option  value="5">Courier</option>
                        </select>
                     </div>

                     <div class="form-group">
                       <label>Kraina</label>
                       <select name="kraina"  class="form-control">
                         <option selected value="1">UKRAINE</option>
                         <option value="2">USA</option>
                         <option value="3">AFGANISTAN</option>
                         <option value="4">RUSSIA</option>
                         <option value="5">GERMANY</option>
                        </select>
                     </div>


                     <button type="submit" name="input" class="btn btn-default">Procedure 1 of insert into Employees</button>
                    </form>
              </div>



              <div class="col-sm-11 well" >
                <h2><span class="glyphicon glyphicon-th"></span> Procedure 2. Delete Employee</h2>
                <hr>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Surname</th>
                      <th>Name</th>
                      <th>Kraina</th>
                      <th>Posada</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php

                    $query = $db->query("SELECT * FROM emp_kr_pos");
                    while($data1 = $query->fetch(PDO::FETCH_ASSOC) )
                     {  ?>
                          <tr>
                            <td><?php echo $data1['surname']; ?></td>
                            <td><?php echo $data1['name']; ?></td>
                            <td><?php echo $data1['kraina']; ?></td>
                            <td><?php echo $data1['posada']; ?></td>
                            <td>
                                <form action="index1.php" method="post">
                                       <input type="hidden" name="id_emp" value="<?php echo $data1['id'];  ?>">
                                      <button name="del_emp" type="submit" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove"></span> Удалить работника</button>
                                </form>
                            </td>
                          </tr>
              <?php } ?>


                  </tbody>
                </table>
              </div>


              <div class="col-sm-11 well" >
                <h2><span class="glyphicon glyphicon-th"></span> VIEW 2. ID KOD</h2>
                <hr>
                <small>SQL = CREATE VIEW emp_kod AS SELECT employees.name, kod.kod FROM employees,kod WHERE employees.id = kod.id </small>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>NAME EMP</th>
                      <th>KOD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php

                    $query = $db->query("SELECT * FROM emp_kod");
                    while($data1 = $query->fetch(PDO::FETCH_ASSOC))
                     {  ?>
                          <tr>
                            <td><?php echo $data1['name']; ?></td>
                            <td><?php echo $data1['kod']; ?></td>
                          </tr>
              <?php } ?>


                  </tbody>
                </table>
              </div>


<div class="col-sm-11 well" >
              <h2><span class="glyphicon glyphicon-th"></span> LOG</h2>
              <hr>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>ACTION</th>
                    <th>TIME</th>
                  </tr>
                </thead>
                <tbody>
                  <?php

                  $query = $db->query("SELECT * FROM log");
                  while($data1 = $query->fetch(PDO::FETCH_ASSOC))
                   {  ?>
                        <tr>
                          <td><?php echo $data1['action']; ?></td>
                          <td><?php echo $data1['time']; ?></td>
                        </tr>
            <?php } ?>


                </tbody>
              </table>
  </div>

          <div class="col-sm-11 well" >
            <h2><span class="glyphicon glyphicon-th"></span> View I</h2>
            <hr>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Surname</th>
                  <th>Name</th>
                  <th>Kraina</th>
                  <th>Posada</th>
                </tr>
              </thead>
              <tbody>
                <?php

                $query = $db->query("SELECT * FROM emp_kr_pos");
                $query->setFetchMode(PDO::FETCH_ASSOC);
                while($data1 = $query->fetch())
                 {  ?>
                      <tr>
                        <td><?php echo $data1['surname']; ?></td>
                        <td><?php echo $data1['name']; ?></td>
                        <td><?php echo $data1['kraina']; ?></td>
                        <td><?php echo $data1['posada']; ?></td>
                      </tr>
          <?php } ?>


              </tbody>
            </table>
          </div>


        </div>
    </div>
 <!-- CONTENT -->

  </div>
</div>


<!-- FOOT -->


</body>
</html>
