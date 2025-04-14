import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { File } from 'src/files/entities/file.entity';

@Entity({
  name: 'stories',
})
export class Story {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => File, (file) => file.story)
  file?: File;
}
