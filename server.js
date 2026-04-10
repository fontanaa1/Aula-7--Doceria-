// =============================================================
// server.js — Servidor Principal da API da Doceria Doce Encanto
// =============================================================
// Aula 7: Integração com Supabase
//
// Fluxo de uma Requisição:
//
//  Frontend (browser)
//     │
//     ▼
//  [cors()]              ← Libera acesso cross-origin
//     │
//     ▼
//  [express.json()]      ← Parseia o body em JSON
//     │
//     ▼
//  [logger]              ← Loga método, rota e status
//     │
//     ▼
//  Rota correta
//  (ex: GET /api/produtos)
//     │
//     ▼
//  [Supabase]            ← Consulta o banco PostgreSQL
//     │
//     ▼ (se der erro)
//  [errorHandler]        ← Captura erros e responde JSON
//     │
//     ▼
//  Resposta ao Frontend
//
// =============================================================

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const { createClient } = require('@supabase/supabase-js');

// ─── Supabase ─────────────────────────────────────────────────
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// ─── App ──────────────────────────────────────────────────────
const app = express();

// ─── Middlewares globais ───────────────────────────────────────
app.use(cors());
app.use(express.json());

// Logger simples
app.use((req, res, next) => {
    const inicio = Date.now();
    res.on('finish', () => {
        console.log(`[${req.method}] ${req.url} → ${res.statusCode} (${Date.now() - inicio}ms)`);
    });
    next();
});

// ─── Rota raiz ────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({ mensagem: '🍰 Bem-vindo à API da Doceria Doce Encanto!' });
});


// =============================================================
// ROTAS — CATEGORIAS
// =============================================================

// GET /api/categorias — lista todas
app.get('/api/categorias', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('categorias')
            .select('*')
            .order('id');

        if (error) throw error;

        res.json(data);
    } catch (err) {
        next(err);
    }
});

// GET /api/categorias/:id — busca por id
app.get('/api/categorias/:id', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('categorias')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) return res.status(404).json({ sucesso: false, mensagem: 'Categoria não encontrada.' });

        res.json(data);
    } catch (err) {
        next(err);
    }
});

// POST /api/categorias — cria nova
app.post('/api/categorias', async (req, res, next) => {
    try {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ sucesso: false, mensagem: 'O campo "nome" é obrigatório.' });
        }

        const { data, error } = await supabase
            .from('categorias')
            .insert({ nome })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
});


// =============================================================
// ROTAS — PRODUTOS
// =============================================================

// GET /api/produtos — lista todos (com filtro opcional por categoriaId)
app.get('/api/produtos', async (req, res, next) => {
    try {
        const { categoriaId } = req.query;

        let query = supabase
            .from('produtos')
            .select('*')
            .order('id');

        if (categoriaId) {
            query = query.eq('categoriaId', categoriaId);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json(data);
    } catch (err) {
        next(err);
    }
});

// GET /api/produtos/:id — busca por id
app.get('/api/produtos/:id', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });

        res.json(data);
    } catch (err) {
        next(err);
    }
});

// POST /api/produtos — cria novo
app.post('/api/produtos', async (req, res, next) => {
    try {
        const { nome, preco, categoriaId, descricao, imagem } = req.body;

        if (!nome || preco == null || !categoriaId) {
            return res.status(400).json({ sucesso: false, mensagem: 'Os campos "nome", "preco" e "categoriaId" são obrigatórios.' });
        }

        const { data, error } = await supabase
            .from('produtos')
            .insert({ nome, preco, categoriaId, descricao, imagem })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
});

// PUT /api/produtos/:id — atualiza
app.put('/api/produtos/:id', async (req, res, next) => {
    try {
        const { nome, preco, categoriaId, descricao, imagem } = req.body;

        const { data, error } = await supabase
            .from('produtos')
            .update({ nome, preco, categoriaId, descricao, imagem })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });

        res.json(data);
    } catch (err) {
        next(err);
    }
});

// DELETE /api/produtos/:id — remove
app.delete('/api/produtos/:id', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .delete()
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });

        res.json({ sucesso: true, mensagem: 'Produto removido.', produto: data });
    } catch (err) {
        next(err);
    }
});


// =============================================================
// 404 — Rota não encontrada
// =============================================================
app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        mensagem: `Rota '${req.url}' não encontrada na API da Doceria Doce Encanto.`
    });
});

// =============================================================
// Error Handler global
// =============================================================
app.use((err, req, res, next) => {
    console.error('💥 Erro:', err.message);
    res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor.',
        detalhe: err.message
    });
});


// =============================================================
// Iniciar servidor
// =============================================================
const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log('');
    console.log('🍰 ================================');
    console.log(`🍰 Servidor rodando!`);
    console.log(`🍰 Acesse: http://localhost:${PORTA}`);
    console.log('🍰 ================================');
    console.log('');
    console.log('📋 Rotas disponíveis:');
    console.log(`   GET    /api/categorias`);
    console.log(`   GET    /api/categorias/:id`);
    console.log(`   POST   /api/categorias`);
    console.log(`   GET    /api/produtos`);
    console.log(`   GET    /api/produtos?categoriaId=N`);
    console.log(`   GET    /api/produtos/:id`);
    console.log(`   POST   /api/produtos`);
    console.log(`   PUT    /api/produtos/:id`);
    console.log(`   DELETE /api/produtos/:id`);
    console.log('');
});

module.exports = app;