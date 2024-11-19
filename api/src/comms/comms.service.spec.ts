import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';
import { Cat } from 'src/interfaces/cat.interface';
import * as fs from 'fs';
import { CommsController } from './comms.controller';
import { faker } from '@faker-js/faker';

const fakeUserId = faker.string.uuid();

const generateMockUser = (cats: Cat[]) => ({
  id: fakeUserId,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  cats,
});

jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify([]));

describe('CommsService', () => {
  let commsService: CommsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommsService],
      controllers: [CommsController],
    }).compile();

    commsService = module.get<CommsService>(CommsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(commsService).toBeDefined();
  });

  describe('getNextDelivery', () => {
    it('should calculate total price for multiple active cats', () => {
      const mockUser = generateMockUser([
        {
          name: 'Puss',
          breed: 'Persian',
          subscriptionActive: true,
          pouchSize: 'A',
        }, // 55.5
        {
          name: 'Tiger',
          breed: 'Siamese',
          subscriptionActive: true,
          pouchSize: 'B',
        }, // 59.5
        {
          name: 'Barry',
          breed: 'Bengal',
          subscriptionActive: false,
          pouchSize: 'C',
        }, // Ignored
      ]);

      jest.spyOn(commsService, 'getUserById').mockReturnValue(mockUser);

      const result = commsService.getNextDelivery(fakeUserId);

      expect(result.totalPrice).toBe(55.5 + 59.5); // Only active cats are counted
      expect(result.freeGift).toBe(false); // Total price < 120
    });

    it('should include a free gift if total price exceeds 120', () => {
      const mockUser = generateMockUser([
        {
          name: 'Whiskers',
          breed: 'Persian',
          subscriptionActive: true,
          pouchSize: 'D',
        }, // 66.0
        {
          name: 'Fluffy',
          breed: 'Siamese',
          subscriptionActive: true,
          pouchSize: 'F',
        }, // 71.25
        {
          name: 'Mittens',
          breed: 'Bengal',
          subscriptionActive: true,
          pouchSize: 'E',
        }, // 69.0
      ]);

      jest.spyOn(commsService, 'getUserById').mockReturnValue(mockUser);

      const result = commsService.getNextDelivery(fakeUserId);

      expect(result.totalPrice).toBe(66.0 + 71.25 + 69.0); // Sum of active cat prices
      expect(result.freeGift).toBe(true); // Total price > 120
    });

    it('should throw an error if no active cats are found', () => {
      const mockUser = generateMockUser([
        {
          name: 'Whiskers',
          breed: 'Persian',
          subscriptionActive: false,
          pouchSize: 'A',
        },
      ]);

      jest.spyOn(commsService, 'getUserById').mockReturnValue(mockUser);

      expect(() => commsService.getNextDelivery(fakeUserId)).toThrow(
        'No active cats found for this user.',
      );
    });
  });

  describe('formatCatNames', () => {
    it('should format a single cat name correctly', () => {
      const catName = faker.person.firstName();
      const mockCats: Cat[] = [
        {
          name: catName,
          breed: 'Persian',
          subscriptionActive: true,
          pouchSize: 'A',
        },
      ];

      const result = commsService.formatCatNames(mockCats);

      expect(result).toBe(catName);
    });

    it('should format multiple cat names with "and"', () => {
      const catName1 = faker.person.firstName();
      const catName2 = faker.person.firstName();

      const mockCats: Cat[] = [
        {
          name: catName1,
          breed: 'Persian',
          subscriptionActive: true,
          pouchSize: 'A',
        },
        {
          name: catName2,
          breed: 'Siamese',
          subscriptionActive: true,
          pouchSize: 'B',
        },
      ];

      const result = commsService.formatCatNames(mockCats);

      expect(result).toBe(`${catName1} and ${catName2}`);
    });

    it('should format more than two cat names with commas and "and"', () => {
      const catName1 = faker.person.firstName();
      const catName2 = faker.person.firstName();
      const catName3 = faker.person.firstName();

      const mockCats: Cat[] = [
        {
          name: catName1,
          breed: 'Persian',
          subscriptionActive: true,
          pouchSize: 'A',
        },
        {
          name: catName2,
          breed: 'Siamese',
          subscriptionActive: true,
          pouchSize: 'B',
        },
        {
          name: catName3,
          breed: 'Bengal',
          subscriptionActive: true,
          pouchSize: 'C',
        },
      ];

      const result = commsService.formatCatNames(mockCats);

      expect(result).toBe(`${catName1}, ${catName2} and ${catName3}`);
    });

    it('should return an empty string if all cats are inactive', () => {
      const mockCats: Cat[] = [
        {
          name: 'Puss',
          breed: 'Persian',
          subscriptionActive: false,
          pouchSize: 'A',
        },
        {
          name: 'Tiger',
          breed: 'Siamese',
          subscriptionActive: false,
          pouchSize: 'B',
        },
      ];

      const result = commsService.formatCatNames(mockCats);

      expect(result).toBe('');
    });
  });
});
