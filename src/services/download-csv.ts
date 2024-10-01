export function downloadCSV<
  T extends Record<K, string | number>,
  K extends keyof T
>(data: T[], filename: string, keys: K[] = null): void {
  if (!data || data.length === 0) {
    console.error("No data provided for CSV download.");
    return;
  }

  // Get the keys from the first object for the CSV headers
  const headers = keys || (Object.keys(data[0]) as K[]);

  // Create the CSV content as a string
  const csvRows: string[] = [];

  // Add headers
  csvRows.push(headers.join(","));

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => {
      // Escape values that contain commas, quotes, or newlines
      const escapedValue = row[header].toString().replace(/"/g, '""'); // Escape quotes
      return `"${escapedValue}"`; // Enclose in double quotes
    });
    csvRows.push(values.join(","));
  }

  // Create a CSV string
  const csvString = csvRows.join("\n");

  // Create a Blob from the CSV string
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Create a link and set the URL
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename); // Set the file name for download

  // Append to the body and trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up and remove the link
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Release memory
}
