import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Put } from '@nestjs/common';
import { UserdetailsService } from './userdetails.service';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';
import { UpdateUserdetailDto } from './dto/update-userdetail.dto';
import { Request, Response } from 'express';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';
import { log } from 'handlebars';
let userId = 1

@Controller('userdetails')
export class UserdetailsController {
  constructor(private readonly userdetailsService: UserdetailsService, private mailService: MailService) { }


  //create new user
  @Post('signup')
  async signup(@Req() req: Request, @Res() res: Response, @Body() createUserdetailDto: CreateUserdetailDto) {
    createUserdetailDto['createdby'] = userId;
    try {
      const emailData = await this.userdetailsService.checkEmail(createUserdetailDto);
      if (emailData) {
        if (emailData?.isVerified == true) {
          return res.send({
            message: "Something went wrong"
          })
        }
        else {
          await this.mailService.sendVerificationMail(createUserdetailDto.email, emailData.token);
          return res.send({
            message: "email sent successfully"
          })
        }
      }
      else {
        const tokenNumber = Math.floor(100000 + Math.random() * 900000);
        const token = tokenNumber.toString()
        const mailStatus= await this.mailService.sendVerificationMail(createUserdetailDto.email, token);
        if(mailStatus){
        createUserdetailDto['createdby'] = userId;
        createUserdetailDto['token'] = token;
        await this.userdetailsService.insert(createUserdetailDto);
        return res.json({
          message: "user created successfully",
          status: true
        })
        }
        else{ 
          return res.send({
            message: "mail not sent",
            status: false
          })
        }
      }
    }
    catch (err) {
      return res.send({
        message: err.message,
      });
    }
  }
  //verify email for signup
  @Put('verifyForSignup')
  async verify(@Req() req: Request, @Res() res: Response, @Body() UpdateUserdetailDto: UpdateUserdetailDto) {
    try {
      const tokenData = await this.userdetailsService.getDataByToken(UpdateUserdetailDto.token);
      if (tokenData) {
        if (tokenData?.isVerified == true) {
          return res.send({
            message: "Something went wrong",
            status:false
          })
        }
        else {
          await this.userdetailsService.updateIsVerified(UpdateUserdetailDto.token);
          return res.send({
            message: "email verified successfully",
            data: UpdateUserdetailDto.token,
            status:true
          })
        }
      }
      else {
        return res.send({
          message: "Something went wrong",

        })
      }
    }
    catch (err) {
      return res.send({
        message: err.message,
      });
    }
  }

  //update password
  @Put('updatePassword')
  async updatePassword(@Req() req: Request, @Res() res: Response, @Body() UpdateUserdetailDto: UpdateUserdetailDto) {
    try {
      const saltOrRounds = 10; // The number of salt rounds to use (generally recommended value)
      const hashedPassword = await bcrypt.hash(UpdateUserdetailDto.password, saltOrRounds);      
      await this.userdetailsService.updatePassword(UpdateUserdetailDto, hashedPassword);
       return res.send({
        message: "password updated successfully",
        status:true
      })
    }
    catch (err) {
      return res.send({
        message: err.message,
        status:false
      });
    }
  }

  //login
  @Put('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() UpdateUserdetailDto: UpdateUserdetailDto) {
     
    try{
      const emailData = await this.userdetailsService.checkEmailForLogin(UpdateUserdetailDto.email);      
      if (emailData) {
        const saltOrRounds = 10; // The number of salt rounds to use (generally recommended value)
        const hashedPassword = await bcrypt.hash(UpdateUserdetailDto.password, saltOrRounds);
       if(hashedPassword===emailData.password){
        return res.send({
          message: "login successfully"
        })
       }
        else{
          return res.send({
            message: "Something went wrong"
          })
        }
      }
      else {
        return res.send({
          message: "Something went wrong"
        })
      }
    }
    catch (err) {
      return res.send({
        message: err.message,
      });
    }
  }
//forgot password

  @Put('forgotPassword')
  async forgotPassword(@Req() req: Request, @Res() res: Response, @Body() UpdateUserdetailDto: UpdateUserdetailDto) {
    try{
      const emailData = await this.userdetailsService.checkEmailForForgotPassword(UpdateUserdetailDto.email);      
      if (emailData) {
        const tokenNumber = Math.floor(100000 + Math.random() * 900000);
        const token = tokenNumber.toString()
        await this.userdetailsService.insertIntoForgotTable(UpdateUserdetailDto.email,token);
        const mailStatus= await this.mailService.sendVerificationMail(UpdateUserdetailDto.email,token);
        if(mailStatus){
          return res.send({
            message: "mail sent successfully"
          })
        }
        else{
          return res.send({
            message: "Something went wrong"
          })
        }

      }
      else {
        return res.send({
          message: "Something went wrong",
          status: false
        })
      }
    }
    catch (err) {
      return res.send({
        message: err.message,
      });
    }

  }
//verify token for forgot password
  @Put('verificationForForgotPassword')
  async verificationForForgotPassword(@Req() req: Request, @Res() res: Response, @Body() UpdateUserdetailDto: UpdateUserdetailDto) {
    try{
      const tokenData = await this.userdetailsService.checkTokenForForgot(UpdateUserdetailDto.token);
      if (tokenData) {
        await this.userdetailsService.verifyEmailInForgottable(tokenData.email);
        return res.send({
          message: "token verified successfully",
          email: tokenData.email,
          status: true
        })
      }
      else {
        return res.send({
          message: "Something went wrong",
          status: false
        })
      }
    }
    catch (err) {
      return res.send({
        message: err.message,
      });
    }
}
//update new password to usertable
  @Put('updateNewPassword')
  async updateNewPassword(@Req() req: Request, @Res() res: Response, @Body() UpdateUserdetailDto: UpdateUserdetailDto) {
    try{
      const saltOrRounds = 10; // The number of salt rounds to use (generally recommended value)
      const hashedPassword = await bcrypt.hash(UpdateUserdetailDto.password, saltOrRounds);      
      await this.userdetailsService.updateNewPassword(UpdateUserdetailDto.email, hashedPassword);
       return res.send({
        message: "password updated successfully"
      })
    }
    catch (err) {
      return res.send({
        message: err.message,
      });
    }
  }

}