import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){        
    }
    async sendVerificationMail(email:string,token:string) {
        console.log(token);
        const template = `./activation-mail`
        return new Promise(async (resolve, reject) => {
         await this.mailerService
            .sendMail({
              to: email, // list of receivers
              from: 'roshinraj432@gmail.com', // sender address
              subject: 'Testing Nest MailerModule ✔', // Subject line
            template: template, // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
            context: {
                name: 'Yogesh',
                token,
            },
            })
            .then(() => {
                console.log("mail sent");
                resolve(true);
                
            })
            .catch((err) => {
                console.log("mail not sent",err.stack);
                reject(false);
                
            });          
        }
        )
    }
}
