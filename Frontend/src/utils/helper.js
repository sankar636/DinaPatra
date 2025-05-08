export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regex.test(email)
}

export const getInitials = (username) => {
    if (!username || typeof username !== "string") return "";

    const words = username.split(" ")
    // also you can write words.trim().split(" ")
    // console.log(words);

    // let initials = ""
    // for (let i = 0; i < Math.min(words.length, 2); i++) {
    //     initials += words[i][0]
    // }

    const firstInitial = words[0]?.charAt(0) || "";
    const secondInitial = words[1]?.charAt(0) || "";
    // console.log(firstInitial + secondInitial);

    return (firstInitial + secondInitial).toUpperCase()
} // this is to store First one/two letter of your username in uppercase in your profile

/*
getInitials("John Doe")       // "JD"
getInitials("Alice")          // "A"
getInitials("Bob Marley Jr.") // "BM"
getInitials("")               // ""
getInitials(null) 
*/