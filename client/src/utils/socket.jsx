import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {updateCachHistory} from '../redux/transactionSlice'

export const useSocket = (userId, socket) => {
    const [newTrans, setNewTrans] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    socket.on('balanceUpdate', (data) => {
        setNewTrans(data.newTransaction);
        dispatch(updateCachHistory({cashHistory: data.cashHistory}));
    });

    return { newTrans };
}