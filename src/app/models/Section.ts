import { NodeType } from './NodeType';
import { ResourceNode } from './ResourceNode';

export interface Section extends ResourceNode {
    title: string;
    subtitle: string;
}
