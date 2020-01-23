export class User {

  id: number;
  first_name: string;
  last_name: string;
  iban: string;
  own: boolean;

  constructor(id: number, first_name: string, last_name: string, iban: string,
              own: boolean) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.iban = iban;
    this.own = own;
  }
}
