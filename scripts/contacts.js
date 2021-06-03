
document.addEventListener("DOMContentLoaded", function(){
    
    const contacts = document.querySelector("#contacts")
    const templateContact = document.getElementById("template-contact").content
    
    // Declare the fragment to include the info into it and therefore can place it into the template and show it in the DOM
    const fragment = document.createDocumentFragment() 

    // Lets create an object that will contains the contacts list
    let contactsList = {}

    const addContact = document.getElementById("add")
    const clearInputs = document.getElementById("clear")
    const contentAction = document.getElementById("contacts")

    // First of all I'm going to load the JSON data and show it in the web.
    // For doing so I need to fetch the JSON data.
    const fetchData = async() => {
        try{
            const res = await fetch ("../data.json")
            data = await res.json()
            //console.log(data)
            contactsList = data
            console.log(contactsList)
            putContacts()
        }catch (err){
            console.log(err)
        }
    }

    // I create this function that go throw the data fetched, and place it into the web
    const putContacts = () =>{
        Object.values(contactsList).forEach(contact => {
            templateContact.getElementById("template-id").textContent = contact.id
            templateContact.getElementById("template-name").textContent = contact.name
            templateContact.getElementById("template-surname").textContent = contact.surname
            templateContact.getElementById("template-phone").textContent = contact.phone
            templateContact.getElementById("template-mail").textContent = contact.mail
            
            /* I create a temporal object that will conteins the info of this iteraction by clonning the template into it */
            const clone = templateContact.cloneNode(true)

            /* I have created an fragment object where Im going to add the clone object of each iteraction, saving this way all the iteractions info before sending it to the web. This way we only send it once */
            fragment.appendChild(clone)
        });

        /* I add the fragment info to the element I want in the HTML (I previously declared the contacts variable). Now the info is shown in the correct place into the HTML */
        contacts.appendChild(fragment)
    }

    // Add a contact.
    // First I create an listener for the click in the add button
    addContact.addEventListener("click", e =>{
        console.log("presionaste add")
        // Once its clicked, we retrieve the info of all the inputs and include into an temporary object
        addContactRetrieve(e)
    });

    clearInputs.addEventListener("click", () =>{
        clearInputsFunc()
    });

    const addContactRetrieve = e =>{
        /* If we are editing a contact, we do this: */
        if(addContact.classList.contains("edit")){
            console.log("Edited")
            addContact.className = "button"
            addContact.textContent = "Add Contact"
            console.log(document.querySelectorAll("input")[0].value)
            contactsList.forEach(element => {
                if(element.id == document.querySelectorAll("input")[0].value){
                    element.name = document.querySelectorAll("input")[1].value
                    element.surname = document.querySelectorAll("input")[2].value
                    element.phone = document.querySelectorAll("input")[3].value
                    element.mail = document.querySelectorAll("input")[4].value
                }
            });
            console.log(contactsList)
            contacts.innerHTML = ""
            putContacts(contactsList)
            clearInputsFunc()
            alert("Contact successfuly edited")
            return
        }

        /* If we are deleting a contact we do this: */
        if(addContact.classList.contains("delete")){
            console.log("Deleted")
            addContact.className = "button"
            addContact.textContent = "Add Contact"
            console.log(contactsList)

            const tempList = contactsList.filter( contactToDel => contactToDel.id != document.querySelectorAll("input")[0].value)
            console.log(tempList)

            tempList.forEach(element => {
                if(element.id - tempList.indexOf(element) > 1){
                    //console.log(tempList.indexOf(element))
                    //console.log(element.id)
                    element.id -= 1
                    //console.log(element.id)
                }
            });
            //console.log(tempList)
            contactsList = tempList
            //console.log(contactsList)
            contacts.innerHTML = ""
            putContacts(contactsList)
            clearInputsFunc()
            alert("Contact successfuly deleted")
            return
        }


        /* If we are adding a new contact we do this: */
        let tempContact = {
            id: contactsList.length+1,
            name : document.getElementById("input-name").value,
            surname : document.getElementById("input-surname").value,
            phone : document.getElementById("input-phone").value,
            mail : document.getElementById("input-mail").value
        }

        // Now I include tempContact in contactsList and call the function putContacts to send the full contactsList to the Contacts list
        
        contactsList[contactsList.length] = tempContact
        contacts.innerHTML = ""
        putContacts(contactsList)
        clearInputsFunc()
    }

    const clearInputsFunc = () =>{
        addContact.textContent = "Add Contact"
        document.querySelectorAll("input")[0].value = ""
        document.querySelectorAll("input")[1].value = ""
        document.querySelectorAll("input")[2].value = ""
        document.querySelectorAll("input")[3].value = ""
        document.querySelectorAll("input")[4].value = ""
        //console.log(contentAction)
    }
    
    // Lets add an click event for the Actions in the list
    contentAction.addEventListener("click", e =>{
        actionButton(e)
    })

    const actionButton = e =>{
        const temp = (contactsList[e.target.parentNode.parentNode.children[0].textContent-1])
        console.log(temp)
        document.querySelectorAll("input")[0].value = temp.id
        document.querySelectorAll("input")[1].value = temp.name
        document.querySelectorAll("input")[2].value = temp.surname
        document.querySelectorAll("input")[3].value = temp.phone
        document.querySelectorAll("input")[4].value = temp.mail

        // Edit
        if(e.target.classList.contains("fa-user-edit")){
            console.log("Edit")
            addContact.textContent = "Update Contact data"
            addContact.classList = "button edit"
            
        }

        // Delete
        if(e.target.classList.contains("fa-user-minus")){
            console.log("Delete")
            console.log(temp)
            addContact.textContent = "Delete Contact data"
            addContact.classList = "button delete"
        }
        e.stopPropagation()
    }


    // I call the functions to show the info in the web and to clean the input fields
    fetchData()
    clearInputsFunc()


    // Now I'm going to dump the info into the LocalStorage



});