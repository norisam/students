import { Injectable } from '@nestjs/common';
import { Student } from './students.entity';

@Injectable()
export class StudentsService {
  private students: Student[] = [
    { id: 1, name: 'Zayne', age: 21 },
    { id: 2, name: 'Tara', age: 22 }
  ];

  getAllStudents(): Student[] {
    return this.students;
  }

  getStudent(id: number): Student {
    return this.students.find(student => student.id === id);
  }

  addStudent(name: string, age: number): Student {
    const newStudent = {
      id: this.students.length + 1,
      name,
      age
    };
    this.students.push(newStudent);
    return newStudent;
  }

  updateStudent(id: number, name: string, age: number): Student {
    const student = this.getStudent(id);
    if (student) {
      student.name = name;
      student.age = age;
    }
    return student;
  }

  deleteStudent(id: number): Student {
    const studentIndex = this.students.findIndex(student => student.id === id);
    if (studentIndex !== -1) {
      const [deletedStudent] = this.students.splice(studentIndex, 1);
      return deletedStudent;
    }
    return null;
  }
}