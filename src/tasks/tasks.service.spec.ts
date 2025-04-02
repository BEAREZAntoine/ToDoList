import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.schema';
import { Model } from 'mongoose';

const mockTask = {
  _id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'todo',
  save: jest.fn().mockResolvedValue(this),
};

const mockTaskModel = {
  create: jest.fn().mockResolvedValue(mockTask),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockTask]),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockTask),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockTask),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockTask),
  }),
};

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const tasks = await service.findAll();
      expect(tasks).toEqual([mockTask]);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const task = await service.findOne('1');
      expect(task).toEqual(mockTask);
      expect(model.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if task is not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a task by id', async () => {
      const updatedTask = await service.update('1', { title: 'Updated Task' });
      expect(updatedTask).toEqual(mockTask);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', { title: 'Updated Task' }, { new: true });
    });

    it('should throw NotFoundException if task is not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.update('1', { title: 'Updated Task' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a task by id', async () => {
      const deletedTask = await service.delete('1');
      expect(deletedTask).toEqual(mockTask);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if task is not found', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.delete('1')).rejects.toThrow(NotFoundException);
    });
  });
});