import { toast } from 'react-hot-toast';

export default function funcCopyToClipboard(value) {
    // Get the text from the textarea
    // var textarea = document.getElementById('myTextarea');
    // var textToCopy = textarea.value;

    // Create a temporary input element
    var tempInput = document.createElement('input');
    tempInput.value = value;

    // Append the input element to the document
    document.body.appendChild(tempInput);

    // Select the text in the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Optionally, provide feedback to the user
    toast.success('Copy text successfully')
    
}