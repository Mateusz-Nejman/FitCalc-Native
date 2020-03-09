export const calcKcal = (gender, age, height, mass, activity, target) => {
    return (
        (9.99 * mass + 6.25 * height - 4.92 * age + gender) * activity
    ) + target;
};


export const calcProduct = (protein, carbo, fat) => {
    return (protein * 4.0) + (carbo * 4.0) + (fat * 9.0);
}