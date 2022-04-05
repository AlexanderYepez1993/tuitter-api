import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@Controller('tuits')
export class TuitsController {
constructor(private readonly tuitService: TuitsService){}

    @Get()
    getTuits(@Query() pagination: PaginationQueryDto): Promise<Tuit[]> {
        /* const { searchTerm, orderBy } = filterQuery; */
        return this.tuitService.getTuits(pagination);
    }

    @Get(':id')
    /* Con el decorador @HttpCode se puede cambiar el código Http
    @HttpCode(HttpStatus.NO_CONTENT) */
    getTuit(@Param('id') id: number): Promise<Tuit> {
        return this.tuitService.getTuit(id);
    }

    @Post()
    createTuit(@Body() message: CreateTuitDto): Promise<Tuit> {
        /* Se muestra en consola si message hace referencia a una instancia de CreateTuitDto
        console.log(message instanceof CreateTuitDto); */
        return this.tuitService.createTuit(message);
    }

    @Patch(':id')
    updateTuit(@Param('id') id: number, @Body() tuit: UpdateTuitDto): Promise<Tuit> {
        return this.tuitService.updateTuit(id, tuit);
    }

    @Delete(':id')
    removeTuit(@Param('id') id: number): Promise<void> {
        return this.tuitService.removeTuit(id);
    }
}
