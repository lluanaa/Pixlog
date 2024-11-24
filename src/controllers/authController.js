const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, password } = req.body;

    // Usuário e senha para teste
    const mockUser = { username: 'admin', password: '12345' };

    console.log(username, password);

    if (username === mockUser.username && password === mockUser.password) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Credenciais inválidas' });
};

module.exports = { login };