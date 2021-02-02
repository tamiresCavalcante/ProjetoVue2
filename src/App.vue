<template>
      <div id="app">
    

        <header class="header">
            <img src="./assets/logo.png" alt="aditum" class="imgLogo">

            <div class="carrinho_menu" @click="carrinhoAtivo = true">{{carrinhoTotal | numeroPreco}} | {{carrinho.length}} </div>
            
        </header>


        <section class="produtos">
            <div v-for="item in produtos" @click="abrirModal(item.id)" :key="item.id" class="produto">
                <img v-bind:src="item.img" alt="item.nome" class="produto_img"/>
                <div class="produto_info">
                    <span class="produto_preco">{{item.preco | numeroPreco}}</span>
                    <h2 class="produto_titulo">{{item.nome}}</h2>
                </div>  
            </div>
        </section>

        <section class="modal" v-if="produto" @click="fecharModal">
            <div class="modal_container">
                <div class="modal_img">
                    <img v-bind:src="produto.img" :alt="produto.nome">
                </div>
                <div class="modal_dados">
                    <button @click="produto = false" class="modal_fechar">X</button>
                    <span class="modal_preco">{{produto.preco | numeroPreco}}</span>
                    <h2 class="modal_titulo">{{produto.nome}}</h2>
                    <p>{{produto.descricao}}</p>
                    <button v-if="produto.estoque > 0" class="modal_btn" @click="adicionarItem">Adicionar ao carrinho</button>
                    <button v-else class="modal_btn esgotado" disabled>Produto Estogado</button>
                </div>
                <div class="avaliacoes">
                    <h2 class="avaliacoes_subtitulo">Avaliações</h2>
                    <ul>
                        <li v-for="avaliacao in produto.avaliacoes" class="avaliacao" :key="avaliacao">
                            <p class="avaliacao_descricao">{{avaliacao.comentario}}</p>
                            <p class="avaliacao_usuario">{{avaliacao.nome}} | {{avaliacao.estrelas}} estrelas</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="carrinho_modal modal" :class="{ativo: carrinhoAtivo}" @click="clickForaCarrinho">
            <div class="carrinho_container">
                <button class="carrinho_fechar" @click="carrinhoAtivo = false">X</button>
                <h2 class="carrinho_titulo">Carrinho</h2>
                <div v-if="carrinho.length > 0">
                    <ul class="carrinho_lista">
                        <li v-for="(item, index) in carrinho" class="carrinho_item" :key="item.id">
                            <p>{{item.nome}}</p>
                            <p class="carrinho_preco">{{item.preco | numeroPreco}}</p>
                            <button class="carrinho_remover" @click="removerItem(index)">X</button>
                        </li>
                    </ul>
                    <p class="carrinho_total">{{carrinhoTotal | numeroPreco}}</p>
                    <button class="carrinho_finalizar">Finalizar Compras</button>
                </div>
                <p v-else>O carrinho está vazio</p>
            </div>
        </section>

        <div class="alerta" :class="{ativo: alertaAtivo}">
            <p class="alerta_mensagem">{{mensagemAlerta}}</p>
        </div>

    </div>


</template>

<script>




