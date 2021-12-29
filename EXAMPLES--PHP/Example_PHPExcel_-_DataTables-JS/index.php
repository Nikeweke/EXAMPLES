<!DOCTYPE html>
<html lang="en">
<head>
		  <title>BMW</title>
		  <meta charset="utf-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1">

		  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
		  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
		  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
			<script src="https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
			<link rel="stylesheet" href="https://cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css">

<style>
tr.group,
tr.group:hover {
    background-color: #ddd !important;
}

</style>


		  <script>
										$(document).ready(function() {
							var table = $('#example').DataTable({
									"columnDefs": [
											{ "visible": false, "targets": 2 }
									],
									"order": [[ 2, 'asc' ]],
									"displayLength": 25,
									"drawCallback": function ( settings ) {
											var api = this.api();
											var rows = api.rows( {page:'current'} ).nodes();
											var last=null;

											api.column(2, {page:'current'} ).data().each( function ( group, i ) {
													if ( last !== group ) {
															$(rows).eq( i ).before(
																	'<tr class="group"><td colspan="6">'+group+'</td></tr>'
															);

															last = group;
													}
											} );
									}
							} );

							// Order by the grouping
							$('#example tbody').on( 'click', 'tr.group', function () {
									var currentOrder = table.order()[0];
									if ( currentOrder[0] === 2 && currentOrder[1] === 'asc' ) {
											table.order( [ 2, 'desc' ] ).draw();
									}
									else {
											table.order( [ 2, 'asc' ] ).draw();
									}
							} );
							} );
			</script>


</head>
<body>


<div class="container">
<a href="print.php"><h3>Скачать в Excel</h3></a>
  <h2>BMW</h2>
  <table id="example" class="table">
    <thead>
      <tr>
        <th>Model</th>
        <th>Engine</th>
				<th>Power</th>
        <th>Max Speed</th>
				<th>Priskorenya</th>
				<th>Fuel</th>
				<th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>116i</td>
        <td>1499</td>
        <td>BMW series 1</td>
				<td>10.5</td>
				<td>4.5</td>
				<td>3000</td>
				<td>600 000</td>
      </tr>
			<tr>
        <td>118i</td>
        <td>1499</td>
        <td>BMW series 1</td>
				<td>11.5</td>
				<td>4.5</td>
				<td>2000</td>
				<td>600 000</td>
      </tr>
			<tr>
        <td>120i</td>
        <td>1499</td>
        <td>BMW series 1</td>
				<td>11</td>
				<td>5</td>
				<td>2200</td>
				<td>600 000</td>
      </tr>
			<tr>
        <td>120i</td>
        <td>1000</td>
        <td>BMW series 3</td>
				<td>10.5</td>
				<td>4.5</td>
				<td>2220</td>
				<td>633333</td>
      </tr>
			<tr>
        <td>125d</td>
        <td>1422</td>
        <td>BMW series 3</td>
				<td>10.5</td>
				<td>4.5</td>
				<td>232323</td>
				<td>600 000</td>
      </tr>
			<tr>
        <td>1116d</td>
        <td>129</td>
        <td>BMW series 3</td>
				<td>12</td>
				<td>1231</td>
				<td>4553</td>
				<td>600 000</td>
      </tr>
    </tbody>
  </table>
  
  
	
</div>

</body>
</html>
