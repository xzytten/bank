import { Server } from 'socket.io';
import Transaction from './models/Transaction.js';

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {

        socket.on("join", ({ userId }) => {
            // Приєднати користувача до кімнати за його ідентифікатором

            const roomName = userId; // Встановлюємо ім'я кімнати
            socket.join(roomName);
            // console.log(`Користувач ${socket.id} приєднався до кімнати ${roomName}`);


            // console.log('Список кімнат:', io.sockets.adapter.rooms);
        });

        socket.to("65b1436dcb934637a8b5e037").emit('message', { message: 'Hello, user!' });
        // Отримання транзакцій під час підключення
        socket.on('getTransactions', async (userId = '65b1436dcb934637a8b5e037') => {
            try {
                const transactions = await Transaction.find({ sender: 5984220880671365 });

                // Відправити транзакції конкретному користувачеві у його кімнату
                io.to(userId).emit('sendTransactions', transactions);

            } catch (error) {
                // console.error('Error fetching transactions:', error);
            }
        });

        socket.on('disconnect', () => {
            // console.log('User disconnected');
        });
    });

    return io;
};

export { initSocket };
