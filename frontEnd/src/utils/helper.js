export const emailValidator = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
};

export const nameLogo = (e) => {
    const splitedName = e.split(" ");

    
    // ['John', 'Willioms']

    let initials=""

    splitedName.map((event)=>(
        initials+=event.charAt(0)
    ))
    return initials;
    
};
