import { useSpring, animated, config } from 'react-spring';
import Spent from './Spent';
import Arrived from './Arrived';
const TransactionItem = ({ transaction, index, onClick }) => {
    const transactionProps = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(-20px)' },
        delay: index * 50,
        config: config.gentle,
    });

    return (
        <animated.div style={transactionProps} onClick={onClick}>
            {index === 0 ? (
                transaction.typeTransaction === 'send' ? (
                    <Spent index={index} newUser={transaction.recipientUser} user={transaction.users} sum={transaction.trans.sum} />
                ) : (
                    <Arrived index={index} user={transaction.users} sum={transaction.trans.sum} />
                )
            ) : (
                transaction.typeTransaction === 'send' ? (
                    <Spent newUser={transaction.recipientUser} index={index} user={transaction.users} sum={transaction.trans.sum} />
                ) : (
                    <Arrived index={index} user={transaction.users} sum={transaction.trans.sum} />
                )
            )}
        </animated.div>
    );
};

export default TransactionItem