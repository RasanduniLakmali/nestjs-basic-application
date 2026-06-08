import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from '@nestjs/common';

@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(registerDto: RegisterDto) {
        const { email, password, name } = registerDto;

        const existingUser = await this.prisma.user.findUnique({
            where: {email}
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        const {password: _, ...result} = user;

        return result;
    }

    async login(loginDto: LoginUserDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password,
        );

        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '1h',
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshToken(refreshToken: string) {
    try {
       const payload = this.jwtService.verify(refreshToken);

        const newPayload = {
            sub: payload.sub,
            email: payload.email,
            role: payload.role,
        };

        console.log(process.env.JWT_SECRET);

        const accessToken = this.jwtService.sign(newPayload, {
            expiresIn: '1h',
        });

        const newRefreshToken = this.jwtService.sign(newPayload, {
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    } catch {
        throw new UnauthorizedException('Invalid refresh token');
    }
}

}