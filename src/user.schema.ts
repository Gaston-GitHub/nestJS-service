import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  username: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: false })
  fullname: string;
  @Prop({ type: String, required: false })
  email: string;
  @Prop({ type: String, required: false })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
