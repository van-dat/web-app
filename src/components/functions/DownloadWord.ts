export default function funcDownloadWord(value,fileName) {
    // Get textarea data
    // var formData = document.getElementById('formData').value;

    // Create a new Blob
    var blob = new Blob([value], { type: 'application/msword' });

    // Create a link element
    var link = document.createElement('a');

    // Set the download attribute and the file name
    link.download = `${fileName}.doc`;
    
    // Create a URL for the Blob and set it as the href attribute of the link
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click event on the link to initiate the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}