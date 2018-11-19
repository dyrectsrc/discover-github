import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatButtonModule, MatCardModule, MatSelectModule, MatGridListModule, MatExpansionModule, MatInputModule, MatTabsModule, MatListModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  imports: [MatFormFieldModule, MatButtonModule, MatSelectModule, MatCardModule, MatGridListModule, MatExpansionModule, MatInputModule, MatTabsModule, MatListModule, MatIconModule, BrowserAnimationsModule],
  exports: [MatFormFieldModule, MatButtonModule, MatSelectModule, MatCardModule, MatGridListModule, MatExpansionModule, MatInputModule, MatTabsModule, MatListModule, MatIconModule, BrowserAnimationsModule]
})

export class MaterialModule {

}