import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SectionService } from './services/section.service';
import { SectionViewModel } from './models/SectionViewModel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'Introduction to TinyMCE';
    sectionFormGroup: FormGroup;
    sectionTitle: FormControl;
    sectionSubtitle: FormControl;
    sectionBody: FormControl;

    constructor(private sectionService: SectionService) {
        this.sectionTitle = new FormControl();
        this.sectionSubtitle = new FormControl();
        this.sectionBody = new FormControl();

        this.sectionFormGroup = new FormGroup({
            sectionTitle: this.sectionTitle,
            sectionSubtitle: this.sectionSubtitle,
            sectionBody: this.sectionBody,
        });
    }

    ngOnInit(): void {
        this.sectionService.getSectionBy('17d0335d-860a-45bd-b46c-154f5e01dbf8')
            .subscribe(section => {
                this.sectionTitle = new FormControl(section.title);
                this.sectionSubtitle = new FormControl(section.subtitle);
                this.sectionBody = new FormControl(section.body);

                this.sectionFormGroup = new FormGroup({
                    sectionTitle: this.sectionTitle,
                    sectionSubtitle: this.sectionSubtitle,
                    sectionBody: this.sectionBody,
                });
            });
    }

    save(): void {
        let title = this.sectionFormGroup.value.sectionTitle;
        let subtitle = this.sectionFormGroup.value.sectionSubtitle;
        let body = this.sectionFormGroup.value.sectionBody;

        let section = document.createElement('section');
        section.innerHTML = body;

        let newSection: SectionViewModel = {
            id: 'TestGuide',
            position: 1,
            body: body,
            subtitle: subtitle,
            title: title
        };

        this.sectionService.createNewSectionFrom(newSection)
            .subscribe(section => console.log(JSON.stringify(section)));
    }

    cancel(): void {

    }
}
