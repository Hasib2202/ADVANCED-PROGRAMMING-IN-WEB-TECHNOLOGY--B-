import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getAdminById(id: number): object {
    return { message: 'Admin id :' + id };
  }
  getAdminByNameAndId(name: string, id: number): object {
    return { message: 'Admin name: ' + name + ' id:' + id };
  }
  getAdmin(myobj: object): object {
    return { message: 'my obj:'+myobj };
  }
  addAdmin(myobj: object): object {
    // return myobj;
    return { message: 'name :'+myobj+ 'id:' +myobj+ 'email:'+myobj };

  }

  updateAdmin(myobj: object, id: number): object {
    return { message: 'update adminid: ' + id, body: myobj };
  }
}
