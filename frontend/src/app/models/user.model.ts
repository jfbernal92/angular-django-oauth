import { SystemUser } from './system-user.mode';

export class User {
  constructor(private creator: SystemUser, private firstName: string, private lastName: string, private iban: string) { }
}
