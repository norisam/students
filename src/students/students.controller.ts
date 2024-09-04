import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './students.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAllStudents(): Student[] {
    return this.studentsService.getAllStudents();
  }

  @Get(':id')
  getStudent(@Param('id') id: string): Student {
    const student = this.studentsService.getStudent(parseInt(id));
    if (!student) {
      throw new NotFoundException('No student found');
    }
    return student;
  }

  @Post()
  addStudent(@Body('name') name: string, @Body('age') age: number): Student {
    if (!name || typeof name !== 'string') {
      throw new BadRequestException('Invalid name');
    }
    if (!age || typeof age !== 'number') {
      throw new BadRequestException('Invalid age');
    }
    return this.studentsService.addStudent(name, age);
  }

  @Put(':id')
  updateStudent(@Param('id') id: string, @Body('name') name: string, @Body('age') age: number): Student {
    if (!name || typeof name !== 'string') {
      throw new BadRequestException('Invalid name');
    }
    if (!age || typeof age !== 'number') {
      throw new BadRequestException('Invalid age');
    }
    const updatedStudent = this.studentsService.updateStudent(parseInt(id), name, age);
    if (!updatedStudent) {
      throw new NotFoundException('No student found');
    }
    return updatedStudent;
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: string): Student {
    const deletedStudent = this.studentsService.deleteStudent(parseInt(id));
    if (!deletedStudent) {
      throw new NotFoundException('No student found');
    }
    return deletedStudent;
  }
}
