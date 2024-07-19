import { getChannel } from './connection';

export const consumeQueue = async (queue: string, callback: (msg: any) => void) => {
    const channel = getChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            const message = JSON.parse(msg.content.toString());
            callback(message);
            channel.ack(msg);
        }
    });
};

// Example consumer function to log messages
export const startConsumer = async () => {
    try {
        await consumeQueue('userQueue', (msg) => {
            console.log('Received message:', msg);
        });
    } catch (error) {
        console.error('Error starting consumer', error);
    }
};
