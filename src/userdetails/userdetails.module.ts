import { Module } from '@nestjs/common';
import { UserdetailsService } from './userdetails.service';
import { UserdetailsController } from './userdetails.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Forgot, Userdetail } from './entities/userdetail.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Userdetail,Forgot])],
  controllers: [UserdetailsController],
  providers: [UserdetailsService, MailService]
})
export class UserdetailsModule {}