import axios from 'axios'
import VueAxios from 'vue-axios'
(VueAxios, axios)
export default {

    

    data: function() {
        
        return{
            produtos: [],
            produto: false,
            carrinho: [],
            carrinhoAtivo: false,
            mensagemAlerta: "Item adicionado",
            alertaAtivo: false,
        }
    },

   /* mounted() {
        
        axios.get('https://run.mocky.io/v3/1a724142-9ae6-46cd-86cd-3ddffc589228')
        .then(response => {
            console.log(response.data)
            this.produtos = response.data
        }); 
        
        const id = axios.get(`./assets/api/produtos/${id}/dados.json`)
        .then( response => {
            this.produto = response.data
        })
        

    },*/

    /*mounted(){
        api.get('https://run.mocky.io/v3/1a724142-9ae6-46cd-86cd-3ddffc589228').then(response => {
            this.produtos = response.data
        });
    },*/
   
    

    filters: {
        numeroPreco(valor) {
           return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
        }
    },
    computed: {
        carrinhoTotal() {
            let total = 0;
            if(this.carrinho.length) {
                this.carrinho.forEach(item => {
                    total += item.preco;
                })
            }
            return total;
        }
    },
    
    methods: {
      /*  fetchProdutos() {
            fetch("https://run.mocky.io/v3/316f3c9f-6224-4ba1-9128-137e5cd62bc3")
            .then(r => r.json())
            .then(r => {
                this.produtos = r;
            })
        },
        fetchProduto(id) {
           fetch(`./api/produtos/${id}/dados.json`)
            .then(r => r.json())
            .then(r => {
                this.produto = r;
            })            
        },
        
        */

      /*  mounted(){
            this.fetchProdutos();
            this.fetchProduto();
        },*/

        
        async fetchProdutos() {
            await axios.get('https://run.mocky.io/v3/1a724142-9ae6-46cd-86cd-3ddffc589228')
            .then(response => {
            console.log(response.data)
            this.produtos = response.data
            }); 
        },
        async fetchProduto(id){
            const resposta = await axios.get(`./assets/api/produtos/${id}/dados.json`)
            if(resposta.status === 200) {
                this.produto = resposta.data
            }
        },

        /*async fetchProdutos(){
            const produtos = (await axios.get('https://run.mocky.io/v3/316f3c9f-6224-4ba1-9128-137e5cd62bc3'))
            .then(response => {
                this.produtos = response.data
            } )
            
        },*/

        /*listar(){
            Produto.listar().then(resposta => {
                this.produtos = reposta.data
            })
        },
            */
        
        /*export const http = axios.create({
            baseURL: 'https://run.mocky.io/v3/316f3c9f-6224-4ba1-9128-137e5cd62bc3'
        }),

        listar:() => {
            return http.get('fetchProdutos')
        },
        mounted(){
            fetchProdutos.listar().then(resposta => {
                this.produtos = resposta.data
            })
        },
      */
        
    
        abrirModal(id) {
            this.fetchProduto(id);
            window.scrollTo({
                top:0
            })
        },

        fecharModal({target, currentTarget}){
            if (target === currentTarget)
                this.produto = false;
        },
        clickForaCarrinho({target, currentTarget}) {
            if(target === currentTarget) this.carrinhoAtivo = false;
        },
        adicionarItem(){
            this.produto.estoque--;
            const {id, nome, preco} = this.produto;
            this.carrinho.push({id, nome, preco});
            this.alerta(`${nome} foi adicionado ao carrinho`);
        },
        removerItem(index) {
            this.carrinho.splice(index,1);
        },
        checarLocalStorage() {
            if(window.localStorage.carrinho) 
                this.carrinho = JSON.parse(window.localStorage.carrinho);
        },
        compararEstoque() {
            const items = this.carrinho.filter(item => {
                if(item.id === this.produto.id){
                    return true;
                }
            })
            this.produto.estoque -= items.length;
        },
        alerta(mensagem) {
            this.mensagemAlerta = mensagem;
            this.alertaAtivo = true;
            setTimeout(() => {
                this.alertaAtivo = false;
            }, 2000);
        },
    },
    watch: {
        produto() {
            document.title = this.produto.nome || "Aditum";
            if(this.produto) {
                this.compararEstoque();
            }
        },
        carrinho() {
            window.localStorage.carrinho = JSON.stringify(this.carrinho);
        }
    },
    created() {
        this.fetchProdutos();
        this.checarLocalStorage();
    }


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

body, h1, h2, ul, li, p {
    padding: 0px;
    margin: 0px;

}

ul {
    list-style: none;
}

* {
    box-sizing: border-box;
}

body {
    background: linear-gradient(to right, #1a1a1a 50%, #ffffff 50%);
    font-family: "Noto Serif";
}

#app {
    padding: 0 80px;
}

/*header*/

.header {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    margin: 0 auto;
}

.imgLogo {
    width: 20%;
    height: 20%;
    
}



.carrinho_menu::after {
    content: "";
    display: inline-block;
    background: url("./assets/carrinho.svg") no-repeat center center;
    width: 40px;
    height: 40px;
    margin-left: 10px;
    background-color: rgb(179, 23, 179);
}

.carrinho_menu {
    display: flex;
    align-items: center;
    cursor: pointer;
}

/*Lista de Produtos */
.produtos {
    max-width: 900px;
   /* margin-top: 100px;*/
    margin-left: auto;
    margin-right: auto;

}

.produto {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    background-color: #ffffff;
    box-shadow: 0 0 3rem rgba(0,0,0, .3);
    cursor: pointer;
}

.produto_img {
    max-width: 400px;
    margin-right: 50px;

}

.produto_titulo {
    font-size: 2.2rem;
    line-height: 1;
}

.produto_preco {
    font-size: 1.5rem;
    color: rgba(0,0,0,.5);
    font-family: 'Courier New', Courier, monospace;
}

.modal::before {
    content: "";
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.664);
}

.modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 80px;

}

.modal_container {
    position: relative;
    background: linear-gradient(to right, transparent 250px, rgb(250, 237, 239) 250px);
    z-index: 1;
    display: grid;
    align-items: end;
    grid-gap: 50px;
    padding: 0px 50px 50px 0px;
    animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate3D(50px, 0, 0);
    }
    to {
        opacity: 1;
        transform: translate3D(0px, 0, 0);
    }
}

