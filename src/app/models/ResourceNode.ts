import { NodeType } from './NodeType';

export class ResourceNode {
    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get type(): NodeType {
        return this._type;
    }

    private _value: string;
    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        if (this.type === NodeType.Element) {
            return;
        }

        if (value === null) {
            throw new Error("A text node's value cannot not be null");
        }

        this._value = value;
    }

    private _children: ResourceNode[];
    public get children(): ResourceNode[] {
        if (this.type === NodeType.Text) {
            return [];
        }

        return this._children;
    }

    constructor(private _id: string, private _type: NodeType, private _name: string) {
        if (_name === null) {
            throw new Error("Node name cannot be null");
        }

        this._children = [];
    }

    add(child: ResourceNode): boolean {
        if (this.type === NodeType.Text) {
            return false;
        }

        this._children.push(child);
        return true;
    }
}
