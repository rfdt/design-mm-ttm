export const exportExcelFromJson = (json_data) => {
    import('xlsx').then((xlsx) => {
        try {
            const worksheet = xlsx.utils.json_to_sheet(json_data);
            const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
            saveAsExcelFile(excelBuffer, 'Включения');
        } catch (e) {
            console.log(e)
        }
    });
};

const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
        try {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });
                module.default.saveAs(data, fileName + ' Экспорт ' + new Date().toLocaleString() + EXCEL_EXTENSION);
            }
        } catch (e) {
            console.log(e)
        }
    });
};