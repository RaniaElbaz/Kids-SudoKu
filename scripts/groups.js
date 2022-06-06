//load event
window.addEventListener('load', ()=>{
    //Get query string
    let queryString = location.search;
    let pairs = queryString.substring(1).split("&");  //[username=ray, level=level1]

    for(let i = 0; i < pairs.length; i++) {
        //Look for "name=value"
        let pos = pairs[i].indexOf('=');  
        if (pos == -1) continue;  //not found

        //Extract the key
        let key = pairs[i].substring(0,pos);  
        //Extract the value
        let value = pairs[i].substring(pos+1);  

        value = decodeURIComponent(value);  //Decode the value
        // console.log(key);
        // console.log(value);

        localStorage.setItem(`${key}`,`${value}`); //save the data
    }    
}); //end of load