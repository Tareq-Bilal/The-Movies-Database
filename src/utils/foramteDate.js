function formatDate(date) {
    try {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            return 'Invalid date';
        }
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return dateObj.toLocaleDateString('en-US', options);
    } catch (error) {
        return 'Invalid date';
    }
}

export default formatDate;