<?php
require 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Csv;

class generarCSV{
public function generarCSV(){
		$fecha_i = $_POST['date1'];
		$fecha_f = $_POST['date2'];
		$ventas = new Bitacora();
		$ventaCoach = $ventas->getVentas($fecha_i, $fecha_f);
		$reporteCoach = HomeController::getDesglose($ventaCoach, $fecha_i, $fecha_f);

		$filename = 'reporte.csv';

		$spreadsheet = new Spreadsheet();
		$Excel_writer = new Csv($spreadsheet);

		$spreadsheet->setActiveSheetIndex(0);
		$activeSheet = $spreadsheet->getActiveSheet();

		$activeSheet->setCellValue('A', 'nombre');
		$activeSheet->setCellValue('B', 'venta');
		$activeSheet->setCellValue('c', 'dato1');
		$activeSheet->setCellValue('D', 'base');
		$activeSheet->setCellValue('E', 'Total');
		$activeSheet->setCellValue('F', 'Asistencia');
		$activeSheet->setCellValue('G', 'Factor');
		$activeSheet->setCellValue('H', 'Horas Conexion');
		$activeSheet->setCellValue('I', 'horas');
		$activeSheet->setCellValue('J', 'porcentaje');

		
		foreach ($reporteCoach as $indice => $reporte) {
			//var_dump($indice); 
			
			if($$indice){
				$i++;
				$activeSheet->insertNewRowBefore($i, 1);

			}

			$coach 	 	 = $reporte["nombre"];
			$pago 	 	 = $reporte["venta"];
			$datosventa  	 = $reporte["dato1"];
			$base   	 = $reporte["base"];
			$total 	  	 = $reporte["total"];
			$asistencia 	 = $reporte["asistencia"];
			$factor	  	 = $reporte["fac"];
			$horasconexion = $reporte["conexion"];
			$horas 	   	 = $reporte["horas"];
			$porcentaje      	 = $reporte["porcentaje"];
			
			$activeSheet->setCellValue("A".$i, $coach);
			$activeSheet->setCellValue("B".$i, $pago);
			$activeSheet->setCellValue("C".$i, $datosventa);
			$activeSheet->setCellValue("D".$i, $base);
			$activeSheet->setCellValue("E".$i, $total);
			$activeSheet->setCellValue("F".$i, $asistencia);
			$activeSheet->setCellValue("G".$i, $factor);
			$activeSheet->setCellValue("H".$i, $horasconexion);
			$activeSheet->setCellValue("I".$i, $horas);
			$activeSheet->setCellValue("J".$i, $porcentaje);
			
		}
		exit();
		
		$filename = 'products.csv';

		header('Content-Type: application/text-csv');
		header('Content-Disposition: attachment;filename='. $filename);
		header('Cache-Control: max-age=0');
		$Excel_writer->save('php://output');
		$button = '<a href="$Excel_writer" class="btn btn-primary disabled" tabindex="-1" role="button" aria-disabled="true">Descargar</a>';
		
	}
}
?>
