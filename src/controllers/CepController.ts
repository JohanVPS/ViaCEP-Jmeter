import { Request, Response } from 'express';
import { ViaCepService } from '../services/ViaCepService';

class CepController {
 
  async consultarCep(req: Request, res: Response) {
    try {
      const { cep } = req.params;
      const viaCepService = new ViaCepService();
      
      const endereco = await viaCepService.consultarCep(cep);
      
      return res.json(endereco);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
}

export { CepController };
