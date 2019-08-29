import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Collaborator } from './pages/collaborators/Shared/collaborator.model';




export class InMemoryDataBase implements InMemoryDbService {
    createDb() {
        const collaborators: Collaborator[] = [
            {
                id: "1",                
                FirstName: "Diego",
                LastName: "Rodrigo",
                Document: "12345678909",
                Email: "diego.rrfc@gmail.com",
                Phone: "9304049302",
                Salary: '10000',
                ProjectName: "string",
                BirthDate: '2010-01-16',
                Street: "Caisa do apolo",
                Number: "1234",
                District: "Recife Antigo",
                City: "Recife",
                Country: "Brasil",
                ZipCode: "5600000",
                JobTitle: "Desenvolvedor",
            }


        ];
        console.log('Diego', { collaborators });
        return { collaborators };
    }
}
