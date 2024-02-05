import { Controller, Get, Head } from '@nestjs/common';

@Controller('')
export class AppController {
  @Head()
  wakeUp() {}
}
