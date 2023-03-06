import { ChangePasswordDto } from "../data/dtos/ChangePasswordDto";
import { ForgetPasswordDto } from "../data/dtos/ForgetPasswordDto";
import { UserLoginDto } from "../data/dtos/UserLoginDto";
import { UserRegisterDto } from "../data/dtos/UserRegisterDto";

export interface User {
    register(user:UserRegisterDto)
    getBlockedUsers()
    login(userloginDto: UserLoginDto): any;
    forgetPassword(forgetPass: ForgetPasswordDto):any
    block(id:string)
    changePassword(password:ChangePasswordDto)
    unBlock(id:string)
    getUsers(query?,deleted?)
    
}