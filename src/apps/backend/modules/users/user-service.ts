import User from './user-model';

async function getAllUsers() {
    return await User.find();
}

export { getAllUsers };
