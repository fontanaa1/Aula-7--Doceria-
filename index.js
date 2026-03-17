const express = require('express');
const app = express();

app.use(express.json());


// =========================
// FUNÇÃO PARA GERAR ID
// =========================
function gerarNovoId(lista) {
    if (lista.length === 0) return 1;
    return Math.max(...lista.map(item => item.id)) + 1;
}


// =========================
// CATEGORIAS DA DOCERIA
// =========================
let categorias = [
    { id: 1, nome: "Bolos" },
    { id: 2, nome: "Cupcakes" },
    { id: 3, nome: "Doces & Salgadinhos" },
    { id: 4, nome: "Sobremesas Especiais" },
    { id: 5, nome: "Bebidas" }
];


// =========================
// PRODUTOS DA DOCERIA
// =========================
let produtos = [ 
// =========================
  // BOLOS (categoriaId: 1)
  // =========================
  { id: 1, categoriaId: 1, nome: "Bolo Floresta Negra", preco: 85.00 },
  { id: 2, categoriaId: 1, nome: "Bolo de Chocolate", preco: 45.00 },
  { id: 3, categoriaId: 1, nome: "Bolo Red Velvet", preco: 55.00 },
  { id: 4, categoriaId: 1, nome: "Bolo de Morango com Ninho", preco: 70.00 },
  { id: 5, categoriaId: 1, nome: "Bolo Prestígio", preco: 60.00 },
  { id: 6, categoriaId: 1, nome: "Bolo de Cenoura com Chocolate", preco: 40.00 },
  { id: 7, categoriaId: 1, nome: "Bolo Três Leites", preco: 65.00 },
  { id: 8, categoriaId: 1, nome: "Bolo de Limão", preco: 38.00 },

  // =========================
  // CUPCAKES (categoriaId: 2)
  // =========================
  { id: 9, categoriaId: 2, nome: "Cupcake Oreo", preco: 12.00 },
  { id: 10, categoriaId: 2, nome: "Cupcake Morango", preco: 10.00 },
  { id: 11, categoriaId: 2, nome: "Cupcake Chocolate Belga", preco: 12.00 },
  { id: 12, categoriaId: 2, nome: "Cupcake Limão Siciliano", preco: 11.00 },
  { id: 13, categoriaId: 2, nome: "Cupcake Red Velvet", preco: 13.00 },
  { id: 14, categoriaId: 2, nome: "Cupcake Doce de Leite", preco: 11.00 },

  // =========================
  // DOCES & SALGADINHOS (categoriaId: 3)
  // =========================
  { id: 15, categoriaId: 3, nome: "Brigadeiro Gourmet", preco: 3.50 },
  { id: 16, categoriaId: 3, nome: "Beijinho", preco: 3.50 },
  { id: 17, categoriaId: 3, nome: "Bicho de Pé", preco: 3.50 },
  { id: 18, categoriaId: 3, nome: "Casadinho", preco: 3.50 },
  { id: 19, categoriaId: 3, nome: "Coxinha", preco: 6.00 },
  { id: 20, categoriaId: 3, nome: "Empadinha", preco: 7.00 },
  { id: 21, categoriaId: 3, nome: "Croissant Doce", preco: 16.00 },
  { id: 22, categoriaId: 3, nome: "Bomba de Chocolate", preco: 14.00 },

  // =========================
  // SOBREMESAS ESPECIAIS (categoriaId: 4)
  // =========================
  { id: 23, categoriaId: 4, nome: "Torta de Morango", preco: 75.90 },
  { id: 24, categoriaId: 4, nome: "Banoffee", preco: 18.00 },
  { id: 25, categoriaId: 4, nome: "Pudim Tradicional", preco: 12.00 },
  { id: 26, categoriaId: 4, nome: "Brownie Gourmet", preco: 8.00 },
  { id: 27, categoriaId: 4, nome: "Taça da Felicidade (Morango)", preco: 22.00 },
  { id: 28, categoriaId: 4, nome: "Cheesecake de Frutas Vermelhas", preco: 20.00 },
  { id: 29, categoriaId: 4, nome: "Mousse de Maracujá", preco: 10.00 },

  // =========================
  // BEBIDAS (categoriaId: 5)
  // =========================
  { id: 30, categoriaId: 5, nome: "Capuccino", preco: 10.00 },
  { id: 31, categoriaId: 5, nome: "Chocolate Quente", preco: 15.00 },
  { id: 32, categoriaId: 5, nome: "Refrigerante Lata", preco: 6.00 },
  { id: 33, categoriaId: 5, nome: "Suco Natural (300ml)", preco: 10.00 },
  { id: 34, categoriaId: 5, nome: "Água Mineral", preco: 4.00 },
  { id: 35, categoriaId: 5, nome: "Café Expresso", preco: 6.00 }
];

// =====================================================
// =================== PRODUTOS ========================
// =====================================================

// GET todos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// GET por ID
app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(produto);
});

// POST
app.post('/produtos', (req, res) => {
    const { nome, preco, categoriaId } = req.body;

    if (!nome || preco == null || !categoriaId) {
        return res.status(400).json({ error: "Nome, preço e categoriaId são obrigatórios" });
    }

    const categoriaExiste = categorias.find(c => c.id === categoriaId);
    if (!categoriaExiste) {
        return res.status(400).json({ error: "Categoria não existe" });
    }

    const novoProduto = {
        id: gerarNovoId(produtos),
        nome,
        preco,
        categoriaId
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// PUT
app.put('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nome, preco, categoriaId } = req.body;

    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Produto não encontrado" });
    }

    if (categoriaId) {
        const categoriaExiste = categorias.find(c => c.id === categoriaId);
        if (!categoriaExiste) {
            return res.status(400).json({ error: "Categoria não existe" });
        }
    }

    produtos[index] = {
        ...produtos[index],
        nome: nome ?? produtos[index].nome,
        preco: preco ?? produtos[index].preco,
        categoriaId: categoriaId ?? produtos[index].categoriaId
    };

    res.json(produtos[index]);
});

// DELETE
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Produto não encontrado" });
    }

    const removido = produtos.splice(index, 1)[0];
    res.json({ mensagem: "Produto removido", produto: removido });
});


// =====================================================
// =================== CATEGORIAS ======================
// =====================================================

// GET todas
app.get('/categorias', (req, res) => {
    res.json(categorias);
});

// GET por ID
app.get('/categorias/:id', (req, res) => {
    const id = Number(req.params.id);
    const categoria = categorias.find(c => c.id === id);

    if (!categoria) {
        return res.status(404).json({ error: "Categoria não encontrada" });
    }

    res.json(categoria);
});


// =====================================================
// FILTRAR PRODUTOS POR CATEGORIA
// =====================================================

app.get('/produtos/categoria/:id', (req, res) => {
    const id = Number(req.params.id);

    const filtrados = produtos.filter(p => p.categoriaId === id);

    res.json(filtrados);
});


// =========================
// INICIAR SERVIDOR
// =========================
app.listen(3000, () => {
    console.log("🍰 Servidor da Doceria rodando em http://localhost:3000");
});