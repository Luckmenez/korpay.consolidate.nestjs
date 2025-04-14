import { Controller, Patch, Body } from '@nestjs/common';
import {
  ConsolidationService,
  currentValidLinkType,
} from './consolidation.service';

@Controller('consolidation')
export class ConsolidationController {
  constructor(private readonly consolidationService: ConsolidationService) {}

  @Patch('current-link')
  updateCurrentValidLink(@Body('link') link: currentValidLinkType) {
    console.log('Updating currentValidLink to:', link);
    this.consolidationService.setCurrentValidLink(link);
    return {
      message: 'currentValidLink updated successfully',
      currentValidLink: link,
    };
  }
}
