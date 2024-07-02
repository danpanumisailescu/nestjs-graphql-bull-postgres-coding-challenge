import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../models/employee.model'; 
import { QueueEmailMessagePublisherService } from '../services/queue/email-message-publisher.service';

@Resolver(of => Employee)
export class EmployeeResolver {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private emailMessagesPublisherService: QueueEmailMessagePublisherService
  ) {}

  @Query(() => [Employee], { name: 'getAllEmployees' })
  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }
  
  @Mutation(() => Employee)
  async createEmployee(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('jobTitle') jobTitle: string,
    @Args('department') department: string
  ): Promise<Employee> {
    const newEmployee = this.employeeRepository.create({ name, email, jobTitle, department });
    const saveResult = await this.employeeRepository.save(newEmployee);

    this.emailMessagesPublisherService.enqueueWelcomeEmail({
      ...saveResult,
      createdAt: new Date()
    });

    return saveResult;
  }

  @Mutation(() => Employee)
  async updateEmployee(
    @Args('id') id: number,
    @Args('name', { nullable: true }) name: string,
    @Args('jobTitle', { nullable: true }) jobTitle: string,
    @Args('department', { nullable: true }) department: string
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOneOrFail({
        where: { id }
      });
    employee.name = name ?? employee.name;
    employee.jobTitle = jobTitle ?? employee.jobTitle;
    employee.department = department ?? employee.department;
    await this.employeeRepository.save(employee);
    return employee;
  }

  @Mutation(() => Boolean)
  async deleteEmployee(@Args('id') id: number): Promise<boolean> {
    const result = await this.employeeRepository.delete(id);
    return result.affected > 0;
  }
}
