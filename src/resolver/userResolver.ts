import { getRepository, In } from 'typeorm';
import { User } from '../entities/User';
import { publishToQueue } from '../rabbitmq/publisher';

export const userResolver = {
    users: async () => {
        const userRepository = getRepository(User);
        return await userRepository.find();
    },

    usersById: async ({ id }: { id: number }) => {
        const userRepository = getRepository(User);
        return await userRepository.findOneBy({ id });
    },

    usersByIds: async ({ ids }: { ids: number[] }) => {
        const userRepository = getRepository(User);
        return await userRepository.findBy({ id: In(ids) });
    },

    addUser: async ({ name, email }: { name: string; email: string }) => {
        const userRepository = getRepository(User);
        const user = userRepository.create({ name, email });
        const savedUser = await userRepository.save(user);
        await publishToQueue('userQueue', { id: savedUser.id, name: savedUser.name, email: savedUser.email });
        return savedUser;
    },
};
