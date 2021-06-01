
document.addEventListener("DOMContentLoaded", function(){

    const contacts = document.querySelector(".contacts")
    const templateContact = document.getElementById("template-contact").content

    // Declare the fragment to include the info into it and therefore can place it into the template and show it in the DOM
    const fragment = document.createDocumentFragment() 

    // Lets create an object that will contains the contacts list
    let contactsList = {}

    const addContact = document.getElementById("add")
    const clearInputs = document.getElementById("clear")

    // First of all I'm going to load the JSON data and show it in the web.
    // For doing so I need to fetch the JSON data.
    const fetchData = async() => {
        try{
            const res = await fetch ("../data.json")
            data = await res.json()
            console.log(data)
            contactsList = data
            console.log(contactsList)
            putContacts(contactsList)
        }catch (err){
            console.log(err)
        }
    }


    // I call the function to start the process and show the info in the web
    fetchData()

    // I create this function that go throw the data fetched, and place it into the web
    const putContacts = () =>{
        //contact.innerHTML = ""
        Object.values(contactsList).forEach(contact => {
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
        let tempContact = {
            name : document.getElementById("input-name").value,
            surname : document.getElementById("input-surname").value,
            phone : document.getElementById("input-phone").value,
            mail : document.getElementById("input-mail").value
        }

        // Now I push the object to the end of the Contacts list
        
        contactsList[contactsList.length] = tempContact
        contacts.innerHTML = ""
        putContacts(contactsList)
        clearInputsFunc()
    }

    const clearInputsFunc = () =>{
        document.querySelectorAll("input")[0].value = ""
        document.querySelectorAll("input")[1].value = ""
        document.querySelectorAll("input")[2].value = ""
        document.querySelectorAll("input")[3].value = ""
    }

    // Now I'm going to dump the info into the LocalStorage



});