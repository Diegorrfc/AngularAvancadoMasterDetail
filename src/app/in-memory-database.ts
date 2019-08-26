import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/Shared/Category.model';



export class InMemoryDataBase implements InMemoryDbService {
    createDb() {
        const categories: Category[] = [
            { id: 1, nome: 'lazer', description: 'aqui' },
            { id: 2, nome: 'lazer2', description: 'aqui' },
            { id: 3, nome: 'lazer3', description: 'aqui' },
            { id: 4, nome: 'lazer4', description: 'aqui' },
            { id: 5, nome: 'lazer5', description: 'aqui' }

        ];
        const o = {categories};
        return {categories};
    }
}