.modal_img {
    grid-column: 1;
    margin-top: 50px;
    box-shadow: 0px 0px 2rem rgba(0,0,0,.3);
}

.modal_img img {
    max-width: 300px;
    display: block;
}

.modal_dados {
    max-width: 600px;
    grid-column: 2;

}

.modal_titulo {
    font-size: 3rem;
}

.modal_btn {
    margin-top: 80px;
    cursor: pointer;
    color: rgb(255, 0, 149);
    font-size: 1.3rem;
    border: 4px solid black;
    padding: 10px 40px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.modal_btn.esgotado {
    background: grey;
    color: white;
    border: 4px solid grey;
}

.modal_btn:active {
    background: grey;
}

.modal_btn:hover {
    background: black;
    color: white;
    border: 4px solid transparent;
    
}

.modal_fechar, .carrinho_fechar {
    background: rgb(250, 237, 239);
    border-radius: 50%;
    border: 2px solid black;
    width: 50px;
    height: 50px;
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0px 3px 4px rgba(0,0,0, .3), 0px 4px 10px rgba(0,0,0,.2);
}

/*Avaliações dos produtos*/

.avaliacoes {
    grid-column: 2;
}

.avaliacao {
    border-bottom: 1px solid rgba(0,0,0,.3);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding-bottom: 20px;
}

.avaliacoes_subtitulo {
    font-size: 2rem;
}

.avaliacao_descricao {
    color: rgb(58, 58, 58);
    margin: 10px 0;
}

.avaliacao_usuario {
    color: rgb(58, 58, 58);
    font-weight: bold;
}

/*alerta*/

.alerta {
    position: absolute;
    top: 20px;
    left: 0px;
    z-index: 10;
    width: 100%;
    text-align: center;
    display: none;

}

.alerta.ativo {
    display: block; 
    animation: fadeInDown .3s forwards; 
}

@keyframes fadeInDown {
    from {
        transform: translate3d(0, -30px, 0);
        opacity: 0;
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0px, 0);
    }
}

.alerta_mensagem {
    background: white;
    display: inline-block;
    padding: 30px 60px;
    border: 2px solid rgb(255, 0, 149);
    box-shadow: 0px 3px 4px rgba(0,0,0,.1);
}

/*Carrinho de compras*/

.carrinho_modal::before {
    content: "";
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.5);
}

.carrinho_modal {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 200px;
    display: none;

}

.carrinho_modal.ativo {
    display: block;

}

.carrinho_container {
    position: relative;
    margin: 80px auto;
    background: white;
    padding: 40px;
    max-width: 800px;
    animation: fadeInDown 1s forwards;
}

.carrinho_item {
    display: grid;
    grid-template-columns: 1fr 1fr 50px;
    border-bottom: 2px solid rgba(0,0,0,.1);
    padding: 8px 0;
}

.carrinho_titulo {
    margin-bottom: 10px;
    border-bottom: 3px solid rgb(179, 23, 179);
    padding-bottom: 20px;

}

.carrinho_remover {
    border:none;
    font-size: 1rem;
    cursor: pointer;

}

.carrinho_preco {
    text-align: right;

}

.carrinho_total {
    text-align: right;
    padding: 10px 50px;
    border-bottom: 3px solid rgb(179, 23, 179); 
}

.carrinho_finalizar {
    display: block;
    margin-left: auto;
    background: rgb(179, 23, 179);
    cursor: pointer;
    color: white;
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.2rem;
    padding: 10px 20px;
    border: none;

}

.carrinho_fechar {
    background: white;
}

/*responsividade*/

@media screen and (max-width: 900px) {
    body {
        background: #1a1a1a;
    }
    #app {
        padding: 0 10px;
    }
    .produtos {
        margin-top: 40px;
    }
    .produto {
        flex-direction: column;
        align-items: flex-start;
        max-width: 300px;
        margin: 20px auto;
    }
    .produto_info {
        padding: 20px;
    }
    .produto_img {
        max-width: 100%;

    }
    .produto_titulo {
        font-size: 1.5rem;
    }

    .modal {
        padding: 10px;

    }

    .modal_container {
        grid-gap: 10px;
        background:  rgb(250, 237, 239);
        padding: 5px 0;
    }

    .modal_img {
        grid-row: 2;
        
    }

    .modal_img img {
        margin: 0 auto;
    }

    .modal_dados {
        grid-column: 1;
    }

    .avaliacoes {
        grid-column: 1;
    }
    .carrinho_modal {
        padding: 0px;
    }
}

</style>
