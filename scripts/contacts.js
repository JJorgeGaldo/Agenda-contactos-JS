document.addEventListener("DOMContentLoaded", () =>{
    const contacts = document.querySelector(".contacts")
    const templateContact = document.getElementById("template-contact").content
    const fragment = document.createDocumentFragment() 
    // First of all I'm going to load the JSON data and show it in the web.
    // For doing so I need to fetch the JSON data.
    const fetchData = async() => {
        try{
            const res = await fetch ("../data.json")
            const data = await res.json()
            console.log(data)
            putContacts(data)
        }catch (err){
            console.log(err)
        }
    }

    // I create this function that go throw the data fetched, and place it into the web
    const putContacts = data =>{
        data.forEach(contact => {
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



    // I call the function to start the process
    fetchData()




});