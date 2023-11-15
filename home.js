function openDialog()
{
    document.getElementById('dialog').style.display = 'block';
}
function addContact() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var mobile = document.getElementById('mobile').value;
   
    var contact = {
      name: name,
      email: email,
      mobile: mobile,
    };
   
    saveContact(contact);
    displayContact(contact);
    closeDialog();
  }
   
  function saveContact(contact) {
    var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    existingContacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
  }
   
  function displayContact(contact) {
    var contactList = document.getElementById('contactList');
    var contactElement = document.createElement('div');
    contactElement.className = 'contact';
    contactElement.innerHTML = `
<strong>${contact.name}</strong><br>
${contact.email}<br>
      ${contact.mobile}<br><br>`;
    contactList.appendChild(contactElement);
  }
   
  function showFullDetails(contact) {
    var fullDetailsBox = document.getElementById('fullDetailsBox');
    fullDetailsBox.innerHTML = `
Name: ${contact.name}<br>
Email: ${contact.email}<br>
      <strong>Mobile:</strong> ${contact.mobile}<br>
      landline: ${contact.landline}<br>
Website: ${contact.website}<br>
      Address: ${contact.address}<br>;
      `;
fullDetailsBox.style.display = 'block';
  }

  
   
  function closeFullDetails() {
    document.getElementById('fullDetailsBox').style.display = 'none';
  }
   
  function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
  }
  
   
  function editContact(contact) {
  }
   
  function deleteContact(contact) {
  }