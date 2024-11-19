import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import { Cat } from 'src/interfaces/cat.interface';
import { User } from 'src/interfaces/user.interface';

export const POUCH_PRICES = {
  A: 55.5,
  B: 59.5,
  C: 62.75,
  D: 66.0,
  E: 69.0,
  F: 71.25,
};

@Injectable()
export class CommsService {
  private userData: User[];

  constructor() {
    try {
      this.userData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    } catch (error) {
      throw new Error('Error reading user data from file');
    }
  }

  private getPouchPrices(): Record<string, number> {
    return POUCH_PRICES;
  }

  public getUserById(userId: string): User {
    const user = this.userData.find((u) => u.id === userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private formatPrice(price: number): number {
    return parseFloat(price.toFixed(2)); //Makes in the format of currency with two decimals
  }

  public calculateTotalPrice(cats: Cat[]): number {
    const pouchPrices = this.getPouchPrices();
    const totalPrice = cats.reduce(
      (total, cat) => total + (pouchPrices[cat.pouchSize] || 0),
      0,
    );
    return this.formatPrice(totalPrice);
  }

  public formatCatNames(cats: Cat[]): string {
    const activeCatNames = cats
      .filter((cat) => cat.subscriptionActive)
      .map((cat) => cat.name);
    if (activeCatNames.length === 0) return '';
    if (activeCatNames.length === 1) return activeCatNames[0];
    if (activeCatNames.length === 2) return activeCatNames.join(' and ');
    return `${activeCatNames.slice(0, -1).join(', ')} and ${activeCatNames[activeCatNames.length - 1]}`;
  }

  public getNextDelivery(userId: string) {
    const user = this.getUserById(userId);
    const { firstName, cats } = user;
    const activeCats = cats.filter((cat) => cat.subscriptionActive);

    if (activeCats.length === 0) {
      throw new BadRequestException('No active cats found for this user.');
    }
    const formattedCatNames = this.formatCatNames(activeCats);
    const totalPrice = this.calculateTotalPrice(activeCats);
    const freeGift = totalPrice > 120;
    return {
      title: `Your next delivery for ${formattedCatNames}`,
      message: `Hey ${firstName}! In two days' time, we'll be charging you for your next order for ${formattedCatNames}'s fresh food.`,
      totalPrice,
      freeGift,
    };
  }
}
