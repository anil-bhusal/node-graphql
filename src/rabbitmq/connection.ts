import amqp, { Connection, Channel } from 'amqplib';

let connection: Connection;
let channel: Channel;

export const connectRabbitMQ = async () => {
    try {
        const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://127.0.0.1:5672';
        if (!rabbitmqUrl.startsWith('amqp:') && !rabbitmqUrl.startsWith('amqps:')) {
            throw new Error('RabbitMQ URL must start with amqp: or amqps:');
        }
        connection = await amqp.connect(rabbitmqUrl);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
    }
};

export const getChannel = (): Channel => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }
    return channel;
};

export const closeRabbitMQ = async () => {
    try {
        if (channel) {
            await channel.close();
        }
        if (connection) {
            await connection.close();
        }
    } catch (error) {
        console.error('Failed to close RabbitMQ connection', error);
    }
};