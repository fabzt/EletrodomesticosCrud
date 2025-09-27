import { Alert } from 'react-native';

const API_URL = 'https://apiestoque.webapptech.site/api/produtos';

// Buscar produtos
export const fetchProdutos = async (setRegistros) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar o Produto');
        }

        const dados = await response.json();
        console.log('Estoques recebidos da API:', dados);
        setRegistros(dados.data);
    } catch (error) {
        console.error('Erro ao buscar o Estoque:', error);
        throw error;
    }
};

// Criar produto
export const createProdutos = async (ProdutosData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ProdutosData),
        });

        if (response.status === 204) {
            Alert.alert('Sucesso!', 'Cadastro realizado com sucesso');
            return {};
        }

        const textResponse = await response.text();
        console.log('Resposta bruta da API:', textResponse);

        let responseData;
        try {
            responseData = JSON.parse(textResponse);
        } catch (error) {
            console.warn('A resposta não é um JSON válido.');
            responseData = null;
        }

        if (!response.ok || !responseData) {
            throw new Error(responseData?.message || 'Erro desconhecido na API');
        }

        return responseData;
    } catch (error) {
        console.error('Erro ao cadastrar o Produto:', error.message);
        Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
        return null;
    }
};

// Excluir produto
export const deleteProdutos = async (produtoId, setRegistros) => {
    try {
        const response = await fetch(`${API_URL}/${produtoId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const responseData = await response.json();

            if (responseData.success) {
                Alert.alert('Sucesso!', responseData.message || 'Produto excluído com sucesso');

                if (typeof setRegistros === 'function') {
                    setRegistros((prevRegistros) =>
                        prevRegistros.filter((produto) => produto.id !== produtoId)
                    );
                }
            } else {
                Alert.alert('Erro', responseData.message || 'Não foi possível excluir o produto.');
            }
        } else {
            let mensagemErro = 'Erro desconhecido ao excluir o produto';
            try {
                const texto = await response.text();
                const erroJson = JSON.parse(texto);
                mensagemErro = erroJson.message || mensagemErro;
            } catch (e) {
                console.warn('Resposta de erro não era JSON válido');
            }

            throw new Error(mensagemErro);
        }
    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
    }
};
