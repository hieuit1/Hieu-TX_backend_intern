import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateSettingDto {
  @IsOptional()
  @IsString()
  readonly privacyPolicy: string;

  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @IsOptional()
  @IsString()
  websiteLink: string;

  @IsOptional()
  @IsString()
  facebookLink: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  returnPolicy: string;

  @IsOptional()
  @IsString()
  purchasePolicy: string;

  @IsOptional()
  @IsString()
  warrantyPolicy: string;

  @IsOptional()
  @IsString()
  buyingGuide: string;

  @IsOptional()
  @IsString()
  transferInformation: string;

  @IsOptional()
  @IsString()
  referralPrice: string;

  @IsOptional()
  @IsString()
  privacyPolicyEn: string;

  @IsOptional()
  @IsString()
  returnPolicyEn: string;

  @IsOptional()
  @IsString()
  purchasePolicyEn: string;

  @IsOptional()
  @IsString()
  warrantyPolicyEn: string;

  @IsOptional()
  @IsString()
  buyingGuideEn: string;

  @IsOptional()
  @IsString()
  transferInformationEn: string;
}
