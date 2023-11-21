function openDialog() 
{
    
    document.getElementById('addDialog').style.display = 'block';
}
function closeDialog() 
{
  document.getElementById('addDialog').style.display = 'none';
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidMobile(mobile) {
  var mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
}

var isEditing=false;

let uniqueId = 0 ;

let contactsArray = JSON.parse(localStorage.getItem("contacts")) || []
if(contactsArray === null){
  uniqueId = 0
}
else{
  uniqueId = contactsArray.length
  console.log(contactsArray.length)
}

//add contact
function addContact() 
{
  let fullDetails = document.getElementById("fullDetails")
  fullDetails.style.display = "none"
  openDialog()
  console.log("unique",uniqueId,contactsArray)
    uniqueId = uniqueId + 1
    let formElement = document.getElementById("addcontactForm")

    let add_btn = document.getElementById("add-button")
    add_btn.onclick = function(){
      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let mobile = document.getElementById('mobile').value;
      let landline = document.getElementById('landline').value;
      let website = document.getElementById('website').value;
      let address = document.getElementById('address').value;
      let obj = {
        uniqueId: uniqueId,name,email,mobile,landline,website,address
      }
    
      if (!isValidMobile(mobile)) {
        alert("Enter a 10 digits mobile number.");
        return;
      }
      if (!isValidEmail(email)) {
        alert("Enter a valid email address.");
        return;
      }
     {
        contactsArray.push(obj)
        localStorage.setItem("contacts",JSON.stringify(contactsArray))
        formElement.reset()
        closeDialog()
        console.log("address",contactsArray)
        displayContact()
      }
     
    }

    formElement.reset();
  }
   
 


function generateUniqueId()
{
  var idCounter = parseInt(localStorage.getItem('idCounter')) || 0;
  idCounter++;
  localStorage.setItem('idCounter', idCounter);
  return idCounter.toString();
}

  //save the contact

  function saveContact(contact) 
  {
    var contactsArray = JSON.parse(localStorage.getItem('contacts')) || [];
    // contact.id = generateUniqueId();
    console.log("contact,",contact)

    contactsArray.push(contact);
    console.log("contactsArray,",contactsArray)
    localStorage.setItem('contacts', JSON.stringify(contactsArray));
   
    alert("Contact added successfully")
    closeDialog();
    displayContact();


  }
   
  //displaying contacts in homepage
function displayContact() {
  let contactsArray = JSON.parse(localStorage.getItem("contacts"));
  let contactList = document.getElementById('contactList');
  contactList.textContent = "";

  contactsArray.forEach(element => {
    let detailContainer = document.createElement("div");
    detailContainer.classList.add("contact");

    detailContainer.innerHTML = `
      <span class="sidecontactname">${element.name}</span> <br />
      <p class="contactnametext">${element.email}</p>
      <p class="contactnametextmobile">${element.mobile}</p>
    `;

    detailContainer.classList.add("detailcont");

    detailContainer.onclick = function() {
      // Remove active class from all contacts
      let allContacts = document.querySelectorAll('.contact');
      allContacts.forEach(function(contact) {
        contact.classList.remove('active');
      });

      // Add active class to the selected contact
      detailContainer.classList.add('active');

      showFullDetails(element);
    };

    contactList.appendChild(detailContainer);
  });
}

  displayContact();

  //show full details of the contact

  function showFullDetails(contact) {
    
    var fullDetails = document.getElementById('fullDetails');
    fullDetails.style.display="block"
      var detailsHTML = `
      <div class="contacts-container">
      <strong><h1>${contact.name}</h1></strong>
      <p class="email">Email: ${contact.email}</p>
      <p class="mobile">Mobile: ${contact.mobile}</p>
      <p class="landline">Landline: ${contact.landline}</p>
      <p class="website">Website: ${contact.website}</p>
      <p class="address">Address: ${contact.address}</p>
    </div>
  `;

          
  fullDetails.innerHTML = detailsHTML;

          let editContainer = document.createElement("div")
          editContainer.style.display = "flex"
          editContainer.style.flexDirection = "row"

          let deleteContainer = document.createElement("div")
          deleteContainer.style.display = "flex"
          deleteContainer.style.flexDirection = "row"

          let editDeleteContainer = document.createElement("div");
          editDeleteContainer.className = "editDeleteButtons";

          let editImage = document.createElement("img")
          editImage.src = "edit1.jpg"
          editImage.classList.add("editImage")
         
          let editButton = document.createElement("div");
          

          editButton.className = "editicon";
          editButton.textContent = "EDIT"
          editButton.style.color = "#black";
          editButton.style.background = "white";
       

          let deleteImage = document.createElement("img")
          deleteImage.src = "delete1.png"
          deleteImage.classList.add("deleteImage")
        

          let deleteButton = document.createElement("div");
          deleteButton.textContent = "DELETE"
          deleteButton.className = "deleteicon";
          deleteButton.style.color = "#black";
          deleteButton.style.background = "white";
       

          editContainer.appendChild(editImage)
          editContainer.appendChild(editButton);

          deleteContainer.appendChild(deleteImage)
          deleteContainer.appendChild(deleteButton)

          editDeleteContainer.appendChild(editContainer)
          editDeleteContainer.appendChild(deleteContainer);
       
          fullDetails.appendChild(editDeleteContainer);
        
          
          editContainer.onclick = function()
          {
            openEditDailog(contact)
          }

          deleteButton.onclick = function () {
            if (confirm('Are you sure you want to delete this contact?')) {
              deleteContact(contact);
              closeDetailsBox();
            }
            return false;
          };
  }

  function closeDetailsBox() {
    var fullDetails = document.getElementById('fullDetails');
    fullDetails.innerHTML = '';
}
 
//open edit dialog box
async function openEditDailog(contact)
{

  let add_button = document.getElementById("add-button")
  add_button.textContent = "Update"
  isEditing = true;

  // document.getElementById('id').value = contact.id;
  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;
  document.getElementById('mobile').value = contact.mobile;
  document.getElementById('landline').value = contact.landline;
  document.getElementById('website').value = contact.website;
  document.getElementById('address').value = contact.address;
  openDialog();

  if(isEditing)
  {
    // console.log("contact",contact)
    // var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    // let index = existingContacts.findIndex(element => element.id === contact.id)
   
    // console.log("index",index)
    
    add_button.onclick = function(){
      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let mobile = document.getElementById('mobile').value;
      let landline = document.getElementById('landline').value;
      let website = document.getElementById('website').value;
      let address = document.getElementById('address').value;
      if (!isValidMobile(mobile)) {
        alert("Enter a 10 digits mobile number.");
        return;
      }
      if (!isValidEmail(email)) {
        alert("Enter a valid email address.");
        return;
      }
      let obj = {
        uniqueId:contact.uniqueId,name,email,mobile,landline,website,address
      }
      console.log("new",obj)
      updateContact(obj); 
    }
    
  }
  // isEditing = false;
}


 

function updateContact(updatedContact) {
  console.log("updatedContact",updatedContact)
  var contactsArray = JSON.parse(localStorage.getItem('contacts')) || [];
  let index = contactsArray.findIndex(element => element.uniqueId === updatedContact.uniqueId)
  contactsArray.splice(index,1,updatedContact)
  localStorage.setItem('contacts', JSON.stringify(contactsArray));
  closeDialog();
 
  let fullDetails = document.getElementById("fullDetails")
  
  fullDetails.textContent = ""
  displayContact();
   

}
//Delete Contacts
function deleteContact(contactToDelete) {
  // var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  let index = contactsArray.findIndex(element => element.uniqueId === contactToDelete.uniqueId)
  contactsArray.splice(index,1)
  localStorage.setItem('contacts', JSON.stringify(contactsArray));
  // alert('Contact deleted successfully');
  displayContact();
}

  function cancelDialog() {
    var form = document.getElementById("addDialog");
    //  form.reset();
    closeDialog();
  }