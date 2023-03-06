import { UpdateMomentDto } from './../data/dtos/UpdateMomentDto';
import { AddMomentDto } from './../data/dtos/AddMomentDto';
export interface Moment {
  addMoment(data: AddMomentDto,media);
  updateMoment(id, data: UpdateMomentDto);
  deleteMoment(id);
  getMomentById(id: string);
  getMoments(query?,deleted?);
}
