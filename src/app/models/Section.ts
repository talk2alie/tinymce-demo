import { NodeType } from './NodeType';
import { ResourceNode } from './ResourceNode';

export class Section extends ResourceNode {
           private _title: string;
           public get title(): string {
               return this._title;
           }

           public set title(title: string) {
               if (title === null || title.length === 0) {
                   throw new Error("Section's title canno be null or empty");
               }

               this._title = title;
           }

           private _subtitle: string;
           public get subtitle(): string {
               return this._subtitle;
           }

           public set subtitle(subtitle: string) {
               this._subtitle = subtitle;
           }

           constructor(id: string, title: string, subtitle: string) {
               super(id, NodeType.Element, 'section');

               this.title = title;
               this.subtitle = subtitle;
           }
       }
