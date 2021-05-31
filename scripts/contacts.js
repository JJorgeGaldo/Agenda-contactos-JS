document.addEventListener("DOMContentLoaded", () =>{
    const contacts = document.querySelector(".contacts")
    // First of all I'm going to load the JSON data into the web
    // For doing so I need to fetch the JSON, then go throw it, and at each iteraction put the info into its place and show it
    const fetchData = async() => {
        try{
            const res = await fetch ("../data.json")
            const data = await res.json()
            console.log(data)
            data.forEach(contact => {
                
            });
        }catch (err){
            console.log(err)
        }
    }
    fetchData()
});