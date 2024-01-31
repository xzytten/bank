// socketManager.js
import { initSocket } from './socket.js';
import Transaction from './models/Transaction.js';


let io;

export const initializeSocket = (server) => {
    io = initSocket(server);
    const socket = initSocket(io);

    socket.on('connection', (client) => {
        console.log('A user connected');
        console.log(123)
        const userId = '65b1436dcb934637a8b5e037';

        client.join(userId);

        client.on('getTransactions', async () => {
            try {
                const transactions = await Transaction.find({ userId });
                client.emit('sendTransactions', transactions);
                console.log(transactions)
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        });

        client.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return socket;  // Оновлено: повертаємо socket
};
