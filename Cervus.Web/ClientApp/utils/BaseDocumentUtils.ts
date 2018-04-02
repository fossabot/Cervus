/*
 * Guidelines used: https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
 */
import { DocumentUtils } from "../types";
import { injectable } from "inversify";

@injectable()
export class BaseDocumentUtils implements DocumentUtils {
    private document: Document;

    constructor(document: Document) {
        this.document = document;
    }

    getAttribute<T>(attributeId: string): T {        
        return JSON.parse(this.getAttributeAux(attributeId));
    }

    getAttributeString(attributeId: string): string {
        return this.getAttributeAux(attributeId);
    }

    private getAttributeAux(attributeId: string): string {
        const script = this.document.currentScript;
        if (!script) {
            throw new Error("Document doesn't exist in the current context!");
        }

        const attributeValue = script.getAttribute(attributeId);
        if (!attributeValue) {
            throw new Error("Attribute with Id ${attributeId} doesn't exist in the current document!");
        }

        return attributeValue;
    }
}