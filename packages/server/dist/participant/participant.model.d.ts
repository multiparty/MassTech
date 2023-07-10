import mongoose, { Document } from 'mongoose';
export declare class Participant {
    _id: mongoose.Types.ObjectId;
    collectionId: string;
}
export type ParticipantDocument = Participant & Document;
export declare const ParticipantSchema: mongoose.Schema<Participant, mongoose.Model<Participant, any, any, any, mongoose.Document<unknown, any, Participant> & Omit<Participant & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Participant, mongoose.Document<unknown, {}, mongoose.FlatRecord<Participant>> & Omit<mongoose.FlatRecord<Participant> & Required<{
    _id: mongoose.Types.ObjectId;
}>, never>>;
