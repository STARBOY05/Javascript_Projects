showTime = () => {
    // Initialisations
    let time = new Date()           // set time as Date()
    let hour = time.getHours()      /*   get hours , minutes,seconds     */
    let min = time.getMinutes()
    let sec = time.getSeconds()
    let am_pm = "AM";               // Also Display AM to PM  and vice-versa

    // AM -- PM condition
    if (hour > 12) // for Time between 13 - 24
    {
        hour -= 12
        am_pm = "PM"
    }

    if (hour == 0) // for morning 0 - 12
    {
        hour = 12
        am_pm = "AM"
    }

    hour = hour < 10 ? "0" + hour : hour
    min = min < 10 ? "0" + min : min
    sec = sec < 10 ? "0" + sec : sec

    // Display the time
    let displayTime = `${hour} : ${min} : ${sec} ${am_pm}`
    setInterval(showTime, 1000)
    document.querySelector("#clock").innerHTML = displayTime
}

// Call the Function
showTime()