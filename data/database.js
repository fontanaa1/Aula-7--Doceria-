// =========================
// CATEGORIAS
// =========================
let categorias = [
  { id: 1, nome: "Bolos" },
  { id: 2, nome: "Cupcakes" },
  { id: 3, nome: "Doces & Salgadinhos" },
  { id: 4, nome: "Sobremesas Especiais" },
  { id: 5, nome: "Bebidas" }
];

// =========================
// PRODUTOS
// =========================
let produtos = [
  // ================= BOLOS =================
  {
    id: 1,
    categoriaId: 1,
    nome: "Bolo Floresta Negra",
    descricao: "Deliciosa combinação de camadas de pão de ló de chocolate, chantilly, cerejas e licor de cereja.",
    preco: 85.00,
    imagem: "https://static.vecteezy.com/system/resources/thumbnails/047/842/674/small_2x/black-forest-cake-with-chocolate-sponge-cake-cherries-and-whipped-cream-png.png"
  },
  {
    id: 2,
    categoriaId: 1,
    nome: "Bolo de Chocolate",
    descricao: "Recheio cremoso e cobertura especial.",
    preco: 45.00,
    imagem: "https://static.vecteezy.com/system/resources/previews/021/217/324/non_2x/chocolate-cake-with-bonbon-sweet-brigadeiro-png.png"
  },
  {
    id: 3,
    categoriaId: 1,
    nome: "Bolo Red Velvet",
    descricao: "Massa macia com cream cheese.",
    preco: 55.00,
    imagem: "https://cdn.sodiedoces.com.br/wp-content/uploads/2021/11/29161228/122_fatia_bolo_de_red_velvet_brasil_540x400px.png"
  },
  {
    id: 4,
    categoriaId: 1,
    nome: "Bolo de Morango com Ninho",
    descricao: "Massa branca, creme de leite Ninho e morangos frescos.",
    preco: 70.00,
    imagem: "https://cdn.vnda.com.br/1000x/petitefleurpatisserie/2023/05/19/13_5_5_595_Bolo20de20morango20fatia.png?v=1684513916"
  },
  {
    id: 5,
    categoriaId: 1,
    nome: "Bolo Prestígio",
    descricao: "Massa de chocolate com recheio de coco cremoso.",
    preco: 60.00,
    imagem: "https://static.cestasmichelli.com.br/images/product/rs-16902-46747-0.jpg?ims=750x750"
  },

  // ================= CUPCAKES =================
  {
    id: 6,
    categoriaId: 2,
    nome: "Cupcake Oreo",
    descricao: "Cobertura cremosa com pedaços de Oreo.",
    preco: 12.00,
    imagem: "https://png.pngtree.com/png-clipart/20241114/original/pngtree-oreo-chocolate-cupcake-png-image_17022858.png"
  },
  {
    id: 7,
    categoriaId: 2,
    nome: "Cupcake Morango",
    descricao: "Recheado com geleia artesanal.",
    preco: 10.00,
    imagem: "https://png.pngtree.com/png-vector/20230906/ourmid/pngtree-cupcake-strawberry-with-cream-png-image_10009086.png"
  },
  {
    id: 8,
    categoriaId: 2,
    nome: "Cupcake Chocolate Belga",
    descricao: "Cobertura cremosa com raspas de chocolate meio amargo.",
    preco: 12.00,
    imagem: "https://static.vecteezy.com/system/resources/thumbnails/041/933/414/small/ai-generated-chocolate-cupcake-with-chocolate-frosting-on-transparent-background-free-png.png"
  },
  {
    id: 9,
    categoriaId: 2,
    nome: "Cupcake Limão Siciliano",
    descricao: "Leve e refrescante, com cobertura cremosa cítrica.",
    preco: 11.00,
    imagem: "https://www.ncavalhieri.com/wp-content/uploads/2017/02/Cupcake_Baunilha_Limao-4.jpg"
  },

  // ================= SOBREMESAS ESPECIAIS =================
  {
    id: 10,
    categoriaId: 4,
    nome: "Torta de Morango",
    descricao: "Deliciosa Torta de Morango.",
    preco: 75.90,
    imagem: "https://png.pngtree.com/png-clipart/20240910/original/pngtree-deliciously-sweet-strawberry-tart-dessert-png-image_15980915.png"
  },
  {
    id: 11,
    categoriaId: 4,
    nome: "Brownie Gourmet",
    descricao: "Brownie artesanal com casquinha crocante e interior macio.",
    preco: 8.00,
    imagem: "https://static.vecteezy.com/system/resources/thumbnails/044/771/065/small/a-stack-of-three-chocolate-brownies-on-a-white-background-ai-generate-png.png"
  },
  {
    id: 12,
    categoriaId: 4,
    nome: "Taça da Felicidade (Morango)",
    descricao: "Camadas de mousse, morango fresco e brigadeiro.",
    preco: 22.00,
    imagem: "https://i.pinimg.com/736x/49/8e/2a/498e2a13fef6f1d239cd1314fcb92a84.jpg"
  },
  {
    id: 13,
    categoriaId: 4,
    nome: "Banoffee",
    descricao: "Base crocante, doce de leite, banana e chantilly.",
    preco: 18.00,
    imagem: "https://t3.ftcdn.net/jpg/09/56/71/88/360_F_956718869_TztZBEvNZ9rneE4dXdufkef4nP35mX7z.jpg"
  },
  {
    id: 14,
    categoriaId: 4,
    nome: "Pudim Tradicional",
    descricao: "Clássico pudim de leite condensado com calda caramelizada.",
    preco: 12.00,
    imagem: "https://png.pngtree.com/png-vector/20240207/ourmid/pngtree-caramel-custard-pudding-png-image_11712795.png"
  },

  // ================= DOCES & SALGADINHOS =================
  {
    id: 15,
    categoriaId: 3,
    nome: "Brigadeiro Gourmet (unid.)",
    descricao: "Feito com chocolate nobre e granulado belga.",
    preco: 3.50,
    imagem: "https://i.pinimg.com/736x/44/f9/29/44f929b2af1d40ca0d652533f7353da9.jpg"
  },
  {
    id: 16,
    categoriaId: 3,
    nome: "Beijinho (unid.)",
    descricao: "Tradicional com coco fresco e toque especial.",
    preco: 3.50,
    imagem: "https://i.pinimg.com/1200x/c1/42/c4/c142c4bf4829c1de8ca76fa9ac8e3a2b.jpg"
  },
  {
    id: 17,
    categoriaId: 3,
    nome: "Bomba de Morango",
    descricao: "Recheada com creme branco e morango fresco.",
    preco: 14.00,
    imagem: "https://img.freepik.com/fotos-premium/trufas-de-chocolate-com-recheio-de-morango-isoladas-em-branco_74692-660.jpg"
  },
  {
    id: 18,
    categoriaId: 3,
    nome: "Croissant Doce",
    descricao: "Recheado com chocolate ou creme de avelã.",
    preco: 16.00,
    imagem: "https://static.vecteezy.com/system/resources/thumbnails/023/742/407/small/fresh-croissant-isolated-illustration-ai-generative-free-png.png"
  },

  // ================= BEBIDAS =================
  {
    id: 19,
    categoriaId: 5,
    nome: "Capuccino",
    descricao: "Café expresso, leite vaporizado e espuma de leite.",
    preco: 10.00,
    imagem: "https://png.pngtree.com/png-vector/20250327/ourmid/pngtree-assorted-coffee-cups-including-cappuccino-cup-with-heart-png-image_15878581.png"
  },
  {
    id: 20,
    categoriaId: 5,
    nome: "Chocolate Quente",
    descricao: "Cremoso e irresistível.",
    preco: 15.00,
    imagem: "https://static.vecteezy.com/system/resources/thumbnails/068/284/748/small/indulgent-hot-chocolate-delight-brimming-with-marshmallows-and-chocolate-drizzle-against-transparent-png.png"
  },
  {
    id: 21,
    categoriaId: 5,
    nome: "Refrigerante Lata",
    descricao: "Coca Cola, Sprite, Fanta ou Guaraná.",
    preco: 6.00,
    imagem: "https://marcoluccio.com.br/wp-content/uploads/2021/03/Refrigerante.png"
  },
  {
    id: 22,
    categoriaId: 5,
    nome: "Suco Natural (300ml)",
    descricao: "Sabores: laranja, abacaxi ou morango.",
    preco: 10.00,
    imagem: "https://static.vecteezy.com/system/resources/previews/027/309/208/non_2x/orange-juice-with-ai-generated-free-png.png"
  }
];

module.exports = { categorias, produtos };