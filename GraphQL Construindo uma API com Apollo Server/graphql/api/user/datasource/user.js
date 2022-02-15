const { RESTDataSource } = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = ' http://localhost:3000';
        this.customResponse = { code: 200, message: "Sucesso" }
    }

    async getUsers() {
        const users = await this.get('/users');
        return users.map(async user => ({
            id: user.id,
            nome: user.nome,
            email: user.email,
            ativo: user.ativo,
            role: await this.get(`/roles/${user.role}`)
        }));
    }

    async getUserById(id) {
        const user = await this.get(`/users/${id}`);
        user.role = await this.get(`/roles/${user.role}`);
        return user;
    }

    async addUser(user) {
        const users = await this.get(`/users/`);
        user.id = users[users.length - 1].id + 1;

        const roles = await this.get(`/roles?type=${user.role}`);
        await this.post(`/users/`, {...user, role: roles[0].id });

        return { ...user, role: roles[0] }
    }

    async updateUser(data) {
        const roles = await this.get(`/roles?type=${data.user.role}`);
        await this.put(`/users/${data.id}`, {...data.user, role: roles[0].id });
        return { 
            ...this.customResponse, 
            user: { ...data.user, role: roles[0] }
        }
    }

    async deleteUser(id) {
        await this.delete(`/users/${id}`);
        return { ...this.customResponse };
    }
}

module.exports = UserAPI;