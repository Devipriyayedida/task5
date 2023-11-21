
function openDialog() 
{
    
    document.getElementById('addDialog').style.display = 'block';
}
function closeDialog() 
{
  document.getElementById('addDialog').style.display = 'none';
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
  let fullDetailsBox = document.getElementById("fullDetailsBox")
  fullDetailsBox.style.display = "none"
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
        uniqueId,name,email,mobile,landline,website,address
      }
      if(email!="" || name != "" , mobile!=""){
        contactsArray.push(obj)
        localStorage.setItem("contacts",JSON.stringify(contactsArray))
        formElement.reset()
        closeDialog()
        console.log("address",contactsArray)
        displayContact()
      }
     
    }
 // Add this line to reset the form
 formElement.reset();

  }
   
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    // contact.id = generateUniqueId();
    console.log("contact,",contact)

    existingContacts.push(contact);
    console.log("existingContacts,",existingContacts)
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
    alert("Contact added successfully")
    closeDialog();
    displayContact();


  }
   
  //displaying contacts in homepage

  function displayContact() 
  {
      let existingContacts = JSON.parse(localStorage.getItem("contacts"))
      let contactList = document.getElementById('contactList');
      contactList.textContent=""
      existingContacts.forEach(element => {
        console.log("element")
        let detailContainer = document.createElement("div")
        detailContainer.classList.add("contact")

        detailContainer.innerHTML = `
        <span class="sidecontaclisttname"> ${element.name}</span> <br />
       
         <p class="contactnametext">${element.email}</p>
         <p class="contactnametext">${element.mobile}</p>`;

         detailContainer.classList.add("detailcont")

         detailContainer.onclick = function() 
        {
          showFullDetails(element);
        };  

        contactList.appendChild(detailContainer)
      });
  }
  displayContact();

  //show full details of the contact

  function showFullDetails(contact) {
    
    var fullDetailsBox = document.getElementById('fullDetailsBox');
    fullDetailsBox.style.display="block"
      var detailsHTML = `
      <p class="contactname">${contact.name}</p>
          <p>Email: ${contact.email}</p>
          <p>Mobile: ${contact.mobile}</p>
          <p>Landline:${contact.landline}</p>
          <p>Website: ${contact.website} </p>

          <p>Address: ${contact.address}</p>
          `;

          
          fullDetailsBox.innerHTML = detailsHTML;

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
       
          fullDetailsBox.appendChild(editDeleteContainer);
        
          
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
    var fullDetailsBox = document.getElementById('fullDetailsBox');
    fullDetailsBox.innerHTML = '';
}
 
//open edit dialog box in page
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
  var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  let index = existingContacts.findIndex(element => element.uniqueId === updatedContact.uniqueId)
  existingContacts.splice(index,1,updatedContact)
  localStorage.setItem('contacts', JSON.stringify(existingContacts));
  closeDialog();
  let fullDetailsBox = document.getElementById("fullDetailsBox")
  fullDetailsBox.textContent = ""
  displayContact();
   

}
//Delete Contacts
function deleteContact(contactToDelete) {
  var existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  let index = existingContacts.findIndex(element => element.uniqueId === contactToDelete.uniqueId)
  existingContacts.splice(index,1)
  localStorage.setItem('contacts', JSON.stringify(existingContacts));
  // alert('Contact deleted successfully');
  displayContact();
}

  function cancelDialog() {
    var form = document.getElementById("addDialog");
    // form.reset();
    closeDialog();
  }