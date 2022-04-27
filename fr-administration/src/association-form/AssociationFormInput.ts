import { ApiProperty } from "@nestjs/swagger";

export class AssociationFormInput {

    @ApiProperty({
        description: 'The boolean value associated with financialValidation',
        example: true,
        type: Boolean,
    })
    public financialValidation: boolean;

    @ApiProperty({
        description: 'The boolean value associated with legalValidation',
        example:false,
        type: Boolean,
    })
    public legalValidation: boolean;
}