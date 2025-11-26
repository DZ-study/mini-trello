import bcrypt from 'bcrypt';

export class PwdUtil {
    static async hashPwd(pwd: string): Promise<string> {
        const saltRounds = 12; // TODO: 是否要使用随机值
        return await bcrypt.hash(pwd, saltRounds);
    }

    static async comparePwd(pwd: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(pwd, hash);
    }
}