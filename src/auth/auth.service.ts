import { Injectable } from '@nestjs/common';
@Injectable()
export class AuthService {
  private key: string = process.env.API_KEY
  validateApiKey(apiKey: string) {
    if (apiKey == this.key) {
      return true;
    } else {
      return false;
    }
  }
}
