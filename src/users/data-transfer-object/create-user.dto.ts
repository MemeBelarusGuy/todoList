//описывает те поля, которые мы ожидаем на входе в функцию
export class CreateUserDto {
    readonly name:string;
    readonly password:string;
}