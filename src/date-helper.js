export const getToday = () => {
    const d = new Date(Date.now());

    const day = d.getUTCDate().toString().padStart(2, "0");
    const month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = d.getUTCFullYear().toString();

    const date = `${day}.${month}.${year}`;
    return date;
}