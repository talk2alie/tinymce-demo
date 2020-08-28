import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SectionViewModel } from '../models/SectionViewModel';
import { Observable, throwError } from 'rxjs';
import { Section } from '../models/Section';
import { ResourceNode } from '../models/ResourceNode';
import { NodeType } from '../models/NodeType';

@Injectable({ providedIn: 'root' })
export class SectionService {
    private createSectionUrl = 'https://localhost:44332/api/sections';

    constructor(private httpClient: HttpClient) {}

    createNewSectionFrom(viewModel: SectionViewModel): Observable<string> {
        let resourceSection = new Section(
            viewModel.id,
            viewModel.title,
            viewModel.subtitle
        );

        let htmlSection = document.createElement('section');
        htmlSection.innerHTML = viewModel.body;

        this.addChildren(resourceSection, htmlSection.childNodes);
        return this.httpClient.post<string>(this.createSectionUrl, viewModel);
    }

    private addChildren(resourceNode: ResourceNode, htmlNodes: NodeListOf<ChildNode>): void {
        if (htmlNodes === null || htmlNodes.length === 0) {
            return;
        }

        for (let i = 0; i < htmlNodes.length; ++i) {
            let htmlChildNode = <HTMLElement> htmlNodes[i];
            let resourceChildNode = new ResourceNode(htmlChildNode.id, htmlChildNode.nodeType, htmlChildNode.nodeName);
            if (htmlChildNode.nodeType === NodeType.Text) {
                resourceChildNode.value = htmlChildNode.nodeValue;
            }

            if (htmlChildNode.nodeType == NodeType.Element) {
                this.addChildren(resourceChildNode, htmlChildNode.childNodes);
            }
            resourceNode.add(resourceChildNode);
        }
    }
}
