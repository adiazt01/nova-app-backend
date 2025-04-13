import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "src/core/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'profiles',
})
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn()
    user: User;

    @Column({
        type: 'text',
        nullable: true,
    })
    bio: string;

    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    username: string;
}
