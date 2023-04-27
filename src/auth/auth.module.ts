import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
