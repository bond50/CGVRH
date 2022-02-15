export const YearsOperated = () => {
    let date1 = new Date("January 1, 2001 12:00:00");
    let date2 = new Date();
    return date2.getFullYear() - date1.getFullYear()
};





