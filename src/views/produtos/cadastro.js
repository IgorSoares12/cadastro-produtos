import React from "react";
import '../produtos/cadastro.css';
import ProdutoService from "../../app/produtoService";
import { withRouter } from "react-router";
import Card from "../../components/card";

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '', 
    preco: 0.00,
    fornecedor: '',
    sucesso: false, 
    errors: [],
    atualizando: false
}

class CadastroProduto extends React.Component {
    state = estadoInicial;

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const valor = event.target.value;
        const nomeDoCampo = event.target.name;
        this.setState({ [nomeDoCampo]: valor })
    }

    onSubmit = (event) => {
        const produto = {
             nome: this.state.nome,
             sku: this.state.sku,
             descricao: this.state.descricao,
             preco: this.state.preco,
             fornecedor: this.state.fornecedor             
        }

        try {
            this.service.salvar(produto);
            this.limpaCampos();
            this.setState({sucesso: true});
        } catch(erro) {
            const errors = erro.errors
            this.setState({ errors: errors })
        }        
    }

    limpaCampos = () => {
        this.setState(estadoInicial);
    }

    componentDidMount() {
        const sku = this.props.match.params.sku;
        if (sku) {
            const resultado = this
                                .service
                                .obterProdutos()
                                .filter(produto => produto.sku === sku)
            if (resultado.length === 1) {
                const produtoEncontrado = resultado[0];
                this.setState({...produtoEncontrado, atualizando: true})
            }
        }
    }

    render() {
        return(
            <Card header = {this.state.atualizando ? 'Atualização de Produto' : 'Cadastro de Produto' }>                
                {
                    this.state.sucesso &&                         
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            <strong>Bem feito!</strong> Cadastro realizado com sucesso!
                        </div>                        
                }

                {
                    (this.state.errors.length > 0) &&                        
                        this.state.errors.map(mensagem => {
                            return (
                                <div class="alert alert-dismissible alert-danger">
                                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                                    <strong>Erro: </strong> { mensagem }
                                </div>     
                            )
                        })
                        
                    }                    

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nome: *</label>
                            <input  type="text" 
                                    name="nome" 
                                    value={this.state.nome} 
                                    className="form-control"
                                    onChange={this.onChange} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>SKU: *</label>
                            <input  type="text" 
                                    name="sku" 
                                    disabled = {this.state.atualizando}
                                    value={this.state.sku} 
                                    className="form-control"
                                    onChange={this.onChange} />
                        </div>                                
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Descrição: </label>
                            <textarea name="descricao" 
                                        value={this.state.descricao} 
                                        className="form-control"
                                        onChange={this.onChange} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Preço: *</label>
                            <input  type="text" 
                                    name="preco" 
                                    value={this.state.preco} 
                                    className="form-control"
                                    onChange={this.onChange} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Fornecedor: *</label>
                            <input  type="text" 
                                    name="fornecedor" 
                                    value={this.state.fornecedor} 
                                    className="form-control"
                                    onChange={this.onChange} />
                        </div>
                    </div>                        
                </div>

                <div className="row" id="botoes">
                    <div className="col-md-1">
                        <button className="btn btn-success" onClick={this.onSubmit}>
                            {
                                this.state.atualizando
                                ? 'Atualizar'
                                : 'Salvar'
                            }
                        </button>
                    </div>

                    <div className="col-md-1">
                        <button className="btn btn-primary" onClick={this.limpaCampos}>Limpar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroProduto);