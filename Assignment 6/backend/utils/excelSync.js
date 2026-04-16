const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const dataLogsDir = path.join(__dirname, '..', 'data_logs');

// Ensure directory exists
if (!fs.existsSync(dataLogsDir)) {
    fs.mkdirSync(dataLogsDir, { recursive: true });
}

// Reusable logic to sync row data to a specific sheet
const syncToExcel = async (filename, sheetName, columns, rowData) => {
    const filePath = path.join(dataLogsDir, filename);
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    try {
        if (fs.existsSync(filePath)) {
            await workbook.xlsx.readFile(filePath);
            worksheet = workbook.getWorksheet(sheetName);
            if (!worksheet) {
                // If file exists but sheet doesn't (rare edge case here), add it
                worksheet = workbook.addWorksheet(sheetName);
                worksheet.columns = columns;
            }
        } else {
            worksheet = workbook.addWorksheet(sheetName);
            worksheet.columns = columns;
        }

        // Apply column headers if they aren't somehow set
        if (!worksheet.columns || worksheet.columns.length === 0) {
            worksheet.columns = columns;
        }

        worksheet.addRow(rowData);
        await workbook.xlsx.writeFile(filePath);
        console.log(`[Excel Sync] Added row to ${filename}`);
    } catch (error) {
        console.error(`[Excel Sync Error] Failed to update ${filename}:`, error);
    }
};

const syncAuthLog = async (name, email, action) => {
    const columns = [
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 35 },
        { header: 'Action', key: 'action', width: 20 }, // 'Registration' or 'Login'
        { header: 'Timestamp', key: 'timestamp', width: 25 }
    ];
    const rowData = {
        name,
        email,
        action,
        timestamp: new Date().toLocaleString()
    };
    await syncToExcel('auth_logs.xlsx', 'Auth Logs', columns, rowData);
};

const syncOrderLog = async (email, productsSummary, totalAmount, status) => {
    const columns = [
        { header: 'User Email', key: 'email', width: 35 },
        { header: 'Products', key: 'products', width: 60 },
        { header: 'Total ₹ Amount', key: 'totalAmount', width: 15 },
        { header: 'Order Status', key: 'status', width: 20 },
        { header: 'Timestamp', key: 'timestamp', width: 25 }
    ];
    const rowData = {
        email,
        products: productsSummary, // E.g., '2x Black T-Shirt, 1x Silk Scarf'
        totalAmount,
        status, // E.g., 'Paid - Processing'
        timestamp: new Date().toLocaleString()
    };
    await syncToExcel('orders_logs.xlsx', 'Order Logs', columns, rowData);
};

const syncFeedbackLog = async (name, email, improvements, doubts, suggestions) => {
    const columns = [
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 35 },
        { header: 'Improvements', key: 'improvements', width: 40 },
        { header: 'Doubts', key: 'doubts', width: 40 },
        { header: 'Suggestions', key: 'suggestions', width: 40 },
        { header: 'Timestamp', key: 'timestamp', width: 25 }
    ];
    const rowData = {
        name,
        email,
        improvements: improvements || 'N/A',
        doubts: doubts || 'N/A',
        suggestions: suggestions || 'N/A',
        timestamp: new Date().toLocaleString()
    };
    await syncToExcel('feedback_logs.xlsx', 'Feedback Logs', columns, rowData);
};

module.exports = {
    syncAuthLog,
    syncOrderLog,
    syncFeedbackLog
};
