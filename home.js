//display dialog box
function openDialog() {
    var addItemDialog = document.getElementById('addItemDialog');
    addItemDialog.showModal();
  }
  
  function closeDialog() {
    var addItemDialog = document.getElementById('addItemDialog');
    addItemDialog.close();
  }

//addthe form fields data
function addItem() {
  var form = document.getElementById('addItemForm');
  // You can add your logic to handle the form data here
  // For example, you can access form elements using form.elements
  var name = form.elements['name'].value;
  var email = form.elements['email'].value;
  var phone = form.elements['phone'].value;

  // Perform actions with the form data (e.g., add to a list, send to server, etc.)

  // Close the dialog after handling the form data
  closeDialog();
}