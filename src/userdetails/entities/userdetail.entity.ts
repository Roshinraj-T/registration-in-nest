import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Userdetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column({nullable:true})
    password: string;

    @Column()
    token: string;

    @Column({default:false})
    isVerified: boolean;

    @Column({default:true})
    isActivate: boolean;

    @Column({nullable:true})
    createdBy: number;

    @CreateDateColumn()
    createDate: Date;

    @Column({nullable:true})
    updatedBy: number;

    @UpdateDateColumn({nullable:true})
    updateDate: Date;

    @Column({nullable:true})
    deletedby: number;
    
    @DeleteDateColumn({nullable:true})
    deleteDate: Date;
}

@Entity()
export class Forgot {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    email: string;



    @Column()
    token: string;

    @Column({default:false})
    isVerified: boolean;



    @Column({nullable:true})
    createdby: number;

    @CreateDateColumn()
    createdat: Date;

    @Column({nullable:true})
    updatedBy: number;

    @UpdateDateColumn({nullable:true})
    updateDate: Date;

    @Column({nullable:true})
    deletedBy: number;
    
    @DeleteDateColumn({nullable:true})
    deleteDate: Date;
}

