import { Column, Model, Table } from 'sequelize-typescript';

@Table({ schema: 'main', tableName: 'companies' })
export class Company extends Model {
  @Column({ field: 'id', primaryKey: true })
  id: string;

  @Column({ field: 'owner_name' })
  ownerName: string;

  @Column({ field: 'company_name' })
  companyName: string;

  @Column({ field: 'trading_name' })
  tradingName: string;

  @Column({ field: 'document' })
  document: string;

  @Column({ field: 'state_registration' })
  stateRegistration: string;

  @Column({ field: 'municipal_registration' })
  municipalRegistration: string;

  @Column({ field: 'number_of_branches' })
  numberOfBranches: number;

  @Column({ field: 'country' })
  country: string;

  @Column({ field: 'state' })
  state: string;

  @Column({ field: 'city' })
  city: string;

  @Column({ field: 'street_name' })
  streetName: string;

  @Column({ field: 'street_number' })
  streetNumber: string;

  @Column({ field: 'neighborhood' })
  neighborhood: string;

  @Column({ field: 'postal_code' })
  postalCode: string;

  @Column({ field: 'complement' })
  complement: string;

  @Column({ field: 'reference' })
  reference: string;

  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
