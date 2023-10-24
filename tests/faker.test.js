require('./test-helper');
const { fakerPT_BR: faker } = require('@faker-js/faker');

describe('Faker tests', () => {
    it('Gen user using faker', async () => {
        const user = {
            id: faker.string.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            cellphone: faker.phone.number().replace(/\D/g, ''),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate(),
            registeredAt: faker.date.past(),
        };

        console.log(user);
    });
});
