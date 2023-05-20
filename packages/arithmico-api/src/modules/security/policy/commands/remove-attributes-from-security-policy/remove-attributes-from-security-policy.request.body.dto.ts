import { ArrayMaxSize, IsEnum } from 'class-validator';
import { SecurityAttribute } from '../../../../../common/types/security-attributes.enum';

export class RemoveAttributesFromSecurityPolicyRequestBodyDto {
  @ArrayMaxSize(1024)
  @IsEnum(SecurityAttribute, { each: true })
  attributes: SecurityAttribute[];
}
