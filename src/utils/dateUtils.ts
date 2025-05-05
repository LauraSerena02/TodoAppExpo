// This function makes a date look like "2025-05-04"
export const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear(); // Get the year (example: 2025)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (1–12), always 2 digits
    const day = String(date.getDate()).padStart(2, '0'); // Get the day (1–31), always 2 digits
    return `${year}-${month}-${day}`; // Make a string like "2025-05-04"
  };
  
  // This function checks if two dates are the same day
  export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() && // Same year
      date1.getMonth() === date2.getMonth() &&       // Same month
      date1.getDate() === date2.getDate()            // Same day
    );
  };
  
  // This function shows the date in a nice way, using a language format
  export const formatDateToLocale = (date: Date, locale = 'es-ES'): string => {
    return date.toLocaleDateString(locale); // Show the date in the style of the given language (like Spanish)
  };
  