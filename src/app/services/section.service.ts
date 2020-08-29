import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SectionViewModel } from '../models/SectionViewModel';
import { Observable, throwError } from 'rxjs';
import { Section } from '../models/Section';
import { ResourceNode } from '../models/ResourceNode';
import { NodeType } from '../models/NodeType';

@Injectable({ providedIn: 'root' })
export class SectionService {
    private createSectionUrl = 'https://localhost:5001/api/sections';

    constructor(private httpClient: HttpClient) {}

    createNewSectionFrom(viewModel: SectionViewModel): Observable<Section> {
        let resourceSection: Section = {
            id: viewModel.id,
            position: viewModel.position,
            title: viewModel.title,
            subtitle: viewModel.subtitle,
            name: 'SECTION',
            type: NodeType.Element,
            value: null,
            children: []
        };

        let htmlSection = document.createElement('section');
        htmlSection.innerHTML = viewModel.body;

        this.addChildren(resourceSection, htmlSection.childNodes);
        return this.httpClient.post<Section>(this.createSectionUrl, resourceSection);
    }

    private addChildren(resourceNode: ResourceNode, htmlNodes: NodeListOf<ChildNode>): void {
        if (htmlNodes === null || htmlNodes.length === 0) {
            return;
        }

        for (let i = 0; i < htmlNodes.length; ++i) {
            let htmlChildNode = <HTMLElement> htmlNodes[i];
            let resourceChildNode: ResourceNode = this.instantiateNodeFrom(htmlChildNode);
            if (htmlChildNode.nodeType === NodeType.Text) {
                if(htmlChildNode.nodeValue == '\n') {
                    continue;
                }
                resourceChildNode.value = htmlChildNode.nodeValue;
            }

            if (htmlChildNode.nodeType == NodeType.Element) {
                this.addChildren(resourceChildNode, htmlChildNode.childNodes);
            }

            resourceChildNode.position = resourceNode.children.length + 1;
            resourceNode.children.push(resourceChildNode);
        }
    }

    private instantiateNodeFrom(htmlChildNode: HTMLElement): ResourceNode {
        return {
            children: [],
            id: htmlChildNode.id,
            name: htmlChildNode.nodeName,
            position: 0,
            type: htmlChildNode.nodeType,
            value: null,
        };
    }
}
