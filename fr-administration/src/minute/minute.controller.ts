import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { identity } from 'rxjs';
import { Minute } from './minute.entity';
import { MinuteService } from './minute.service';
import { MinuteInput } from './MinuteInput';
import { MinuteUpdate } from './MinuteUpdate';

@ApiTags("Minute")
@Controller('minute')
export class MinuteController {

    constructor(
        private service : MinuteService
    ) { }

        @Get()
        public async get():Promise<Minute[]>{
            return this.service.getMinute()
        }

        @Post()
        public async create(@Body() input : MinuteInput):Promise<Minute>{
            return this.service.create(input.content,input.date,input.idAssocation,input.idVoters)
        }

        @Get(":idAssoc")
        public async getMinuteByIDAssoc(@Param('idAssoc') idAssoc:number):Promise<Minute[]>{
            return this.service.getMinuteByIDAssoc(idAssoc)
        } 

        @Get(":id")
        public async getMinuteByID(@Param('id') id:number):Promise<Minute>{
            return this.service.getMinuteByID(id)
        } 

        @Put(':id')
        public async UpdateMinuteByIDAssoc(@Param('id')id: number,@Body() input: MinuteUpdate ):Promise<Minute>{
            const tmpMinute:Minute = await this.service.UpdateMinuteByID(id,input.content,input.date,input.idAssocation,input.idVoters)
            if (tmpMinute == undefined) {
                throw new HttpException('Could not find an Minute with the id : '+id, HttpStatus.NOT_FOUND)
            }
            return tmpMinute
        }

        @Delete(':id')
        public async DeleteMinuteByID(@Param('id')id:number):Promise<Boolean>{
            if(this.service.getMinuteByID(id)==undefined){
                throw new HttpException('Could not find a minute with the specified id',HttpStatus.NOT_FOUND)
            }
            return this.service.DeleteMinuteByID(id)
        }

        
}
