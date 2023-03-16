import { Controller, Post, Req, UseGuards, Get, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../../guard/auth.guard';
import { User } from '../../entity/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('facebook')
  @UseGuards(JwtAuthGuard)
  async facebookLogin() {
    // the user is authenticated, so redirect them to the home page
    return { message: 'Facebook login successful' };
  }

  @Get('facebook/callback')
  @UseGuards(JwtAuthGuard)
  async facebookCallback(@Req() req: Request, @Res() res: Response) {
    // the user is authenticated, so generate a JWT token and redirect them to the home page
    const token = await this.authService.generateToken(<User>req.user);
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/');
  }

  @Get('google')
  @UseGuards(JwtAuthGuard)
  async googleLogin() {
    // the user is authenticated, so redirect them to the home page
    return { message: 'Google login successful' };
  }

  @Get('google/callback')
  @UseGuards(JwtAuthGuard)
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    // the user is authenticated, so generate a JWT token and redirect them to the home page
    const token = await this.authService.generateToken(<User>req.user);
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/');
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = await this.authService.generateToken(user);
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Login successful', access_token: token });
  }

  @Post('register')
  async register(@Req() req: Request, @Res() res: Response) {
    const { email, password, firstName, lastName } = req.body;

    const user = await this.authService.registerUser(
      email,
      password,
      firstName,
      lastName,
    );

    if (!user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const token = await this.authService.generateToken(user);
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Registration successful' });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res.json({ message: 'Logout successful' });
  }
}
