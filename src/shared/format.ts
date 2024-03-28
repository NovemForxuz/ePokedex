export const captitalizedFirstLetter = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export const formatId = (num: any, size: number) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return '#' + num;
}