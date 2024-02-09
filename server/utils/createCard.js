import Card from "../models/Card.js";

export const generateUniqueCardNumber = () => {
    return Math.floor(100000000000000 + Math.random() * 9000000000000000).toString();
};

export const generateUniqueCVV = () => {
    return Math.floor(100 + Math.random() * 900).toString();
};

export const createUniqueCard = async (userId) => {
    try {

        const currentDate = new Date();

        do {
            const cardData = {
                number: generateUniqueCardNumber(),
                cvv: generateUniqueCVV(),
                creationDate: currentDate,
                expirationDate: new Date(currentDate.getFullYear() + 4, currentDate.getMonth(), currentDate.getDate()),
                cash: '120',
                cashHistory: {
                    income: 0,
                    extence: 0,
                }
            };

            const existingCard = await Card.findOne({ cardNumber: cardData.number });

            if (!existingCard) {
                const newCard = new Card({ ...cardData, user: userId });
                await newCard.save();
                return newCard;
            }
        } while (true);
    } catch (error) {
        console.error('Error in createUniqueCard:', error);
        throw error;
    }
};
