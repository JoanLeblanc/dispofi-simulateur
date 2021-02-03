import { NgModule } from "@angular/core";
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    exports:[
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    
})

export class SharedModule {}