import { NodeType } from './NodeType';

export interface ResourceNode {
    id: string;
    position: number;
    name: string;
    type: NodeType;
    value: string;
    children: ResourceNode[];
}
