import { Injectable } from '@nestjs/common';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';
import { UpdateUserdetailDto } from './dto/update-userdetail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Forgot, Userdetail } from './entities/userdetail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserdetailsService {
  constructor(
    @InjectRepository(Userdetail)
    private userDetailsService: Repository<Userdetail>,
    @InjectRepository(Forgot)
    private forgotService: Repository<Forgot>
    ){}
//add new user
  async   checkEmail(createUserdetailDto: CreateUserdetailDto) {
    return await this.userDetailsService.findOne({
      select: ["userName","email","isVerified","isActivate",],
      where: { "email": createUserdetailDto.email },
    })   
  }
  async insert(createUserdetailDto: CreateUserdetailDto) {
     await this.userDetailsService.save(createUserdetailDto);
  }

 //verify email for signup 
  async getDataByToken(token:string){
    return await this.userDetailsService.findOne({
      select: ["email","token"],
      where: { "token": token },
    })
  }
  async updateIsVerified(token:string){
     await this.userDetailsService.update({token:token},{isVerified:true})
  }  

//update password
  async updatePassword(updateUserdetailDto: UpdateUserdetailDto,password:string) {
    await this.userDetailsService.update({token:updateUserdetailDto.token},{password:password,token:null})
  }

//login
  async checkEmailForLogin(email:string) {
    return await this.userDetailsService.findOne({
      select: ["userName","email","isVerified","password"],
      where: { "email": email,"isVerified":true },
    })   
  }
//========================forgot password=======================
//email check for forgot password
  async checkEmailForForgotPassword(email:string) {
    return await this.userDetailsService.findOne({
      select: ["email","isVerified"],
      where: { "email": email ,"isVerified":true},
    })   
  }
//insert inito forgot table
  async insertIntoForgotTable(email:string,token:string) {
    await this.forgotService.save({email:email,token:token})
  }
//check token
  async checkTokenForForgot(token:string) {
    return await this.forgotService.findOne({
      select: ["email","isVerified"],
      where: { "token": token },
    })   
  }
//verfy token in forgot table
  async verifyEmailInForgottable(email:string) {
    await this.forgotService.update({email:email},{isVerified:true})
  }
//update new password to usertable
  async updateNewPassword(email:string,password:string) {
    await this.userDetailsService.update({email:email},{password:password})
  }
}
