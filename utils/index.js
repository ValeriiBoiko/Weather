export const getDayName = (index) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days[index];
}

export const titleCase = (str) => {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}