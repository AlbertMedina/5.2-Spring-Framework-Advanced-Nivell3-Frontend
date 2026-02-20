export const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (sentence) => {
    if (!sentence) return "";
    return sentence
        .split(" ")
        .map(capitalize)
        .join(" ");
};