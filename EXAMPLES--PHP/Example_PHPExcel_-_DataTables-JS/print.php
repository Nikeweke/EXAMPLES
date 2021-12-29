<?php

/** Error reporting */
error_reporting(E_ALL);

/** Include path **/
ini_set('include_path', ini_get('include_path').';../Classes/');

/** PHPExcel */
include 'PHPExcel/Classes/PHPExcel.php';

/** PHPExcel_Writer_Excel2007 */
include 'PHPExcel/Classes/PHPExcel/Writer/Excel2007.php';


$objReader = new PHPExcel_Reader_HTML();
$objPHPExcel = @$objReader->load($file_path.'print.php');

header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="BMWs.xls"');
header('Cache-Control: max-age=0');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output');


?>
