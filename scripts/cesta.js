function selecionarprod(produto) {
    const ElementPrice = document.getElementsByClassName(`price-${produto}`);
    const ElementName = document.getElementById(`prod-detalhe-${produto}`);

    
    let productPrice = parseFloat(ElementPrice[0].innerText.replace("R$", "").replace(",",".").trim())
    let productDetalhes = ElementName.innerText.trim();

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let novoProduto = {
        id: produto,
        nome: productDetalhes,
        preco: productPrice,
        quantidade: 1
    };

    let produtoExistente = carrinho.find(item => item.id === produto);
    if (produtoExistente) {
        produtoExistente.quantidade += 1; 
    } else {
        carrinho.push(novoProduto); 
    }


    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert("O produto foi adcionado")
    //window.location.href = 'cesta.html';
}


function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; 
    const CSSboxRule = document.querySelector('.box');
    const CSSCardRule = document.querySelector('.card');
    const CSSconteinerRule = document.querySelector('.container');

   const prodimagens = {
        'prod-1': 'https://static.paodeacucar.com/img/uploads/1/765/13168765.png',
        'prod-2': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY435Ts2AGt4JBwoR9zpBixbYzfc0mDN379A&s',
        'prod-3': 'https://images.tcdn.com.br/img/img_prod/587393/racao_whiskas_gatos_adultos_sabor_carne_10_1kg_95_1_20171129200614.jpg',
        'prod-4': 'https://www.petlove.com.br/images/products/266024/product/Ra%C3%A7%C3%A3o_Seca_PremieR_Pet_Golden_Gatos_Adultos_Carne_-_10_1_Kg_310001-3_1.jpg?1674066666',
        'prod-5': 'https://cdn.awsli.com.br/600x450/3/3088/produto/109903351/abdebe5be1.jpg',
    }

    let demoElement = document.getElementById("demo");
    
    if(carrinho.length === 0){
        CSSCardRule.remove();
        CSSboxRule.remove();

        CSSconteinerRule.innerHTML = `
        
        <h2> Seu carrinho está vazio </h2>


        `;
        
        CSSconteinerRule.style.color = 'red';
       
    }
    carrinho.forEach(produto => {
        let cardProd = `
        <div class="card-item">
            <img id="imagprod-${produto.id}" src="${prodimagens[produto.id]}" alt="Imagem do produto">
            <div class="info">
                <p id="prod-detalhe-${produto.id}">${produto.nome}</p>
                <div class="quantidade">
                    <button onclick="alterarQuantidade('${produto.id}', -1)">-</button>
                    <input type="text" id="quantidade-${produto.id}" value="${produto.quantidade}" readonly>
                    <button onclick="alterarQuantidade('${produto.id}', 1)">+</button>
                </div>
                <p id="price-${produto.id}"> R$: ${produto.preco.toLocaleString('pt-BR',{minimumFractionDigits: 2})}</p>
            </div>
            <button class="remove" onclick="removerProduto('${produto.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>`;
        demoElement.innerHTML += cardProd;
    });
}


function alterarQuantidade(produtoId, delta) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let produto = carrinho.find(item => item.id === produtoId);

    if (produto) {
        produto.quantidade += delta;
        if (produto.quantidade <= 0) {
            removerProduto(produtoId); 
        } else {
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            document.getElementById(`quantidade-${produtoId}`).value = produto.quantidade;
        }
    }
    
    resumoCompras();
}

function resumoCompras(){
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let frete = 30;
    let subtotal = 0
    
    carrinho.forEach( novoProduto =>{subtotal += novoProduto.preco * novoProduto.quantidade} ) ;
    let total = subtotal + frete;

    document.getElementById('Subtotal').innerText = `Subtotal: R$${subtotal.toLocaleString('pt-BR',{minimumFractionDigits: 2})}`;
    document.getElementById('Frete').innerText = `Frete: R$${frete.toLocaleString('pt-BR',{minimumFractionDigits: 2})}`;
    document.getElementById('Total').innerText = `Total: R$${total.toLocaleString('pt-BR',{minimumFractionDigits: 2})}`;
    console.log(subtotal);
}

function removerProduto(produtoId) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoIndex = carrinho.findIndex(produto => produto.id === produtoId);

    if (produtoIndex !== -1) {
        carrinho.splice(produtoIndex, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        window.location.reload();
        // carregarCarrinho();
    }
}

document.addEventListener('DOMContentLoaded', () =>{
carregarCarrinho();
resumoCompras();
});