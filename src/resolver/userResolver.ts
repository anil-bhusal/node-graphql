import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { AddUserArgs } from '../types/userResolvers.type';

export const root = {
    users: async () => {
        const userRepository = getRepository(User);
        return await userRepository.find();
    },
    addUser: async ({ name, email }: AddUserArgs) => {
        const userRepository = getRepository(User);
        const user = userRepository.create({ name, email });
        return await userRepository.save(user);
    },
};
