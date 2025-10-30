import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hash(data: string): Promise<string> {
    return await bcrypt.hash(data, 5);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}
