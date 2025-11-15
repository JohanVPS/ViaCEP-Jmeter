import axios from 'axios';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

class ViaCepService {
  
  async consultarCep(cep: string): Promise<ViaCepResponse> {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      throw new Error('CEP inválido. O CEP deve ter 8 dígitos numéricos.');
    }
    
    try {
      const response = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      
      if (response.data.erro) {
        throw new Error('CEP não encontrado.');
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('CEP não encontrado.');
      }
      throw new Error('Erro ao consultar o CEP. Tente novamente mais tarde.');
    }
  }
}

export { ViaCepService };


