document.addEventListener("DOMContentLoaded", () =>{
    const contacts = document.querySelector(".contacts")
    const templateContact = document.getElementById("template-contact").content
    const fragment = document.createDocumentFragment() 
    // First of all I'm going to load the JSON data into the web
    // For doing so I need to fetch the JSON, then go throw it, and at each iteraction put the info into its place and show it
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
    fetchData()

    const putContacts = data =>{
        data.forEach(contact => {
            templateContact.querySelector("td")[0].textContent = contact.name
            templateContact.querySelector("td")[1].textContent = contact.surname
            templateContact.querySelector("td")[2].textContent = contact.phone
            templateContact.querySelector("td")[3].textContent = contact.mail
        
            const clone = templateContact.cloneNode(true)
            fragment.appendChild(clone)
        });
        contacts.appendChild(fragment)
        
    }

});