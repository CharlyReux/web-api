import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";

export class AssociationInput {

    @ApiProperty({
        description: 'The list of ids of users in the association',
        example: '{1,2}',
        type: [Number],
    })
    public idUsers: number[];

    @ApiProperty({
        description: 'The name of the association',
        example:"Assoc1",
        type: String,
    })
    public name: string;
}