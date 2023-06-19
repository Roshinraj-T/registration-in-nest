import { ApiProperty } from "@nestjs/swagger";

export class CreateUserdetailDto {
    @ApiProperty()
    userName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    token: string;

    @ApiProperty()
    isVerified: boolean;

    

}
