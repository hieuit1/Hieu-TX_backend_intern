import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Setting {
  @Prop({ type: String, default: '' })
  readonly privacyPolicy: string;

  @Prop({ type: String, required: true })
  contactPhone: string;

  @Prop({ type: String, default: '' })
  websiteLink: string;

  @Prop({ type: String, default: '' })
  facebookLink: string;

  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: String, default: '' })
  returnPolicy: string;

  @Prop({ type: String, default: '' })
  purchasePolicy: string;

  @Prop({ type: String, default: '' })
  warrantyPolicy: string;

  @Prop({ type: String, default: '' })
  buyingGuide: string;

  @Prop({ type: String, default: '' })
  transferInformation: string;

  @Prop({ type: String, default: '' })
  referralPrice: string;

  @Prop({ type: String, default: '' })
  privacyPolicyEn: string;

  @Prop({ type: String, default: '' })
  returnPolicyEn: string;

  @Prop({ type: String, default: '' })
  purchasePolicyEn: string;

  @Prop({ type: String, default: '' })
  warrantyPolicyEn: string;

  @Prop({ type: String, default: '' })
  buyingGuideEn: string;

  @Prop({ type: String, default: '' })
  transferInformationEn: string;
}

export type SettingDocument = Setting & Document;
export const SettingSchema = SchemaFactory.createForClass(Setting);
