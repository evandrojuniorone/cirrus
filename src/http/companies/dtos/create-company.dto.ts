import { IsNotEmpty, IsDefined, IsInt, Min } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  ownerName: string;

  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  tradingName: string;

  @IsNotEmpty()
  document: string;

  @IsDefined()
  stateRegistration: string;

  @IsDefined()
  municipalRegistration: string;

  @IsInt()
  @Min(0)
  numberOfBranches: number;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  streetName: string;

  @IsNotEmpty()
  streetNumber: string;

  @IsNotEmpty()
  neighborhood: string;
  
  @IsNotEmpty()
  postalCode: string;

  @IsDefined()
  complement: string;
  
  @IsDefined()
  reference: string;
};
