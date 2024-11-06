export const addTransaction = (transaction, transactions, setGroupedTransactions, setTotalCount) => {
    let updatedTransactionsCopy;
    if (transaction) {
        updatedTransactionsCopy = [transaction, ...transactions];
    } else {
        updatedTransactionsCopy = [...transactions];
    }
    const sortedTransactions = updatedTransactionsCopy.slice().sort(compareDates);
    const groupedByDate = groupTransactionsByDate(sortedTransactions);
    setGroupedTransactions(groupedByDate);
    setTotalCount(updatedTransactionsCopy.length);
}

const compareDates = (a, b) => {
    const dateA = new Date(a.trans.date.split('T')[0]);
    const dateB = new Date(b.trans.date.split('T')[0]);
    return dateB - dateA;
};

const compareDatesTrans = (a, b) => {
    const dateA = new Date(a.trans.date);
    const dateB = new Date(b.trans.date);
    return dateB - dateA;
};

const groupTransactionsByDate = (transactions) => {
    const grouped = transactions.reduce((grouped, transaction) => {
        const dateKey = transaction.trans.date.split('T')[0];
        if (!grouped[dateKey]) {
            grouped[dateKey] = [];
        }
        grouped[dateKey].push(transaction);
        return grouped;
    }, {});

    Object.keys(grouped).forEach((dateKey) => {
        grouped[dateKey].sort(compareDatesTrans);
    });

    return grouped;
};

export const formatDate = (inputDate) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);

    const [month, day, year] = formattedDate.split(' ');

    return `${month}. ${day} ${year}`;
};