import { User } from '../../../models/userModel'
import bcrypt from 'bcryptjs'

const users = [
    { "email": "alice@example.com", "pseudo": "Alice", "password": "mot de passe", "role": "admin" },
    { "email": "bob@example.com", "pseudo": "Bob", "password": "mot de passe", "role": "employee" },
    { "email": "charlie@example.com", "pseudo": "Charlie", "password": "mot de passe", "role": "user" },
    { "email": "dave@example.com", "pseudo": "Dave", "password": "mot de passe", "role": "user" },
    { "email": "eve@example.com", "pseudo": "Eve", "password": "mot de passe", "role": "admin" },
    { "email": "frank@example.com", "pseudo": "Frank", "password": "mot de passe", "role": "employee" },
    { "email": "grace@example.com", "pseudo": "Grace", "password": "mot de passe", "role": "user" },
    { "email": "hank@example.com", "pseudo": "Hank", "password": "mot de passe", "role": "user" },
    { "email": "isla@example.com", "pseudo": "Isla", "password": "mot de passe", "role": "employee" },
    { "email": "jack@example.com", "pseudo": "Jack", "password": "mot de passe", "role": "admin" },
    { "email": "kate@example.com", "pseudo": "Kate", "password": "mot de passe", "role": "user" },
    { "email": "luke@example.com", "pseudo": "Luke", "password": "mot de passe", "role": "employee" },
    { "email": "mona@example.com", "pseudo": "Mona", "password": "mot de passe", "role": "user" },
    { "email": "nina@example.com", "pseudo": "Nina", "password": "mot de passe", "role": "admin" },
    { "email": "owen@example.com", "pseudo": "Owen", "password": "mot de passe", "role": "user" },
    { "email": "paul@example.com", "pseudo": "Paul", "password": "mot de passe", "role": "employee" },
    { "email": "quinn@example.com", "pseudo": "Quinn", "password": "mot de passe", "role": "user" },
    { "email": "rachel@example.com", "pseudo": "Rachel", "password": "mot de passe", "role": "user" },
    { "email": "sam@example.com", "pseudo": "Sam", "password": "mot de passe", "role": "employee" },
    { "email": "tina@example.com", "pseudo": "Tina", "password": "mot de passe", "role": "admin" },
    { "email": "uma@example.com", "pseudo": "Uma", "password": "mot de passe", "role": "user" }
]


export const seedUsers = async () => {
    try {

        await User.deleteMany({}) // Clear the collection before seeding

        const hashedUsers = await Promise.all(users.map(async user => ({
            ...user,
            password: await bcrypt.hash(user.password, 10)
        })))

        await User.insertMany(hashedUsers) // Insert the fixtures
        console.log('Users seeded successfully')
    } catch (err) {
        console.error('Error seeding database:', err)
    }
}
