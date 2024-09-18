import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import React from 'react';
import ExcelJS from 'exceljs';
import { NOUN } from 'common/constants/translation';

const ExportToExcel = ({ fileName, sheetName, jsonData }) => {
  const downloadExcel = async () => {
    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Add column headers
    worksheet.columns = Object.keys(jsonData[0]).map((key) => {
      let header;
      switch (key) {
        case 'id':
          header = NOUN.ID;
          break;
        case 'productId':
          header = NOUN.PRODUCT;
          break;
        case 'criterionId':
          header = NOUN.CRITERION;
          break;
        case 'startedAt':
          header = NOUN.START_DATE;
          break;
        case 'completedAt':
          header = NOUN.COMPLETION_DATE;
          break;
        case 'notes':
          header = NOUN.NOTES;
          break;
        default:
          header = key;
      }

      return ({
        header: header,
        key: key,
        width: key === 'id' ? 10 : (key === 'notes' ? 40 : 20),  // Apply width for 'id' and other columns
    })});

    // Add rows
    jsonData.forEach((row) => {
      worksheet.addRow(row);
    });

    // Apply text wrapping to all cells
    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = { wrapText: true, vertical: 'middle' };
      });
    });

    // Generate a buffer of the Excel file
    const excelBuffer = await workbook.xlsx.writeBuffer();

    // Create a Blob object from the Excel buffer
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    // Clean up and remove the link
    document.body.removeChild(link);
  };

  return (
    <Button onClick={downloadExcel} startIcon={<DownloadIcon />}>
      Excel
    </Button>
  );
};

export default ExportToExcel;
