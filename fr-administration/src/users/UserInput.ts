import { ApiProperty } from "@nestjs/swagger";

export class UserInput {

    @ApiProperty({
        description: 'The firtname of the user',
        example: "John",
        type: String,
        default:undefined
    })
    public firstname?: string;

    @ApiProperty({
        description: 'The lastname of the user',
        example: "Doe",
        type: String,
        default:undefined
    })
    public lastname?: string;

    @ApiProperty({
        description: 'The age of the user',
        minimum: 18,
        default: 18,
        type: Number,
    })
    public age?: number;

    @ApiProperty({
        description: 'The password of the user',
        example: "OJjen87F2dfois_8è",
        type: String,
        default:undefined
    })
    public password?: string;
}