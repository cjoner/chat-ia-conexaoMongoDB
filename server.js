//-------------------CONEXAO MONGODB-------------------------//

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Para lidar com dados JSON no corpo das requisições

// Conectando ao MongoDB

mongoose.connect('mongodb+srv://clarachjoner2007:alex156600@chat-chef-ia.ficqopw.mongodb.net/db_chatChef?retryWrites=true&w=majority&appName=Chat-chef-ia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));


// Definindo o schema do histórico
const historicoSchema = new mongoose.Schema({
    userId: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Historico = mongoose.model('Historico', historicoSchema);

// Endpoint para registrar o histórico
app.post('/api/historico', async (req, res) => {
    const { userId, message } = req.body;

    try {
        const novoHistorico = new Historico({ userId, message });
        await novoHistorico.save();
        res.status(201).send('Histórico salvo com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao salvar histórico');
    }
});

app.post('/api/db_chatChef_historico', async (req, res) => {
    const { userId, message } = req.body;

    try {
        const novoHistorico = new Historico({ userId, message });
        await novoHistorico.save();
        res.status(201).send('Histórico salvo com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao salvar histórico');
    }
});

//--------------------CHAT IA---------------------//

// Definir o modelo de Chat
const chatSchema = new mongoose.Schema({
    userMessage: { type: String, required: true },
    aiResponse: { type: String, required: true },
});

const Chat = mongoose.model('Chat', chatSchema);

// Rota básica para o caminho root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Rota para processar a mensagem do usuário e obter a resposta da IA
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log('Received message from user:', userMessage);

        // Simulação de resposta da IA (substitua pela chamada real à IA)
        const aiResponse = `Resposta da IA para: ${userMessage}`;
        console.log('AI response:', aiResponse);

        // Salvar no banco de dados
        const chat = new Chat({ userMessage, aiResponse });
        await chat.save();
        

        res.json({ response: aiResponse });
    } catch (error) {
        console.error('Error processing chat:', error);
        res.status(500).send('Internal Server Error');
    }
});

//--------------INICIAR O SERVER--------------------//

// Teste para ver se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const app = express();
// app.use(express.json()); // Para lidar com dados JSON no corpo das requisições

// // Conectando ao MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('Conectado ao MongoDB'))
// .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// // Definindo o schema do histórico
// const historicoSchema = new mongoose.Schema({
//     userId: String,
//     message: String,
//     timestamp: { type: Date, default: Date.now }
// });

// const Historico = mongoose.model('Historico', historicoSchema);

// // Definindo o schema do chat
// const chatSchema = new mongoose.Schema({
//     userMessage: { type: String, required: true },
//     aiResponse: { type: String, required: true },
// });

// const Chat = mongoose.model('Chat', chatSchema);

// // Configuração da IA do Google
// const apiKey = process.env.GOOGLE_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//     model: 'gemini-1.5-flash',
//     systemInstruction: 'chef de cozinha que dá dicas e responde perguntas de donas de casa, leve em conta a renda dos usuários e recomende restaurantes',
// });

// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: 'text/plain',
// };

// // Rota para processar a mensagem do usuário e obter a resposta da IA
// app.post('/chat', async (req, res) => {
//     try {
//         const userMessage = req.body.message;
//         console.log('Received message from user:', userMessage);

//         // Iniciar uma nova sessão de chat
//         const chatSession = model.startChat({
//             generationConfig,
//             history: [],
//         });

//         const result = await chatSession.sendMessage(userMessage);
//         const aiResponse = result.response.text();
//         console.log('AI response:', aiResponse);

//         // Salvar o histórico de chat no banco de dados
//         const chat = new Chat({ userMessage, aiResponse });
//         await chat.save();

//         res.json({ response: aiResponse });
//     } catch (error) {
//         console.error('Error processing chat:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint para registrar o histórico
// app.post('/api/historico', async (req, res) => {
//     const { userId, message } = req.body;

//     try {
//         const novoHistorico = new Historico({ userId, message });
//         await novoHistorico.save();
//         res.status(201).send('Histórico salvo com sucesso');
//     } catch (error) {
//         res.status(500).send('Erro ao salvar histórico');
//     }
// });

// // Rota básica para o caminho root
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// // Teste para ver se o servidor está funcionando
// app.get('/status', (req, res) => {
//     res.send('Servidor está funcionando!');
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Servidor rodando na porta ${port}`);
// });
