/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MomentRepository } from 'src/feature/moments/data/MomentRepository';
import { Moment } from './Moment';
import { Injectable } from '@nestjs/common';
import { AddMomentDto } from '../data/dtos/AddMomentDto';
import { UpdateMomentDto } from '../data/dtos/UpdateMomentDto';

@Injectable()
export class MomentService implements Moment {
    getComment(id: any) {
      throw new Error('Method not implemented.');
    }
    private repository:MomentRepository
    addMoment(data: AddMomentDto, media: any) {
        return this.repository.addMoment(data,media)
    }
    updateMoment(id: any, data: UpdateMomentDto) {
        return this.repository.updateMoment(id,data)
    }
    deleteMoment(id: any) {
        return this.repository.deleteMoment(id)
    }
    getMomentById(id: string) {
        return this.repository.getMomentById(id)
    }
    getMoments(query?: any, deleted?: any) {
        return this.repository.getMoments(query)
    }
}
