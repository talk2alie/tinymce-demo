import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SectionService } from './services/section.service';
import { SectionViewModel } from './models/SectionViewModel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Introduction to TinyMCE';
    sectionFormGroup: FormGroup;
    constructor(private sectionService: SectionService) {
        let sectionTitle = new FormControl('Introduction to Loops');
        let sectionSubtitle = new FormControl('For-Loop');
        let sectionBody = new FormControl();

        this.sectionFormGroup = new FormGroup({
            sectionTitle: sectionTitle,
            sectionSubtitle: sectionSubtitle,
            sectionBody: sectionBody
        });
    }

    save(): void {
        let title = this.sectionFormGroup.value.sectionTitle;
        let subtitle = this.sectionFormGroup.value.sectionSubtitle;
        let body = this.sectionFormGroup.value.sectionBody;

        let section = document.createElement('section');
        section.innerHTML = body;

        let newSection: SectionViewModel = {
            position: 1,
            body: body,
            subtitle: subtitle,
            title: title
        };

        this.sectionService.createNewSectionFrom(newSection)
            .subscribe(id => console.log(id));
    }

    cancel(): void {

    }
}
